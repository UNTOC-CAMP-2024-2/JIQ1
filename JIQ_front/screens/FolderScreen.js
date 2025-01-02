import React, {useState, useEffect} from "react";
import { StatusBar } from "expo-status-bar";
import AntDesign from "@expo/vector-icons/AntDesign";
//import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    ImageBackground,
    Image,
    ScrollView,
    Modal,
    TextInput,
    Alert,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

import styles from "./HomeScreenStyles";
import AddQuizStyles from "./AddQuizStyles";
import QuizListstyles from "./QuizListStyles";
import { useNavigation, useRoute } from "@react-navigation/native";

const STORAGE_KEY = "@quizList";

const FolderScreen = ({ setTapPressed }) => {
    const navigation = useNavigation();
    const route = useRoute();
    const folderName = route.params?.folderName;

    const [isObjective, setIsObjective] = useState(false);
    const [isSubjective, setIsSubjective] = useState(false);

    const [isModalVisible, setModalVisible] = useState(false);
    const [quizName, setQuizName] = useState(""); // 퀴즈 이름 상태
    const [quizType, setQuizType] = useState([]); // 퀴즈 유형 상태
    const [quizList, setQuizList] = useState([]); // 퀴즈 목록 상태
    const [selectedFile, setSelectedFile] = useState(null);


    // 모달 표시/숨기기 토글
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    // AsyncStorage에서 퀴즈 리스트 로드
    useEffect(() => {
        const loadQuizzes = async () => {
            try {
                const storedQuizzes = await AsyncStorage.getItem(STORAGE_KEY);
                if (storedQuizzes) {
                    setQuizList(JSON.parse(storedQuizzes));
                }
            } catch (error) {
                console.error("Failed to load quizzes:", error);
            }
        };
        loadQuizzes();
    }, []);

        // AsyncStorage에 퀴즈 리스트 저장
        const saveQuizzes = async (quizzes) => {
            try {
                await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(quizzes));
            } catch (error) {
                console.error("Failed to save quizzes:", error);
            }
        };

    // 퀴즈 생성 핸들러
    const handleCreateQuiz = () => {
        if (!quizName.trim() || !quizType.length===0) return; // 퀴즈 이름이나 유형이 비어있으면 추가 안 함
        
        const updatedQuizzes = [...quizList, { name: quizName, type: quizType.join(" ") }];
        setQuizList(updatedQuizzes);
        saveQuizzes(updatedQuizzes);

        //console.log("Quiz Created:", { quizName, quizType });
        setQuizName(""); // 입력 필드 초기화
        setQuizType([]); // 유형 초기화
        setSelectedFile(null); //파일 초기화
        setModalVisible(false); // 모달 닫기
    };

    // 퀴즈 삭제 핸들러
    const handleDeleteQuiz = (index) => {
        Alert.alert(
            "Delete",
            "삭제하시겠습니까?",
            [
                {
                    text: "취소",
                    style: "cancel",
                },
                {
                    text: "OK",
                    onPress: () => {
                        const updatedQuizzes = quizList.filter((_, i) => i !== index);
                        setQuizList(updatedQuizzes);
                        saveQuizzes(updatedQuizzes);
                    }
                }
            ],
            {cancelable: false}
        );
    };

  // PDF 파일 선택 핸들러
    const handleFilePick = async () => {
        try {
        const result = await DocumentPicker.getDocumentAsync({
            type: "application/pdf", // PDF 파일만 허용
            copyToCacheDirectory: true,
        });

        if (result.type === "success") {
            setSelectedFile(result); // 선택한 파일 저장
        } else {
            Alert.alert("파일 선택 취소됨");
        }
        } catch (error) {
        console.error("Error picking file:", error);
        Alert.alert("파일 선택 중 오류 발생");
        }
    };

    // 유형 선택 핸들러
    const handleQuizTypeToggle = (type) => {
        if (quizType.includes(type)) {
            setQuizType(quizType.filter((item) => item !== type)); // 이미 선택된 유형은 제거
        } else {
            setQuizType([...quizType, type]); // 선택되지 않은 유형은 추가
        }
    };

    //유형에 맞는 퀴즈 화면 연결
    const handleViewQuiz = (quiz) => {
        
        if (quiz.type.includes("객관식") && quiz.type.includes("단답형")){
            Alert.alert("아직 화면 없음", "이 유형의 화면은 어케 만들지");
        }
        else if (quiz.type.includes("객관식")) {
            navigation.navigate('MultipleQuiz', {
                question: '문제 화면',
                options: ['선지', '선지', '선지', '선지'],
                currentPage: 1,
                totalPage: 5,
            });
        }else if (quiz.type.includes("단답형")) {
            navigation.navigate('ShortAnswerQuiz',{
                question: '문제 화면',
                currentPage: 1,
                totalPage: 5,
            });
        }else{
            Alert.alert("단답형 객관식이 모두 섞여있는건 아직 없음 ㅋㅋ");
        }
    };

      return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <View style={[styles.header, {marginTop: 20}]}>
                <ImageBackground
                    source={require('../images/Top app bar.png')}
                    style={styles.headerBg}
                    resizeMode="contain"
                    imageStyle={{ borderRadius: 12 }}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <AntDesign name="arrowleft" size={24} color="black" style={{paddingLeft: 20}} />
                        </TouchableOpacity>
                        <Text style={styles.headerText}>{folderName}</Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <View style={styles.separator} />
                        <TouchableOpacity onPress={toggleModal}>
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
                    <ScrollView contentContainerStyle={QuizListstyles.screen} style={{marginTop: 50}}>
                        
                        {/* 퀴즈 목록 표시 */}
                        {quizList.map((quiz, index) => (
                            <View key={index} style={QuizListstyles.quizItemContainer}>
                                <View style={QuizListstyles.quizItemContent}>
                                    <AntDesign name="filetext1" size={35} color="#394C8B" />
                                    <Text style={QuizListstyles.quizItemText}>{quiz.name}</Text>
                                </View>
                                <View style={QuizListstyles.quizItemButtons}>
                                    <TouchableOpacity
                                    style={QuizListstyles.viewButton}
                                    onPress={() => handleViewQuiz(quiz)}>
                                        <Text style={QuizListstyles.buttonText}>문제 보기</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={QuizListstyles.answerButton}>
                                        <Text style={QuizListstyles.buttonText}>오답</Text>
                                    </TouchableOpacity>
                                    <Text style={QuizListstyles.itemScore}>{quiz.type}</Text>
                                    <TouchableOpacity onPress={() => handleDeleteQuiz(index)}>
                                        <AntDesign name="delete" size={30} color="#394C8B" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))}
                    </ScrollView>
                </ImageBackground>
            </View>
        
      
      
      
      {/* 새로운 퀴즈 추가 모달 */}
      <Modal visible={isModalVisible} transparent={true} animationType="slide">
                <View style={AddQuizStyles.modalContainer}>
                    <View style={AddQuizStyles.modal}>
                        <View style={AddQuizStyles.modalHeader}>
                            <Text style={AddQuizStyles.modalTitle}>새로운 퀴즈</Text>
                            <TouchableOpacity onPress={toggleModal} style={AddQuizStyles.closeButton}>
                                <AntDesign name="close" style={AddQuizStyles.closeIcon} />
                            </TouchableOpacity>
                        </View>
                        <TextInput
                            style={AddQuizStyles.input}
                            placeholder="새로운 퀴즈"
                            value={quizName}
                            onChangeText={setQuizName}
                        />

                        {/* PDF 파일 경로 표시 박스 */}
                        <View style={AddQuizStyles.filePathBox}>
                        <Text style={AddQuizStyles.filePathText}>
                            {selectedFile ? `파일 경로: ${selectedFile.uri}` : "업로드된 PDF 파일 경로가 표시됩니다"}
                        </Text>
                    </View>

                        <View style={AddQuizStyles.radioGroup}>
                            <TouchableOpacity
                                style={[AddQuizStyles.radioButton, quizType.includes("객관식") && AddQuizStyles.selectedRadioButton,]}
                                onPress={() => handleQuizTypeToggle("객관식")}
                            >
                                <Text style={[AddQuizStyles.radioText, !quizType.includes("객관식") && AddQuizStyles.unselectedRadioText,]}>객관식</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[
                                    AddQuizStyles.radioButton,
                                    quizType.includes("단답형") && AddQuizStyles.selectedRadioButton,
                                ]}
                                onPress={() => handleQuizTypeToggle("단답형")}
                            >
                                <Text style={[AddQuizStyles.radioText, !quizType.includes("단답형") && AddQuizStyles.unselectedRadioText,]}>단답형</Text>
                            </TouchableOpacity>
                        </View>
            
            {/* PDF 업로드 버튼 */}
            <View style={AddQuizStyles.buttonRow}>
                <TouchableOpacity style={AddQuizStyles.uploadButton} onPress={handleFilePick}>
                <Text style={AddQuizStyles.createButtonText}>
                    {selectedFile ? `업로드된 파일: ${selectedFile.name}` : "PDF 업로드"}
                </Text>
                </TouchableOpacity>
                            <TouchableOpacity
                                style={AddQuizStyles.createButton}
                                onPress={handleCreateQuiz}
                            >
                                <Text style={AddQuizStyles.createButtonText}>생성</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        
        </View>



    );
};




export default FolderScreen;
