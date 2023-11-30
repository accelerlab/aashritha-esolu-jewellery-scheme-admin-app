import { StyleSheet } from 'react-native'
import colors from '../../constants/colors'
import fontFamily from '../../styles/fontFamily'

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: colors.white
    },
    cameraContainer: {
        flex: 0.4,
        justifyContent: "flex-end"
    },
    loginContainer: {
        flex: 0.6,
    },
    headerContainer: {
        marginLeft: 30,
        marginBottom: 20,

    },
    heading: {
        fontSize: 38,
        fontFamily: fontFamily.bold,
        color: colors.primary,
    },
    inputContainer: {
        marginTop: 20,
        marginBottom: 25
    }


})