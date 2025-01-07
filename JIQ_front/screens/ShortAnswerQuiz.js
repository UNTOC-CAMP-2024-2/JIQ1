import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import ShortAnswerQuizStyles from './ShortAnswerQuizStyles';
import AntDesign from "@expo/vector-icons/AntDesign";

const ShortAnswerQuiz = ({ route, navigation }) => {
  //퀴즈 더 추가할려면 여기에 question 더 추가하면 됨
  const quizData = [
    { question: "문제 1: 사과는 무슨 색인가요?" },
    { question: "문제 2: 바다는 어떤 색인가요?" },
    { question: "문제 3: 내 나이는?" },
    { question: "문제 4: 1+1은?" },
    { question: "문제 5: 으아아아 도망쳐" },
  ];

  const [currentPage, setCurrentPage] = useState(0); // 현재 페이지 인덱스
  const [answers, setAnswers] = useState(Array(quizData.length).fill('')); // 각 문제의 답 관리

  const handleAnswerChange = (text) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentPage] = text; // 현재 페이지에 입력한 답 저장
    setAnswers(updatedAnswers);
  };

  const handleNextPage = () => {
    if (currentPage < quizData.length - 1) {
      setCurrentPage(currentPage + 1); // 다음 페이지로 이동
    } else {
      Alert.alert("퀴즈 완료", "모든 문제를 완료했습니다!");
      navigation.goBack(); // 퀴즈 완료 후 이전 화면으로 이동
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1); // 이전 페이지로 이동
    }
  };

  const currentQuiz = quizData[currentPage]; // 현재 문제 가져오기

  const handleResult = () => {
    // Result 버튼을 눌렀을 때 동작
    Alert.alert("결과", "채점 화면으로 이동합니다!");
  };

  return (
    <KeyboardAvoidingView
      style={ShortAnswerQuizStyles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0} // iOS에서 키보드와의 간격 조정
    >
      <TouchableOpacity onPress={() => navigation.goBack()} style = {ShortAnswerQuizStyles.backButton}>
        <AntDesign name="arrowleft" size={24} color="black" /> </TouchableOpacity>
      
      
      <ScrollView
        contentContainerStyle={ShortAnswerQuizStyles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={ShortAnswerQuizStyles.questionContainer}>
          <Text style={ShortAnswerQuizStyles.questionText}>{currentQuiz.question}</Text>
        </View>

        <View style={ShortAnswerQuizStyles.shadowBox}>
          <TextInput
            style={ShortAnswerQuizStyles.textInput}
            placeholder="정답을 입력하세요"
            value={answers[currentPage]} // 현재 페이지의 답 표시
            onChangeText={handleAnswerChange} // 입력값 업데이트
            multiline // 여러 줄 입력 가능
          />
        </View>
      </ScrollView>

      <View style={ShortAnswerQuizStyles.footer}>
        {/*이전 버튼*/}
        <TouchableOpacity
          onPress={handlePreviousPage}
          disabled={currentPage === 0} // 첫 페이지에서는 비활성화
        >
          <AntDesign name="leftcircleo" size={40} color={currentPage === 0 ? "#d3d3d3" : "#394C8B"} />
        </TouchableOpacity>

        <Text style={ShortAnswerQuizStyles.pageIndicatorText}>{`${currentPage + 1}/${quizData.length}`}</Text>

        {/* 다음 버튼 또는 Result 버튼 */}
        {currentPage === quizData.length - 1 ? (
          <TouchableOpacity style={ShortAnswerQuizStyles.resultButton} onPress={handleResult}>
            <Text style={ShortAnswerQuizStyles.resultButtonText}>Result</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={handleNextPage}>
            <AntDesign name="rightcircleo" size={40} color="#394C8B" />
          </TouchableOpacity>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

export default ShortAnswerQuiz;
