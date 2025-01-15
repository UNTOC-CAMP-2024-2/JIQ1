import { StyleSheet } from 'react-native';
import Svg, { Rect, Defs, LinearGradient, Stop } from 'react-native-svg';
import { theme } from "../Colors";
import PieChart from 'react-native-pie-chart';

const FolerScreenstyle = StyleSheet.create({
    headerText: {
        fontSize: 28,
        fontWeight: "600",
        fontWeight: 200,
        textAlign: "center",
        marginHorizontal: 15,
        marginVertical: 5,
        color: theme.textColor,
    },
});

export default FolerScreenstyle;
