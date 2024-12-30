import { StyleSheet } from "react-native";
import { theme } from "../Colors";

const AddQuizStyles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // 배경 반투명
  },
  modal: {
    width: "65%", // 창 너비 조절
    backgroundColor: "#F7FAFC", // 흰색 배경
    borderRadius: 15,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    position: "relative",
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    position: "relative",
    justifyContent: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2D3748", // 짙은 네이비
  },
  closeButton: {
    position: "absolute",
    right:0,
    top:0,
  },
  closeIcon: {
    fontSize: 24,
    color: "#2D3748", // 짙은 네이비
  },
  input: {
    borderWidth: 5,
    borderColor: "#2D3748", // 연한 회색
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
    color: "#2D3748", // 짙은 네이비
    backgroundColor: "#EDF2F7", // 연한 배경색
  },
  radioGroup: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#CBD5E0", // 버튼 배경색
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  
  selectedRadioButton: {
    backgroundColor: "#2D3748", // 선택된 버튼 색상
  },
  radioText: {
    fontSize: 14,
    color: "#FFFFFF", // 선택된 버튼 텍스트 색상
    marginLeft: 5,
  },
  unselectedRadioText: {
    color: "#2D3748", // 미선택 버튼 텍스트 색상
  },
  createButton: {
    backgroundColor: "#2D3748", // 생성 버튼 색상
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  createButtonText: {
    color: "#FFFFFF", // 버튼 텍스트 색상
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AddQuizStyles;
