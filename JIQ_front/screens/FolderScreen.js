import React, {useState} from "react";
import { StatusBar } from "expo-status-bar";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    ImageBackground,
    Image,
    ScrollView,
    Modal,
    TextInput,
} from "react-native";
import styles from "./HomeScreenStyles";
import AddQuizStyles from "./AddQuizStyles";
import QuizListstyles from "./QuizListStyles";
import { useNavigation, useRoute } from "@react-navigation/native";

const FolderScreen = ({ setTapPressed }) => {
    const navigation = useNavigation();
    const route = useRoute();
    const folderName = route.params?.folderName;

    const [isObjective, setIsObjective] = useState(false);
    const [isSubjective, setIsSubjective] = useState(false);

    const [isModalVisible, setModalVisible] = useState(false);
    const [quizName, setQuizName] = useState(""); // 퀴즈 이름 상태
    const [quizType, setQuizType] = useState(""); // 퀴즈 유형 상태
    const [quizList, setQuizList] = useState([]); // 퀴즈 목록 상태ㄴㄴ

    // 모달 표시/숨기기 토글
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    // 퀴즈 생성 핸들러
    const handleCreateQuiz = () => {
        if (!quizName.trim() || !quizType) return; // 퀴즈 이름이나 유형이 비어있으면 추가 안 함
        setQuizList((prevList) => [...prevList, { name: quizName, type: quizType }]); // 퀴즈 목록에 추가
        
        //console.log("Quiz Created:", { quizName, quizType });
        setQuizName(""); // 입력 필드 초기화
        setQuizType(""); // 유형 초기화
        setModalVisible(false); // 모달 닫기
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
                                    <TouchableOpacity style={QuizListstyles.viewButton}>
                                        <Text style={QuizListstyles.buttonText}>문제 보기</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={QuizListstyles.answerButton}>
                                        <Text style={QuizListstyles.buttonText}>오답</Text>
                                    </TouchableOpacity>
                                    <Text style={QuizListstyles.itemScore}>{quiz.type}</Text>
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
                        <View style={AddQuizStyles.radioGroup}>
                            <TouchableOpacity
                                style={[AddQuizStyles.radioButton, quizType === "객관식" && AddQuizStyles.selectedRadioButton,]}
                                onPress={() => setQuizType("객관식")}
                            >
                                <Text style={[AddQuizStyles.radioText, quizType !== "객관식" && AddQuizStyles.unselectedRadioText,]}>객관식</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[
                                    AddQuizStyles.radioButton,
                                    quizType === "단답형" && AddQuizStyles.selectedRadioButton,
                                ]}
                                onPress={() => setQuizType("단답형")}
                            >
                                <Text style={[AddQuizStyles.radioText, quizType !== "단답형" && AddQuizStyles.unselectedRadioText,]}>단답형</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity
                            style={AddQuizStyles.createButton}
                            onPress={handleCreateQuiz}
                        >
                            <Text style={AddQuizStyles.createButtonText}>생성</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        
        </View>



    );
};




export default FolderScreen;
