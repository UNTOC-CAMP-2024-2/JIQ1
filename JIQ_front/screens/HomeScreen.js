import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import Entypo from '@expo/vector-icons/Entypo';
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
} from "react-native";
import Svg, { Circle, G } from "react-native-svg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { theme } from "../Colors";
import styles from "./HomeScreenStyles";

const STORAGE_KEY = "@folders";

const HomeScreen = ({ setTapPressed }) => {
    const navigation = useNavigation();

    const [nameModal, setNameModal] = useState(false);
    const [fileModal, setFileModal] = useState(false);
    const [name, setName] = useState("");
    const [folders, setFolders] = useState({});
    const [selectedFolderKey, setSelectedFolderKey] = useState(null); // 선택된 폴더 키 상태 추가
    const [isKetboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
        loadFolders();
        const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () =>
        setKeyboardVisible(true)
        );
        const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () =>
        setKeyboardVisible(false)
        );
        
        
              // 컴포넌트 언마운트 시 리스너 제거
              return () => {
                keyboardDidShowListener.remove();
                keyboardDidHideListener.remove();
              };
        }, []);

    const addFolderModal = () => {
        setNameModal(true);
    };

    const closenameModal = () => {
        setNameModal(false);
        setName("");
    };

    const folderModal = (key) => {
        setSelectedFolderKey(key); // 선택된 폴더 키 저장
        setFileModal(true); // 모달 열기
    };

    const closeFolderModal = () => {
        setFileModal(false);
        setSelectedFolderKey(null); // 모달 닫을 때 선택된 키 초기화
    };

    const onChangeText = (payload) => setName(payload);

    const saveFolders = async(toSave) => {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
    };

    const loadFolders = async() => {
        const s = await AsyncStorage.getItem(STORAGE_KEY);
        const loadedFolders = JSON.parse(s);
        setFolders(loadedFolders || {});
    };

    const addFolder = async() => {
        const folderName = name === "" ? "제목 없음" : name; // 기본값 설정
        const newFolders = {
            ...folders,
            [Date.now()]: { name: folderName }, // 객체 구조 확인
        };
        setFolders(newFolders);
        await saveFolders(newFolders);
        setName("");
    };

    const deleteFolder = (key) => {
        Alert.alert("폴더 삭제", "폴더를 삭제하시겠습니까?", [
            { text: "취소"},
            {
                text: "삭제",
                style: "destructive",
                onPress: () => {
                    const newFolders = {...folders};
                    delete newFolders[key];
                    setFolders(newFolders);
                    saveFolders(newFolders);
                },
            },
        ]);
    };

    const changeName = (key) => {
        if (name === "") {
            return;
        }
        const newFolders = {...folders};
        newFolders[key].name = name;
        setFolders(newFolders);
        saveFolders(newFolders);
        setName("");
    };

    const radius = 140;
    const strokeWidth = 25;
    const circumference = 2 * Math.PI * radius;
    const percentage = 85;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <View style={styles.header}>
                <ImageBackground
                    source={require('../images/Top app bar.png')}
                    style={styles.headerBg}
                    resizeMode="contain"
                    imageStyle={{ borderRadius: 12 }}>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={styles.headerText}>JIQ</Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <View style={styles.separator} />
                        <TouchableOpacity onPress={addFolderModal}>
                            <View style={styles.addButton}>
                                <AntDesign name="pluscircleo" size={24} style={styles.addIcon} />
                            </View> 
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </View>
            <View style={{ flex: 1 }}>
                <ImageBackground
                    source={require('../images/folder frame.png')}
                    style={styles.screen}
                    resizeMode="contain"
                    imageStyle={{ borderRadius: 12 }}>
                    <ScrollView contentContainerStyle={styles.scrollContainer} style={{marginTop: 40,}}>
                        <View style={styles.row}>
                            {Object.keys(folders).map((key) => (
                                <View key={key} style={{ flexDirection: "column", justifyContent: "center", alignItems: "center", paddingVertical: 10 }}>
                                    <TouchableOpacity onPress={()=> navigation.navigate("FolderScreen", {folderName:folders[key]?.name, folderKey: key})}>
                                        <Image 
                                            source={require('../images/Folder Open 01.png')}
                                            style={styles.Icon} />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => folderModal(key)}> {/* 모달 열기 핸들러 수정 */}
                                        <View style={{ flexDirection: "row" }}>
                                            <Text style={styles.folderName}>
                                                {folders[key] && typeof folders[key].name === 'string' ? folders[key].name : "폴더 이름 없음"}
                                            </Text>
                                            <Entypo name="dots-three-vertical" 
                                                    style={{ marginTop: 3 }} 
                                                    size={15} 
                                                    color={theme.TextColor} />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </View>
                    </ScrollView>
                </ImageBackground>
            </View>

            {/* 모달 */}
            <Modal visible={fileModal} transparent={true} animationType="slide">
                <KeyboardAvoidingView style={styles.modalContainer} behavior={Platform.OS === "ios" ? "padding" : "height"}>
                    <View style={styles.modal}>
                        <View style={{...styles.folderModalScreen, flex: 0.65}}>
                            <TextInput
                                onChangeText={onChangeText}
                                onSubmitEditing={() => changeName(selectedFolderKey)} // 선택된 폴더 이름 변경
                                returnKeyType="done"
                                value={name}
                                placeholder={folders[selectedFolderKey]?.name || "폴더 이름"}
                                style={{...styles.input, textAlign: "center", fontSize: 30, fontWeight: "100%", width: "50%"}}
                            />
                            {!isKetboardVisible && (
                            <View
                             style={styles.PieChartContainer}>
                            <Svg width={400} height={400}>
                                <G rotation={-90} origin={"200, 200"}>
                                    <Circle
                                    cx={200}
                                    cy={200}
                                    r={radius}
                                    stroke={"#7CC6E8"}
                                    strokeWidth={strokeWidth}
                                    fill={"none"}/>
                                    <Circle
                                    cx={200}
                                    cy={200}
                                    r={radius}
                                    stroke={"#394C8B"}
                                    strokeWidth={strokeWidth}
                                    fill={"none"}
                                    strokeDasharray={`${circumference} ${circumference}`}
                                    strokeDashoffset={strokeDashoffset}/>
                                </G>
                            </Svg>
                            <View
                             position="absolute"
                             justifyContent="center"
                             alignItems="center">
                                <Text style={styles.pieChartText}>
                                    정답률 {"\n"} 85%
                                 </Text>
                            </View>
                            </View>
                            )}
                            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "95%" }}>
                                <TouchableOpacity
                                    style={{...styles.Button, backgroundColor: theme.wrongSign, paddingHorizontal: 25}}
                                    onPress={() => {deleteFolder(selectedFolderKey)
                                        closeFolderModal()} // 폴더 삭제 후 모달 닫기
                                    }
                                >
                                    <Text style={{...styles.modalText, color: theme.bg, fontSize: 20, fontWeight: "100%", textAlign: "center"}}>폴더 삭제</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{...styles.Button, paddingHorizontal: 25}}
                                    onPress={closeFolderModal}
                                >
                                    <Text style={{...styles.modalText, color: theme.bg, fontSize: 20, fontWeight: "100%", textAlign: "center"}}>확인</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </Modal>

            {/* 새로운 폴더 추가 모달 */}
            <Modal visible={nameModal} transparent={true} animationType="slide">
                <KeyboardAvoidingView style={styles.modalContainer} behavior={Platform.OS === "ios" ? "padding" : "height"}>
                    <View style={styles.modal}>
                        <View style={styles.modalscreen}>
                            <View alignItems="flex-end" width="100%">
                            <TouchableOpacity
                                onPress={closenameModal}>
                                <Feather name="x" size={24} color="black" marginHorizontal="30" />
                            </TouchableOpacity>
                            </View>
                            <View flexDirection="row" width="87%" alignItems="center" justifyContent="center">
                                <AntDesign name="addfolder" size={40} color={"#394C8B"} />
                                <Text style={{...styles.modalText, fontSize: 35, color: "#394C8B"}}>새로운 폴더</Text>
                                
                            </View>
                            <View flexDirection="row" justifyContent="flex-start" alignItems="center">
                                <Feather name="folder" size={235} color="#394C8B" />
                                <View style={styles.inputContainer}>
                                    <TextInput
                                        onChangeText={onChangeText}
                                        returnKeyType="done"
                                        value={name}
                                        placeholder="새로운 폴더"
                                        style={styles.input}
                                    />
                                    <TouchableOpacity 
                                        style={styles.Button} 
                                        onPress={() => {
                                            closenameModal();
                                            addFolder();
                                        }}>
                                        <Text style={{color: theme.bg, fontSize: 20, textAlign: "center"}}>추가</Text>
                                    </TouchableOpacity>    
                                </View>
                            </View>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </Modal>
        </View>
    );
};

export default HomeScreen;