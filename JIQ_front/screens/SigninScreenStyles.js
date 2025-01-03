import { StyleSheet } from "react-native";
import { theme } from "../Colors";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        justifyContent: "center",
        alignItems: "center",
    },
    loginSection: {
        height: "80%",
        justifyContent: "center",
    },
    screen: {
        width: "52%",
    },
    keyboardAvoidingView: {
        flex: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputContainer: {
        width: "100%",
        justifyContent: "center",
        alignItems: "flex-end",
    },
    idContainer: {
        width: "100%",
        height: 70,
        marginBottom: 5,
        flexDirection: "row",
    },
    pwContainer: {
        width: "100%",
        height: 70,
        //marginVertical: 5,
    },
    image: {
        width: "100%",
        height: 60,
        justifyContent: "center",
        alignItems: "center",
    },
    input: {
        width: "80%",
        paddingVertical: 5,
        paddingHorizontal: 5,
        marginVertical: 10,
        marginHorizontal: 5,
        fontWeight: '200',
        fontSize: 25,
    },
    signUpPlace: {
        justifyContent: "center",
        alignItems: "center",   
    },
});

export default styles;