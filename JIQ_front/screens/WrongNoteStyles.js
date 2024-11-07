import { StyleSheet } from 'react-native';
import { theme } from "../Colors";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.bg,
    },
    header: {
        flexDirection: "row",
        paddingHorizontal: 20,
        alignItems: "center",
        marginHorizontal: 10,
        marginVertical: 10,
    },
    headerBg: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: theme.screenBg,
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        justifyContent: "center",
        alignItems: "center",
    },
    headerText: {
        fontSize: 25,
        fontWeight: "600",
        textAlign: "center",
        paddingVertical: 15,
        marginHorizontal: 5,
        marginVertical: 5,
        color: theme.textColor,
    },
    bottom: {
        backgroundColor: "white",
        //borderRadius: "30%",
        flexDirection: "row",
        paddingVertical: 5,
        paddingHorizontal: 20,
        //marginBottom: 10,
        //marginHorizontal: 20,
        justifyContent: "space-around",
    },
    separator: {
        height: 3,
        width: "97%",
        backgroundColor: theme.screenBg,
        //marginBottom: 10,
        borderRadius: 15,
        justifyContent: "center",
        alignSelf: "center",
    },
    scrollContainer: {
        padding: 10,
        alignItems: "flex-start",
    },
    row: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "flex-start",
        marginVertical: 5,
    },
    tabButton: {
        paddingVertical:10,
        paddingHorizontal:40,
        marginHorizontal: 10,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
    },
    tabIcon: {
        color: theme.textColor,
        paddingVertical: 5,
        paddingHorizontal: 5,
        marginHorizontal: 5,
        marginVertical: 5,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default styles;