import React, {useState, useEffect} from "react";
import { StatusBar } from "expo-status-bar";
import AntDesign from "@expo/vector-icons/AntDesign";
import { View, Text, TouchableOpacity, ImageBackground, Image, ScrollView, Modal, TextInput, Alert, Platform,} from "react-native";

import * as DocumentPicker from "expo-document-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";

import styles from "./HomeScreenStyles";
import AddQuizStyles from "./AddQuizStyles";
import QuizListstyles from "./QuizListStyles";
import FolerScreenstyle from "./FolderScreenStyle";
const STORAGE_KEY = "@quizList";
const STOREAGE_SUBMISSION_KEY = "@quizSubmission";

const FolderScreen = ({ setTapPressed }) => {
    
    const navigation = useNavigation();
    const route = useRoute();
    const folderName = route.params?.folderName;

    const [isModalVisible, setModalVisible] = useState(false);
    const [quizName, setQuizName] = useState(""); // 퀴즈 이름 상태
    const [quizList, setQuizList] = useState([]); // 퀴즈 목록 상태
    const [uploadedFile, setUploadedFile] = useState(null);
    const [fileUri, setFileUri] = useState(null);


    // 모달 표시/숨기기 토글
    const toggleModal = () => {
        console.log("모달 토글 호출됨");
        if (isModalVisible) {
            // 모달이 닫힐 때 상태 초기화
            setQuizName(""); // 퀴즈 이름 초기화
            setUploadedFile(null); // 파일 초기화
            setFileUri(null);
        }
        setModalVisible(!isModalVisible);
        console.log("모달 상태:", !isModalVisible);
    };

    useEffect(() => {
        console.log("현재 선택된 파일:", uploadedFile);
    }, [uploadedFile]);
    
    // AsyncStorage에서 퀴즈 리스트 로드
    useEffect(() => {
        const loadQuizzes = async () => {
            try {
                const folderId = route.params?.folderId;//folder_id 가져오기
                const storedQuizzes = await AsyncStorage.getItem(`${STORAGE_KEY}_${folderId}`);
                const storedStatus = await AsyncStorage.getItem(STOREAGE_SUBMISSION_KEY);
                const submissionStatus = storedStatus ? JSON.parse(storedStatus) : {};

                if (storedQuizzes) {
                    const quizzes = JSON.parse(storedQuizzes).map((quiz) => ({
                        ...quiz,
                        submited: submissionStatus[quiz.quiz_id] || false,
                    }));
                    setQuizList(quizzes);
                } else {
                    setQuizList([]); // 폴더가 비어 있으면 초기화
                }
            } catch (error) {
                console.error("Failed to load quizzes:", error);
            }
        };
        loadQuizzes();
    }, [route.params?.folderId]);

    //const folderId = route?.params?.folderId || null;
       
    // AsyncStorage에 퀴즈 리스트 저장
    const saveQuizzes = async (quizzes) => {
        try {
            const folderId = route.params?.folderId; // 현재 폴더 ID
            if (!folderId) {
                console.error("폴더 ID가 누락되었습니다.");
                return;
            }
            await AsyncStorage.setItem(`${STORAGE_KEY}_${folderId}`, JSON.stringify(quizzes));
        } catch (error) {
            console.error("퀴즈 저장 실패:", error);
        }
    };

    // 퀴즈 생성 함수
    const handleCreateQuiz = () => {
        if (!quizName.trim()) {
            Alert.alert("생성불가", "퀴즈 이름을 입력해주세요.");
            return;
        }

        if (!uploadedFile || !uploadedFile.quiz_id) {
            Alert.alert("업로드된 파일 없음", "PDF 파일을 업로드해주세요.");
            return;
        }

        const newQuiz = { name: quizName, file: uploadedFile, quiz_id: uploadedFile.quiz_id };
        const updatedQuizList = [...quizList, newQuiz];
        setQuizList(updatedQuizList);
        saveQuizzes(updatedQuizList);

        console.log(`Quiz Created: ${JSON.stringify(newQuiz)}`);
        Alert.alert("성공", `퀴즈 "${quizName}"가 생성되었습니다.`);
        toggleModal(); // 모달 닫기
    };

    // 퀴즈 삭제 핸들러
    const handleDeleteQuiz = (index) => {
        Alert.alert("Delete", "삭제하시겠습니까?",
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

    const handleFilePickAndUpload = async () => {
        console.log("파일 선택 함수 호출됨");

        try {

            console.log("DocumentPicker 호출 시작");
            const result = await DocumentPicker.getDocumentAsync({
                type: "application/pdf",
                copyToCacheDirectory: true,
            });
    
            console.log("DocumentPicker 결과:", result);
    
            if (result.type === "cancel") {
                console.log("사용자가 파일 선택 취소");
                return;
            }
    
            // 파일 정보가 assets 배열에 있는지 확인
            const fileInfo = result.assets ? result.assets[0] : result;
            if (!fileInfo || !fileInfo.uri) {
                Alert.alert("파일 선택 오류", "선택된 파일의 경로를 찾을 수 없습니다.");
                return;
            }
    
            const fileUri = Platform.OS === "ios" ? fileInfo.uri.replace("file://", "") : fileInfo.uri;
            console.log("파일 경로:", fileUri);

            setFileUri(fileUri);
    
            const formData = new FormData();
            formData.append("file", {
                uri: fileInfo.uri,
                name: fileInfo.name || "uploaded_file.pdf",
                type: fileInfo.mimeType || "application/pdf",
            });
    
            console.log("FormData 생성 완료:", formData);
    
            // 백엔드로 파일 전송
            const response = await axios.post(
                "http://34.127.108.95:8000/quiz/quiz/generate-from-file",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
    
            console.log("백엔드 응답 데이터:", response.data);
            setUploadedFile(response.data); // 업로드된 파일 상태 업데이트
            Alert.alert("성공", "PDF가 성공적으로 업로드되었습니다.");
        } catch (error) {
            console.error("오류 발생:", error.response?.data || error.message);
            Alert.alert("오류", "PDF 업로드 중 문제가 발생했습니다.");
        } 
        console.log("파일 업로드 함수 종료");
    };
    
    //문제 보기 화면 연결 -> 항상 단답형으로 이동
    const handleViewQuiz = (quiz) => {
        if (!quiz.submitted){
            navigation.navigate('ShortAnswerQuiz', {
                quiz_id: quiz.quiz_id,
                folderId: route.params?.folderId,
            });
        } else {
            navigation.navigate('resultscreen', {
                quiz_id: quiz.quiz_id,
            });
        }

    };

    const handleWrongAnswers = (quiz) => {
        navigation.navigate("WrongScreen", {
            quizId: quiz.quiz_id,
        });
    };


    const saveSubmissionStatus = async (quizId, submitted) => {
        try {
            const storedStatus = await AsyncStorage.getItem(STOREAGE_SUBMISSION_KEY);
            const submissionStatus = storedStatus ? JSON.parse(storedStatus) : {};
            submissionStatus[quizId] = submitted;
            await AsyncStorage.setItem(STOREAGE_SUBMISSION_KEY, JSON.stringify(submissionStatus));

            setQuizList((prevQuizList) => 
                prevQuizList.map((quiz) =>
                    quiz.quiz_id === quizId ? {...quiz, submitted: true} : quiz
                )
            );
        } catch (error) {
            console.error("제출 상태 저장 실패:", error);
        }
    };

      return (
        <View style={[styles.container, {paddingTop: Platform.OS === 'ios' ? 50 : 20}]}>
            <StatusBar style="light" />      
            <View style={[styles.header, {marginTop: 20}]}>
                <ImageBackground
                    source={require('../images/Top app bar.png')}
                    style={styles.headerBg}
                    resizeMode="contain"
                    imageStyle={{ borderRadius: 12 }}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <AntDesign name="arrowleft" size={28} color="black" style={{paddingLeft: 20}} />
                        </TouchableOpacity>
                        <Text style={FolerScreenstyle.headerText}>{folderName}</Text>
                    </View>
                    
                    <View style={{ flexDirection: "row" }}>
                        <View style={styles.separator} />
                        <TouchableOpacity onPress={toggleModal}>
                            <View style={styles.addButton}>
                                <AntDesign name="pluscircleo" size={30} style={styles.addIcon} />
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
                                        <Text style={QuizListstyles.buttonText}>
                                            {quiz.submitted ? "결과 확인" : "문제 보기"}
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                    onPress={() => handleWrongAnswers(quiz)}
                                    style={QuizListstyles.answerButton}>
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
                            {fileUri ? `${fileUri}` : "PDF 파일을 업로드하세요"}
                        </Text>
                    </View>
            
            {/* PDF 업로드 버튼 */}
            <View style={AddQuizStyles.buttonRow}>
                <TouchableOpacity style={AddQuizStyles.uploadButton} onPress={handleFilePickAndUpload}>
                <Text style={AddQuizStyles.createButtonText}>pdf 업로드</Text>
                </TouchableOpacity>
                            <TouchableOpacity
                                style={AddQuizStyles.createButton}
                                onPress={handleCreateQuiz}>
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
