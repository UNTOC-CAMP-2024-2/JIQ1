import { StyleSheet } from "react-native";
import { theme } from "../Colors";

const QuizListstyles = StyleSheet.create({
    screen: {
        felx: 1,
        paddingHorizontal: 20,
        paddingTop: 10,
        marginTop: 0,
    },
    quizItemContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#F7FAFC",
        borderRadius: 10,
        padding: 15,
        marginVertical: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        marginHorizontal: 10,
        marginTop: 20
    },
    quizItemContent: {
        flexDirection: "row",
        alignItems: "center",
    },
    quizItemText: {
        marginLeft: 10,
        fontSize: 16,
        color: "#394C8B",
    },
    quizItemButtons: {
        flexDirection: "row",
        alignItems: "center",
    },
    viewButton: {
        backgroundColor: "#394C8B",
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 8,
        marginHorizontal: 5,
    },
    answerButton: {
        backgroundColor: "#E53E3E",
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 8,
        marginHorizontal: 5,
    },
    buttonText: {
        color: "#FFF",
        fontSize: 14,
    },
    itemScore: {
        fontSize: 14,
        color: "#394C8B",
        marginHorizontal: 10,
    },
});

export default QuizListstyles;