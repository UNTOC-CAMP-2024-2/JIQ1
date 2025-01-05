import { StyleSheet } from 'react-native';

const LogoAnimationstyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row", // 가로 정렬
    justifyContent: "center", // 가로 중심
    alignItems: "center", // 세로 중심
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 150,
    fontWeight: "900",
    color: "#000",
    marginHorizontal: 15, // 글자 간 간격 조정
  },
  qText: {
    color: "#394C8B",
  },
});

export default LogoAnimationstyles