import React, { useState, useEffect, use } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import ShortAnswerQuizStyles from './ShortAnswerQuizStyles';
import AntDesign from "@expo/vector-icons/AntDesign";

import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const ShortAnswerQuiz = ({ route, navigation }) => {
  const { quiz_id } = route.params;
  const [questions, setQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [answers, setAnswers] = useState(Array(10).fill(''));
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [borderColor, setBorderColor] = useState('#000');

  const storageKey = `quiz_answers_${quiz_id}`;
  const submissionKey = `quiz_submitted_${quiz_id}`;

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
        
        const savedAnswers = await AsyncStorage.getItem(storageKey);
        const submittedStatus = await AsyncStorage.getItem(submissionKey);

        if(savedAnswers) setAnswers(JSON.parse(savedAnswers));
        if (submittedStatus === 'true') setIsSubmitted(true);
      } catch (error) {
        console.error("문제 가져오기 실패:", error);
      }
    };
    fetchQuizQuestions();
  }, [quiz_id]);

  useEffect(() => {
    const fetchQuizResult = async () => {
      try {
        const response = await axios.get(`http://34.83.186.210:8000/quiz/quiz/quiz-results/${quiz_id}`);
        console.log(response.data);

         // results 배열에서 현재 페이지 번호에 해당하는 데이터 찾기
        const result = response.data.results?.find(r => r.quiz_number === currentPage);

        if (result) {
          setBorderColor(result.is_correct ? '#16C47F' : '#E16378');
        }
      } catch (error) {
        console.error("결과 가져오기 실패:", error);
      }
    };
    fetchQuizResult();
  }, [quiz_id, currentPage]);


  const handleAnswerChange = async (text) => {
    if (isSubmitted) return;

    const updatedAnswers = [...answers];
    updatedAnswers[currentPage - 1] = text; // 현재 페이지의 답 저장
    setAnswers(updatedAnswers);

    try {
      await AsyncStorage.setItem(storageKey, JSON.stringify(updatedAnswers));
    } catch (error) {
      console.error("답변 저장 실패", error);
    }
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

  const handleResult = async () => {
    if (isSubmitted) {
      Alert.alert("알림", "이미 제출된 퀴즈입니다.");
      navigation.goBack();
      return;
    }

    try {
      const payload = {
        answers: questions.map((question, index) => ({
          quiz_id: quiz_id,
          quiz_number: question.quiz_number,
          user_answer: answers[index] || "",
        })),
      };

      console.log("보낼 데이터:", JSON.stringify(payload, null, 2));

      const response = await axios.post("http://34.83.186.210:8000/quiz/quiz/user-answers",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      Alert.alert("성공", "답안이 성공적으로 제출되었습니다!");
      setIsSubmitted(true);
      await AsyncStorage.setItem(submissionKey, 'true');
      navigation.goBack();
      console.log("서버 응답:", response.data);
    }catch (error) {
      console.error("답안 제출 실패:", error);
      Alert.alert("오류", "답안 제출 중 문제가 발생했습니다.");
    }
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
            <View style={[ShortAnswerQuizStyles.questionContainer, {borderColor: borderColor, borderWidth: 10}]}>
              <Text style={ShortAnswerQuizStyles.questionText}>
                {`${currentQuestion.quiz_question}`}
              </Text>
            </View>
          ) : (
            <Text style={ShortAnswerQuizStyles.questionText}>문제를 불러오는 중...</Text>
          )}
        </View>

        <View style={ShortAnswerQuizStyles.container}>
          <View style={ShortAnswerQuizStyles.shadowBox}>
            <TextInput
              style={[ShortAnswerQuizStyles.textInput, {color: isSubmitted && answers[currentPage-1] ? '#B5C0D0' : '#394c8b'},]}
              placeholder="정답을 입력하세요"
              value={answers[currentPage - 1] || ''}
              onChangeText={handleAnswerChange}
              multiline
              editable={!isSubmitted}
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
            <Text style={ShortAnswerQuizStyles.resultButtonText}>Submit</Text>
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
