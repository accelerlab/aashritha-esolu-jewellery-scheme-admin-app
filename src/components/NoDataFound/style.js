import { StyleSheet } from 'react-native'
import fontFamily from '../../styles/fontFamily'
import colors from '../../constants/colors'
export default StyleSheet.create({
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
       
    },
    text: {
        fontFamily: fontFamily.semiBold,
        fontSize: 16,
        fontWeight: '500',
        color: colors.black
    }
})