import { StyleSheet } from 'react-native';
import Svg, { Rect, Defs, LinearGradient, Stop } from 'react-native-svg';
import { theme } from "../Colors";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
    },
    header: {
        flex: 1,
        flexDirection: "row",
        paddingHorizontal: 20,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 10,
        marginTop: -50,
        overflow: 'hidden',
        borderRadius: 12,
        zIndex: 10,
    },
    headerBg: {
        flex: 1,
        height: '100%',
        width: '100%', 
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    label: {
        fonsSize: 24,
        margin: 10,
    },
    slider: {
        width: 200,
        height: 40,
        margin: 5,
    },
    body: {
        height: "85%",
        marginHorizontal: 30,
        marginTop: -10,
        marginBottom: 10,
        borderRadius: 12,
        justifyContent: "flex-start",
        alignItems: "center",
    },
    questionText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
    },
    scrollContainer: {
        padding: 20,
        alignItems: "flex-start",
        paddingVertical: -10,
        paddingHorizontal: 20,
        marginVertical: -10,
    },
    tool: {
        flexDirection: "row",
        marginHorizontal: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    doUndo: {
        flexDirection: "row",
        marginHorizontal: 10,
        justifyContent: "center",
        alignItems:"center",
    },
    probPart: {
        height: "55%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        marginTop: -50,
    },
    probScreen: {
        flex: 1,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        marginVertical: -10,
    },
    writePart: {
        flex: 1,
        width: "100%",
        marginTop: -45,
        marginBottom: 10,
        height: "60%",
    },
    writeScreen: {
        height: "100%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        //marginVertical: -10,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        bottom : 20,
    },
    resultButton: {
        backgroundColor: "#394C8B",
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 10,
        marginHorizontal: 10,
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
});

export default styles;