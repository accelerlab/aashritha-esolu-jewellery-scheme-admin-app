import { StyleSheet } from "react-native";
import fontFamily from "../../styles/fontFamily";
import colors from "../../constants/colors";
export default StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 16,
        paddingTop: 8,

    },
    optionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#EFEFEF',
    },
    icon: {
        marginRight: 12,
    },
    optionText: {
        fontSize: 14,
        fontFamily: fontFamily.medium,
        color: colors.black,
        marginTop:5
    },
});
