import { StyleSheet } from 'react-native'
import colors from '../../constants/colors'
import fontFamily from '../../styles/fontFamily'
export default StyleSheet.create({
    buttonStyle: {
        height: 44,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.primary,
        padding: 10,
        marginHorizontal: 30
    },
    buttonText: {
        fontSize: 16,
        fontFamily: fontFamily.medium,
        color: colors.white,
        fontWeight: '500',
        textTransform: 'capitalize'

    }
})