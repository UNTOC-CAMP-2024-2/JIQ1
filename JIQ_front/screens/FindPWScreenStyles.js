import { StyleSheet } from "react-native";
import { theme } from "../Colors";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
    },
    header: {
        flexDirection: "row",
        paddingHorizontal: 20,
        alignItems: "center",
        marginHorizontal: 10,
        marginVertical: 10,
    },
    headerText: {
        width: "95%",
        fontSize: 25,
        fontWeight: "300",
        textAlign: "center",
        marginHorizontal: 5,
        marginVertical: 5,
        color: "#49454F",
    },
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    keyboardAvoidingView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    signupSection: {
        flex: 1,
        width: "70%",
        justifyContent: "center",
    },
    idContainer: {
        flexDirection: "row",
        width: "100%",
        //flex: 1,
        height: 70,
        marginBottom: 5,
        alignItems: "center",
        justifyContent: "space-between",
    },
    pwContainer: {
        flexDirection: "row",
        //flex: 0.5,
        //width: "100%",
        height: 70,
        marginBottom: 5,
        alignItems: "flex-start",
        //justifyContent: "space-between",
    },
    pwcheckContainer: {
        flexDirection: "row",
        //flex: 1,
        //width: "100%",
        height: 70,
        marginBottom: 5,
        //alignItems: "flex-start",
        justifyContent: "space-between",
    },
    checkIcon: {
        marginVertical: 10,
        marginHorizontal: 20,
        justifyContent: "center",
    },
    idImage: {
        flexDirection: "row",
        //width: "100%",
        height: 64,
        marginRight: 4,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    idButton: {
        flexDirection: "row",
        //width: "100%",
        height: 64,
        //marginHorizontal: 4,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    pwImage: {
        flexDirection: "row",
        flex: 1,
        width: "100%",
        height: 64,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    pwCheckImage: {
        flexDirection: "row",
        flex:1,
        width: "100%",
        height: 64,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    inputID: {
        width: "90%",
        paddingVertical: 5,
        paddingHorizontal: 5,
        marginVertical: 10,
        marginHorizontal: 5,
        fontWeight: '300',
        fontSize: 20,
    },
    inputPW: {
        width: "85%",
        paddingVertical: 5,
        paddingHorizontal: 5,
        marginVertical: 10,
        marginHorizontal: 5,
        fontWeight: '300',
        fontSize: 18,
        textAlign: "center",
    },
    inputPWcheck: {
        width: "91%",
        paddingVertical: 5,
        paddingHorizontal: 5,
        marginVertical: 10,
        marginHorizontal: 5,
        fontWeight: '300',
        fontSize: 20,
    },
    signUpPlace: {
        justifyContent: "center",
        alignItems: "center",   
    },
    Button: {
        marginVertical: 20,
        marginHorizontal: 5,
    },
});

export default styles;