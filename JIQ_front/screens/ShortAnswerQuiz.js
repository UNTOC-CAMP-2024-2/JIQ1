import React, { useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import ShortAnswerQuizStyles from './ShortAnswerQuizStyles';
import AntDesign from "@expo/vector-icons/AntDesign";

import axios from "axios";

const ShortAnswerQuiz = ({ route, navigation }) => {
  const { quiz_id } = route.params;
  const [questions, setQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    const fetchQuizQuestions = async () => {
      try {
        const response = await axios.get(`http://34.83.186.210:8000/quiz/quiz/get-quiz/${quiz_id}`);
        const allQuestion = response.data.question || [];

        const filteredQuestions = allQuestion.filter(
          (question) => question.quiz_number >= 1 && question.quiz_number <= 10
        );

        setQuestions(filteredQuestions);
        setAnswers(Array(filteredQuestions.length).fill(''));
      } catch (error) {
        console.error("문제 가져오기 실패:", error);
      }
    };
    fetchQuizQuestions();
  }, [quiz_id]);

  const currentQuestion = questions[currentPage - 1];

  const handleAnswerChange = (text) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentPage - 1] = text; // 현재 페이지에 입력한 답 저장
    setAnswers(updatedAnswers);
  };

  const handleNextPage = () => {
    if (currentPage < questions.length) {
      setCurrentPage(currentPage + 1); // 다음 페이지로 이동
    } else {
      Alert.alert("퀴즈 완료", "모든 문제를 완료했습니다!");
      navigation.goBack(); // 퀴즈 완료 후 이전 화면으로 이동
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1); // 이전 페이지로 이동
    }
  };


  const handleResult = () => {
    // Result 버튼을 눌렀을 때 동작
    Alert.alert("결과", "채점 화면으로 이동합니다!");
  };

  return (
    <KeyboardAvoidingView
      style={[ShortAnswerQuizStyles.container, {paddingTop: Platform.OS === 'ios' ? 50 : 20}]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
       // iOS에서 키보드와의 간격 조정
    >
      <TouchableOpacity onPress={() => navigation.goBack()} style = {ShortAnswerQuizStyles.backButton}>
        <AntDesign name="arrowleft" size={24} color="black" />
      </TouchableOpacity>
          
      <ScrollView
        contentContainerStyle={ShortAnswerQuizStyles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={ShortAnswerQuizStyles.questionContainer}>
          {currentQuestion ? (
            <Text style={ShortAnswerQuizStyles.questionText}>
              {`${currentQuestion.quiz_number}: ${currentQuestion.quiz_question}`}
            </Text>
          ) : (
            <Text style={ShortAnswerQuizStyles.questionText}>문제를 불러오는 중...</Text>
          )}
        </View>

        <View style={ShortAnswerQuizStyles.shadowBox}>
          <TextInput
            style={ShortAnswerQuizStyles.textInput}
            placeholder="정답을 입력하세요"
            value={answers[currentPage - 1] || ''} // 현재 페이지의 답 표시
            onChangeText={handleAnswerChange} // 입력값 업데이트
            multiline // 여러 줄 입력 가능
          />
        </View>
      </ScrollView>

      <View style={ShortAnswerQuizStyles.footer}>
        {/*이전 버튼*/}
        <TouchableOpacity
          onPress={handlePreviousPage}
          disabled={currentPage === 1} // 첫 페이지에서는 비활성화
        >
          <AntDesign name="leftcircleo" size={40} color={currentPage === 1 ? "#d3d3d3" : "#394C8B"} />
        </TouchableOpacity>

        <Text style={ShortAnswerQuizStyles.pageIndicatorText}>{`${currentPage}/${questions.length}`}</Text>

        {/* 다음 버튼 또는 Result 버튼 */}
        {currentPage === questions.length ? (
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
