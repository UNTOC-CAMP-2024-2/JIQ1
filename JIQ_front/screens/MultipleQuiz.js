import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MultipleQuizStyles from './MultipleQuizStyles';

const MultipleQuiz = ({ route, navigation }) => {
  const { question = "문제 화면", options = ["선지 내용", "선지 내용", "선지 내용", "선지 내용"], currentPage = 1, totalPages = 5 } = route.params || {};

  const [selectedOption, setSelectedOption] = useState(null); //선택된 선지의 인덱스 저장

  const handleOptionPress = (index) => {
    setSelectedOption(index); //선택된 선지 인덱스 업데이트트
  };

  return (
    <View style={MultipleQuizStyles.container}>
      <View style={MultipleQuizStyles.questionContainer}>
        <Text style={MultipleQuizStyles.questionText}>{question}</Text>
      </View>

      <View style={MultipleQuizStyles.shadowBox}>
            {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                MultipleQuizStyles.optionButton,
                selectedOption === index ? MultipleQuizStyles.selectedOptionButton : null,
              ]}
              onPress={() => handleOptionPress(index)}>
                <Text style={MultipleQuizStyles.optionText}>{index + 1}. {option}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={MultipleQuizStyles.footer}>
            <Text style={MultipleQuizStyles.pageText}>{`${currentPage}/${totalPages}`}</Text>
            <TouchableOpacity style={MultipleQuizStyles.nextButton} onPress={() => navigation.goBack()}>
              <Text style={MultipleQuizStyles.nextText}>➔</Text>
            </TouchableOpacity>
          </View>
        </View>
    
  );
};

export default MultipleQuiz;