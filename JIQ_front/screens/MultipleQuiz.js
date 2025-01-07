import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AntDesign from "@expo/vector-icons/AntDesign";
import MultipleQuizStyles from "./MultipleQuizStyles";

const MultipleQuiz = ({ route }) => {
    const navigation = useNavigation();
    const { currentPage, totalPage } = route.params;

    const [pageIndex, setPageIndex] = useState(currentPage - 1);

    //퀴즈 더 추가할려면 여기에 question 더 추가하면 됨
    const [quizData, setQuizData] = useState([
        {
            question: "문제 1: 다음 중 올바른 문법은?",
            options: ["1번", "2번", "3번", "4번"],
            selectedOption: null, // 선택된 옵션 저장
        },
        {
            question: "문제 2: 다음 중 가장 큰 숫자는?",
            options: ["10", "20", "30", "40"],
            selectedOption: null,
        },
        {
            question: "문제 3: 다음 중 색깔이 아닌 것은?",
            options: ["빨강", "파랑", "노랑", "사과"],
            selectedOption: null,
        },
        {
            question: "문제 4: 다음 중 동물은?",
            options: ["고양이", "책상", "자동차", "의자"],
            selectedOption: null,
        },
        {
            question: "문제 5: 다음 중 식물은?",
            options: ["장미", "호랑이", "컴퓨터", "새"],
            selectedOption: null,
        },
    ]);

    const handleNextPage = () => {
        if (pageIndex < quizData.length - 1) {
            setPageIndex(pageIndex + 1);
        } else {
            Alert.alert("퀴즈 완료", "모든 문제를 완료했습니다!");
            navigation.goBack(); // 퀴즈 완료 후 이전 화면으로 돌아가기
        }
    };

    const handlePreviousPage = () => {
        if (pageIndex > 0) {
            setPageIndex(pageIndex - 1);
        }
    };

    const handleOptionSelect = (index) => {
        // 현재 페이지의 선택 상태를 업데이트
        const updatedQuizData = [...quizData];
        updatedQuizData[pageIndex].selectedOption = index;
        setQuizData(updatedQuizData);
    };

    const currentQuiz = quizData[pageIndex];

    return (
        <View style={MultipleQuizStyles.container}>
            <View style={MultipleQuizStyles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style = {MultipleQuizStyles.backButton}>
                    <AntDesign name="arrowleft" size={24} color="black" />
                </TouchableOpacity>
            </View>
            
            <View style={MultipleQuizStyles.questionContainer}>
                <Text style={MultipleQuizStyles.questionText}>{currentQuiz.question}</Text>
            </View>
            <View style={MultipleQuizStyles.optionsContainer}>
                {currentQuiz.options.map((option, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[
                            MultipleQuizStyles.optionButton,
                            currentQuiz.selectedOption === index && MultipleQuizStyles.selectedOptionButton, // 선택된 옵션의 스타일
                        ]}
                        onPress={() => handleOptionSelect(index)}
                    >
                        <Text style={MultipleQuizStyles.optionText}>{option}</Text>
                    </TouchableOpacity>
                ))}
            </View>
<View style={MultipleQuizStyles.navigationButtons}>
    {/* 이전 버튼: 항상 왼쪽 끝에 고정 */}
    <TouchableOpacity
        onPress={handlePreviousPage}
        style={[
            MultipleQuizStyles.navButton,
            pageIndex === 0 && MultipleQuizStyles.hiddenButton, // 첫 페이지에서는 비활성화
        ]}
        disabled={pageIndex === 0}
    >
        <AntDesign name="leftcircleo" size={40} color={pageIndex === 0 ? "#d3d3d3" : "#394C8B"} />
    </TouchableOpacity>

    <Text style={MultipleQuizStyles.pageIndicatorText}>
                    {`${pageIndex + 1} / ${quizData.length}`}
                </Text>

    {/* 다음 버튼 또는 결과 버튼: 항상 오른쪽 끝에 고정 */}
    {pageIndex === quizData.length - 1 ? (
        <TouchableOpacity
            onPress={() => Alert.alert("결과", "채점 화면으로 이동합니다!")}
            style={MultipleQuizStyles.resultButton}
        >
            <Text style={MultipleQuizStyles.resultButtonText}>Result</Text>
        </TouchableOpacity>
    ) : (
        <TouchableOpacity
            onPress={handleNextPage}
            style={MultipleQuizStyles.navButton}
        >
            <AntDesign name="rightcircleo" size={40} color="#394C8B" />
        </TouchableOpacity>
    )}
</View>


 
        </View>
    );
};

export default MultipleQuiz;
