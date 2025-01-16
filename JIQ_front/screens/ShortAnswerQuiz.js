import React, { useState, useEffect } from 'react';
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
  const [answers, setAnswers] = useState(Array(10).fill(''));

  useEffect(() => {
    const fetchQuizQuestions = async () => {
      try {
        const response = await axios.get(`http://34.83.186.210:8000/quiz/quiz/get-quiz/${quiz_id}`);
        const allQuestions = response.data.quizzes || [];

        if (allQuestions.length !== 10) {
          Alert.alert("오류", "문제 수가 올바르지 않습니다. 관리자에게 문의하세요.");
          navigation.goBack();
          return;
        }

        setQuestions(allQuestions);
      } catch (error) {
        console.error("문제 가져오기 실패:", error);
      }
    };
    fetchQuizQuestions();
  }, [quiz_id]);

  const handleAnswerChange = (text) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentPage - 1] = text; // 현재 페이지의 답 저장
    setAnswers(updatedAnswers);
  };

  const handleNextPage = () => {
    if (currentPage < questions.length) {
      setCurrentPage(currentPage + 1);
    } else {
      Alert.alert("퀴즈 완료", "모든 문제를 완료했습니다!");
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleResult = () => {
    Alert.alert("결과", "채점 화면으로 이동합니다!");
  };

  const currentQuestion = questions[currentPage - 1];

  return (
    <KeyboardAvoidingView
      style={[ShortAnswerQuizStyles.container, { paddingTop: Platform.OS === 'ios' ? 50 : 20 }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 80}
    >
      <TouchableOpacity onPress={() => navigation.goBack()} style={ShortAnswerQuizStyles.backButton}>
        <AntDesign name="arrowleft" size={30} color="black" />
      </TouchableOpacity>


        <View style={ShortAnswerQuizStyles.container}>
          {currentQuestion ? (
            <View style={ShortAnswerQuizStyles.questionContainer}>
              <Text style={ShortAnswerQuizStyles.questionText}>
                {`${currentPage}: ${currentQuestion.quiz_question}`}
              </Text>
            </View>
          ) : (
            <Text style={ShortAnswerQuizStyles.questionText}>문제를 불러오는 중...</Text>
          )}
        </View>

        <View style={ShortAnswerQuizStyles.container}>
          <View style={ShortAnswerQuizStyles.shadowBox}>
            <TextInput
              style={ShortAnswerQuizStyles.textInput}
              placeholder="정답을 입력하세요"
              value={answers[currentPage - 1] || ''}
              onChangeText={handleAnswerChange}
              multiline
            />
          </View>
        </View>


      <View style={ShortAnswerQuizStyles.footer}>
        <TouchableOpacity
          onPress={handlePreviousPage}
          disabled={currentPage === 1}
        >
          <AntDesign name="leftcircleo" size={40} color={currentPage === 1 ? "#d3d3d3" : "#394C8B"} />
        </TouchableOpacity>

        <Text style={ShortAnswerQuizStyles.pageIndicatorText}>{`${currentPage}/${questions.length}`}</Text>

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
