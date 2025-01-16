import { StyleSheet } from 'react-native';

const ShortAnswerQuizStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f0f8ff',
      padding: 16,
      justifyContent: 'space-between',
      paddingBottom: 70,
    },
    questionContainer: {
      height: 300,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
      borderRadius: 10,
      marginHorizontal: 5,
      marginTop: 15,
      borderWidth: 5,
      borderColor: '#131e3a'
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
    },      
    shadowBox: {
        backgroundColor: '#fff', // 흰색 배경
        height: 250,
        borderRadius: 10,
        padding: 10,
        paddingTop: 10,
        marginBottom: 80,
        marginHorizontal: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 }, // 그림자 위치
        shadowOpacity: 0.2, // 그림자 투명도
        shadowRadius: 4, // 그림자 퍼짐 정도
    },
    textInput: {
        flex: 1, // 입력 필드가 박스를 꽉 채우도록
        textAlignVertical: 'top', // 텍스트가 위에서부터 입력되도록
        fontSize: 20,
        color: '#394c8b',
        padding: 10,
        borderRadius: 8,
        backgroundColor: '#fff', // 입력 필드 배경색
      },      
    questionText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#000',
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      bottom : 30,
      position: "absolute",
      width: "100%",
      right: 16,
    },
    pageIndicatorText: {
      fontSize: 38, 
      color: "#394C8B", 
      textAlign: "center",
      opacity: 0.8,
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
    backButton: {
      top: -5,
      opacity: 0.8,
    }
  });
  
export default ShortAnswerQuizStyles;
