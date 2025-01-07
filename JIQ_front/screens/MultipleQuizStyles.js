import { StyleSheet } from 'react-native';

const MultipleQuizStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 16,
      justifyContent: 'space-between',
    },
    questionContainer: {
      flex: 5,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
      borderRadius: 10,
      marginBottom: 20,
      //그림자
      shadowColor: '#000',
      shadowOffset: {width:3, height:4},
      shadowOpacity: 0.2,
      shadowRadius: 3,
    },
    shadowBox: {
        backgroundColor: '#fff', // 흰색 배경
        flex : 4,
        borderRadius: 10,
        padding: 10,
        paddingTop: 20,
        paddingBottom: 0,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 }, // 그림자 위치
        shadowOpacity: 0.2, // 그림자 투명도
        shadowRadius: 4, // 그림자 퍼짐 정도
      },
    questionText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#000',
    },
    optionsContainer: {
      flex: 4,
      justifyContent: 'center',
    },
    optionButton: {
      backgroundColor: '#e5f0ff',
      paddingVertical: 19,
      paddingHorizontal: 10,
      borderRadius: 8,
      marginBottom: 8,
      shadowColor: '#000',
      shadowOffset: {width:2, height:2},
      shadowOpacity: 0.2,
      shadowRadius: 4,
    },
    selectedOptionButton: {
        backgroundColor: '#ffedc9', //선택한 선지 색상
    },
    optionText: {
      fontSize: 18,
      color: '#000',
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    navigationButtons: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",     
  },
    navButton: {
        justifyContent: "center",
        alignItems: "center",
    },
    disabledButton: {
        backgroundColor: "#d3d3d3",
    },
      resultButton: {
        backgroundColor: "#394C8B",
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 10,
    },
      resultButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    pageIndicatorText: {
      fontSize: 28, 
      color: "#394C8B", 
      textAlign: "center",
      opacity: 0.8,
  },
  backButton: {
    top: -5,
    opacity: 0.8,
  }
  
  });
  
export default MultipleQuizStyles;
