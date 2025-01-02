import { StyleSheet } from 'react-native';

const ShortAnswerQuizStyles = StyleSheet.create({
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
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
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
    textInput: {
        flex: 1, // 입력 필드가 박스를 꽉 채우도록
        textAlignVertical: 'top', // 텍스트가 위에서부터 입력되도록
        fontSize: 16,
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
    },
    pageText: {
      fontSize: 30,
      color: '#cac8c8',
      textAlign: 'center',
      flex: 1, //공간차지하게 해서 가운데로 얘만 위치하게 함
      fontWeight: 'bold'
    },
    nextButton: {
      backgroundColor: '#e5f0ff',
      borderRadius: 50,
      padding: 12,
      shadowColor: '#000',
      shadowOffset: {width:1, height:2},
      shadowOpacity: 0.3,
      shadowRadius: 3,
    },
    nextText: {
      fontSize: 18,
      color: '#394c8b',
    },
  });
  
export default ShortAnswerQuizStyles;
