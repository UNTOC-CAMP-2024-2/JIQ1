import React, {useState, useEffect} from "react";
import { StatusBar } from "expo-status-bar";
import AntDesign from "@expo/vector-icons/AntDesign";
//import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { View, Text, TouchableOpacity, ImageBackground, Image, ScrollView, Modal, TextInput, Alert,} from "react-native";

import * as DocumentPicker from "expo-document-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";

import styles from "./HomeScreenStyles";
import AddQuizStyles from "./AddQuizStyles";
import QuizListstyles from "./QuizListStyles";
const STORAGE_KEY = "@quizList";

const FolderScreen = ({ setTapPressed }) => {
    const navigation = useNavigation();
    const route = useRoute();
    const folderName = route.params?.folderName;

    const [isModalVisible, setModalVisible] = useState(false);
    const [quizName, setQuizName] = useState(""); // 퀴즈 이름 상태
    const [quizList, setQuizList] = useState([]); // 퀴즈 목록 상태
    const [selectedFile, setSelectedFile] = useState(null);

    // 모달 표시/숨기기 토글
    const toggleModal = () => {
        if (isModalVisible) {
            // 모달이 닫힐 때 상태 초기화
            setQuizName(""); // 퀴즈 이름 초기화
            setSelectedFile(null); // 파일 초기화
        }
        setModalVisible(!isModalVisible);
    };

    // AsyncStorage에서 퀴즈 리스트 로드
    useEffect(() => {
        const loadQuizzes = async () => {
            try {
                const folderId = route.params?.folderId; // 현재 폴더의 ID
                const storedQuizzes = await AsyncStorage.getItem(`${STORAGE_KEY}_${folderId}`);
                if (storedQuizzes) {
                    setQuizList(JSON.parse(storedQuizzes));
                } else {
                    setQuizList([]); // 폴더가 비어 있으면 초기화
                }
            } catch (error) {
                console.error("Failed to load quizzes:", error);
            }
        };
        loadQuizzes();
    }, [route.params?.folderId]);

    // AsyncStorage에 퀴즈 리스트 저장
    const saveQuizzes = async (quizzes) => {
        try {
            const folderId = route.params?.folderId; // 현재 폴더 ID
            if (!folderId) {
                console.error("Folder ID is missing");
                return;
            }
            await AsyncStorage.setItem(`${STORAGE_KEY}_${folderId}`, JSON.stringify(quizzes));
        } catch (error) {
            console.error("Failed to save quizzes:", error);
        }
    };

    // 퀴즈 생성 핸들러
    const handleCreateQuiz = () => {
        if (!quizName.trim()){
            Alert.alert("생성불가", "퀴즈 이름을 입력해주세요.");
            return;
        } // 퀴즈 이름이나 유형이 비어있으면 추가 안 함
        
        const updatedQuizzes = [...quizList, { name: quizName }];
        setQuizList(updatedQuizzes); // 상태 업데이트
        saveQuizzes(updatedQuizzes); // AsyncStorage에 저장
    
        setQuizName(""); // 초기화
        setModalVisible(false);

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

  // PDF 파일 선택 및 업로드
    const handleFilePickandUpload = async () => {
        try {
        const result = await DocumentPicker.getDocumentAsync({
            type: "application/pdf", // PDF 파일만 허용
            copyToCacheDirectory: true,
        });

        if (result.type === "success") {
            const formData = new FormData();
            formData.append("file", {
                uri: result.uri,
                name: result.name,
                type: "application/pdf",
            });

            const response = await axios.post("pdf 보낼 백엔드 경로 입력", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            Alert.alert("성공", "파일이 성공적으로 업로드되었습니다.");
            setUploadedFilePath(response.data.filePath); //업로드 된 파일 경로 저장장
        } else {
            Alert.alert("파일 선택 취소됨");
        }
    } catch (error) {
        console.error("파일 업로드 중 오류:", error);
        Alert.alert("오류", "파일 업로드 중 문제가 발생했습니다.");
        }
    };

    //문제 보기 화면 연결 -> 항상 단답형으로 이동
    const handleViewQuiz = (quiz) => {
        navigation.navigate('ShortAnswerQuiz', {
            question: '문제 화면',
            currentPage: 1,
            totalPage: 5,
        });
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
                                    <TouchableOpacity
                                    onPress={() => navigation.navigate('WrongScreen')}
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
                            {selectedFile ? `파일 경로: ${selectedFile.uri}` : "업로드된 PDF 파일 경로가 표시됩니다"}
                        </Text>
                    </View>
            
            {/* PDF 업로드 버튼 */}
            <View style={AddQuizStyles.buttonRow}>
                <TouchableOpacity style={AddQuizStyles.uploadButton} onPress={handleFilePickandUpload}>
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
