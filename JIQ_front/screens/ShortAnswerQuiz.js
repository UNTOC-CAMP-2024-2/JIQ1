import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, KeyboardAvoidingView,ScrollView,Platform} from 'react-native';
import ShortAnswerQuizStyles from './ShortAnswerQuizStyles';

const ShortAnswerQuiz = ({ route, navigation }) => {
  const { question = "문제 화면", currentPage = 1, totalPages = 5 } = route.params || {};
  const [answer, setAnswer] = useState(''); // 사용자 입력 상태

  return (
    <KeyboardAvoidingView
      style={ShortAnswerQuizStyles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0} // iOS에서 키보드와의 간격 조정
    >
      <ScrollView
        contentContainerStyle={ShortAnswerQuizStyles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={ShortAnswerQuizStyles.questionContainer}>
          <Text style={ShortAnswerQuizStyles.questionText}>{question}</Text>
        </View>

        <View style={ShortAnswerQuizStyles.shadowBox}>
          <TextInput
            style={ShortAnswerQuizStyles.textInput}
            placeholder="정답을 입력하세요"
            value={answer}
            onChangeText={setAnswer}
            multiline // 여러 줄 입력 가능
          />
        </View>
      </ScrollView>

      <View style={ShortAnswerQuizStyles.footer}>
        <Text style={ShortAnswerQuizStyles.pageText}>{`${currentPage}/${totalPages}`}</Text>
        <TouchableOpacity style={ShortAnswerQuizStyles.nextButton} onPress={() => navigation.goBack()}>
          <Text style={ShortAnswerQuizStyles.nextText}>➔</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ShortAnswerQuiz;