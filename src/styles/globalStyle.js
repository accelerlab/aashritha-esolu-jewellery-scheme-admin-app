import { StyleSheet } from 'react-native'
import colors from '../constants/colors'
import fontFamily from './fontFamily'
export default StyleSheet.create({
    mainContainer: {
        flex: 1,
       // backgroundColor: colors.white
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    loadingTitle: {
        fontSize: 18,
        fontFamily: fontFamily.semiBold,
        color: colors.dark,
    },
    ladingText: {
        fontSize: 16,
        fontFamily: fontFamily.medium,
        color: colors.dark
    },
})