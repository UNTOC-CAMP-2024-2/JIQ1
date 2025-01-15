import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    TextInput,
    ScrollView, 
    Modal,
    KeyboardAvoidingView,
    Keyboard,
    Platform,
    Alert,
    ImageBackground,
    Image,
    PanResponder,
} from "react-native";
import Slider from "@react-native-community/slider";
import Svg, { Path } from "react-native-svg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRoute } from "@react-navigation/native";
import styles from "./WrongScreenStyles";

const STORAGE_KEY = "drawing_paths";

const WrongScreen = () => {
    const navigation = useNavigation();
    
    const wrongData = [
        { wrong: "문제 1: 사과는 무슨 색인가요?" },
        { wrong: "문제 2: 바다는 어떤 색인가요?" },
        { wrong: "문제 3: 내 나이는?" },
        { wrong: "문제 4: 1+1은?" },
    ];

    const [paths, setPaths] = useState(() => Array.from({ length: wrongData.length }, () => []));
    const [currentPath, setCurrentPath] = useState(""); // 현재 경로
    const [strokeWidth, setStrokeWidth] = useState(5); // 선 굵기
    const [strokeColor, setStrokeColor] = useState("#000000"); // 선 색깔
    const [isEraser, setIsEraser] = useState(false); // 지우개 모드
    const [currentPage, setCurrentPage] = useState(0); // 현재 페이지 인덱스
    const [undoStacks, setUndoStacks] = useState(Array(wrongData.length).fill().map(() => []));

    useEffect(() => {
        loadPaths();
    }, []);

    const loadPaths = async () => {
        try {
            const storedPaths = await AsyncStorage.getItem(STORAGE_KEY);
            if (storedPaths) {
                const parsedPaths = JSON.parse(storedPaths);
                if (Array.isArray(parsedPaths) && parsedPaths.length === wrongData.length) {
                    setPaths(parsedPaths);
                } else {
                    setPaths(Array.from({ length: wrongData.length }, () => []));
                }
            } else {
                setPaths(Array.from({ length: wrongData.length }, () => []));
            }
        } catch (error) {
            console.error("Failed to load paths:", error);
            setPaths(Array.from({ length: wrongData.length }, () => []));
        }
    };

    const savePaths = async (newPaths) => {
        try {
            if (Array.isArray(newPaths) && newPaths.length === wrongData.length) {
                await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newPaths));
            } else {
                console.warn("savePaths: Invalid paths structure. Resetting to default.");
                await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from({ length: wrongData.length }, () => [])));
            }
        } catch (error) {
            console.error("Failed to save paths:", error);
        }
    };

    const handlePathsChange = (newPathsForPage) => {
        const updatedPaths = [...paths];
        updatedPaths[currentPage] = newPathsForPage;
        setPaths(updatedPaths);
        savePaths(updatedPaths);
    };

    const handleNextPage = () => {
        if (currentPage < wrongData.length - 1) {
            setCurrentPage(currentPage + 1);
        } else {
            Alert.alert("오답 완료", "모든 오답을 완료했습니다!");
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    // 경로 삭제 로직
    const handleErase = (x, y) => {
        const updatedPaths = [...paths];
        const currentPaths = updatedPaths[currentPage];
        const removedPaths = [];
    
        // 현재 페이지에서 터치 위치와 가까운 경로 삭제
        const filteredPaths = currentPaths.filter((pathObj) => {
            const { path } = pathObj;
            const isErased = isTouchingPath(path, x, y, 20); // 반경 20px 안의 경로 탐지
            if (isErased) {
                removedPaths.push(pathObj);
            }
            return !isErased; // isErased가 true이면 해당 경로를 삭제
        });
    
        // 삭제된 경로를 Undo Stack에 저장
        if (removedPaths.length > 0) {
            setUndoStacks((prevStacks) => {
                const newStacks = [...prevStacks];
                newStacks[currentPage] = [...newStacks[currentPage], ...removedPaths];
                return newStacks;
            });
        }
    
        updatedPaths[currentPage] = filteredPaths;
        setPaths(updatedPaths);
        handlePathsChange(filteredPaths); // 변경된 경로를 저장
        savePaths(filteredPaths);
    };

    const isTouchingPath = (path, x, y, radius) => {
        const points = path
            .replace(/M|L/g, '') // 'M'과 'L' 제거
            .trim()
            .split(' ')
            .map((point) => {
                const [px, py] = point.split(',').map(Number);
                return { x: px, y: py };
            });
    
        return points.some((point) => {
            const dx = point.x - x;
            const dy = point.y - y;
            return Math.sqrt(dx * dx + dy * dy) <= radius; // 반경 내에 있으면 true
        });
    };
    

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderGrant: (e) => {
            const { locationX, locationY } = e.nativeEvent;
        
            if (isEraser) {
                handleErase(locationX, locationY); // 지우개 모드
            } else {
                setCurrentPath(`M ${locationX},${locationY}`); // 새로운 경로 시작
            }
        },
        onPanResponderMove: (e) => {
            const { locationX, locationY } = e.nativeEvent;
        
            if (isEraser) {
                handleErase(locationX, locationY); // 이동 중에도 지우개 작동
            } else {
                setCurrentPath((prevPath) => `${prevPath} L ${locationX},${locationY}`);
            }
        },
        onPanResponderRelease: () => {
            if (!isEraser && currentPath) {
                const updatedPathsForPage = [
                    ...paths[currentPage],
                    { path: currentPath, color: strokeColor, width: strokeWidth },
                ];
                handlePathsChange(updatedPathsForPage);
                setCurrentPath("");
            }
        },
    });

    const handleUndo = () => {
        const updatedPaths = [...paths];
        if(updatedPaths[currentPage].length > 0) {
            const lastPath = updatedPaths[currentPage].pop();
            setUndoStacks((prevStacks) => {
                const newStacks = [...prevStacks];
                newStacks[currentPage].push(lastPath);
                return newStacks;
            })
            setPaths(updatedPaths);
            handlePathsChange(updatedPaths[currentPage]);
            savePaths(updatedPaths);
        }
    };

    const handleRedo = () => {
        if (undoStacks[currentPage].length > 0) {
            const lastUndonePath = undoStacks[currentPage].pop();
            const updatedPaths = [...paths];
            updatedPaths[currentPage].push(lastUndonePath); // 복구된 경로 페이지에 추가
            setPaths(updatedPaths);
            setUndoStacks((prevStacks) => {
                const newStacks = [...prevStacks];
                newStacks[currentPage] = [...newStacks[currentPage]];
                return newStacks;
            });
            savePaths(updatedPaths); // 저장 
        }
    };

    const handleResult = () => {
        // Result 버튼을 눌렀을 때 동작
        Alert.alert("오답 완료", "모든 오답을 완료했습니다!");
      };
      

    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <View style={styles.header}>
                <ImageBackground
                source={require("../images/toolbar.png")}
                resizeMode="contain"
                style={styles.headerBg}
                >
                    <View
                    style={styles.tool}>
                    <TouchableOpacity
                        style={[styles.button, !isEraser && styles.activeButton]}
                        onPress={() => {
                            setIsEraser(false);
                        }}
                    >
                        <ImageBackground
                        source={
                            !isEraser 
                            ? require("../images/toggled.png")
                            : null
                        }
                        style={styles.iconBackground}
                        resizeMode="contain">
                        <FontAwesome5 name="pencil-alt" size={24} color="black" style={{margin: 10}}/>
                        </ImageBackground>
                    </TouchableOpacity> 
                    <TouchableOpacity
                        style={{ 
                            backgroundColor: "#FF0000", 
                            width: 30, 
                            height: 30, 
                            borderRadius: 50,
                            margin: 5,
                        }}
                        onPress={() => setStrokeColor("#FF0000")}
                    />
                    <TouchableOpacity
                        style={{ 
                            backgroundColor: "#0000FF", 
                            width: 30, 
                            height: 30, 
                            borderRadius: 50,
                            margin: 5,
                        }}
                        onPress={() => setStrokeColor("#0000FF")}
                    />
                    <TouchableOpacity
                        style={{ 
                            backgroundColor: "#000000", 
                            width: 30, 
                            height: 30, 
                            borderRadius: 50,
                            margin: 5,
                         }}
                        onPress={() => setStrokeColor("#000000")}
                    />
                    <TouchableOpacity
                        style={[styles.button, isEraser && styles.activeButton]}
                        onPress={() => { 
                            setIsEraser(true); 
                        }}
                    >
                        <ImageBackground
                        source={
                            isEraser 
                            ? require("../images/toggled.png")
                            : null
                        }
                        style={styles.iconBackground}
                        resizeMode="contain">
                        <FontAwesome5 name="eraser" size={24} color="black" style={{margin: 10}}/>
                        </ImageBackground>
                    </TouchableOpacity>
                    <Text style={styles.label}>펜 두께: {strokeWidth}</Text>
                    <Slider
                    style={styles.slider}
                    minimumValue={1}
                    maximumValue={20}
                    step={1}
                    value={strokeWidth}
                    onValueChange={(value) => setStrokeWidth(value)}/>
                    </View>
                    <View style={styles.doUndo}>
                    <TouchableOpacity onPress={handleUndo}>
                        <Feather name="corner-up-left" size={24} color="black" style={{margin: 5}}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleRedo}>
                        <Feather name="corner-up-right" size={24} color="black" style={{margin: 5}}/>
                    </TouchableOpacity>
                    <TouchableOpacity
                    onPress={() => navigation.goBack()}>
                        <AntDesign name="closecircleo" size={24} color="black" style={{margin: 5}}/>
                    </TouchableOpacity>
                    </View>
                </ImageBackground>
            </View>
            <View style={styles.body}>
                <View style={styles.probPart}>
                    <ImageBackground source={require("../images/문제 부분.png")} style={styles.probScreen} resizeMode="contain">
                        <Text>{wrongData[currentPage].wrong}</Text> {/* 문제 텍스트 표시 */}
                    </ImageBackground>
                </View>
                <View style={styles.writePart}>
                    <ImageBackground style={styles.writeScreen} source={require("../images/오답 부분.png")} resizeMode="contain">
                            <Svg style={{ flex: 1 }} {...panResponder.panHandlers}>
                                {(paths[currentPage] || []).map((p, index) => (
                                    <Path key={index} d={p.path} stroke={p.color} strokeWidth={p.width} fill="none" />
                                ))}
                                {currentPath && !isEraser && (
                                    <Path d={currentPath} stroke={strokeColor} strokeWidth={strokeWidth} fill="none" />
                                )}
                            </Svg>
                    </ImageBackground>
                </View>
            </View>
            <View style={styles.footer}>
            {/*이전 버튼*/}
            <TouchableOpacity
            onPress={handlePreviousPage}
            disabled={currentPage === 0} // 첫 페이지에서는 비활성화
            >
                <AntDesign name="leftcircleo" size={40} color={currentPage === 0 ? "#d3d3d3" : "#394C8B"} style= {{marginHorizontal:10,}} />
            </TouchableOpacity>

            <Text style={styles.pageIndicatorText}>{`${currentPage + 1}/${wrongData.length}`}</Text>

            {/* 다음 버튼 또는 End 버튼 */}
            {currentPage === wrongData.length - 1 ? (
            <TouchableOpacity style={styles.resultButton} onPress={handleResult}>
                <Text style={styles.resultButtonText}>End</Text>
            </TouchableOpacity>
            ) : (
            <TouchableOpacity onPress={handleNextPage}>
                <AntDesign name="rightcircleo" size={40} color="#394C8B" style= {{marginHorizontal:10,}} />
            </TouchableOpacity>
            )}
            </View>
        </View>
    )

}

export default WrongScreen;