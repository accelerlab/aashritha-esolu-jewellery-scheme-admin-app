import { StyleSheet } from 'react-native'
import colors from '../../constants/colors'
import fontFamily from '../../styles/fontFamily'
export default StyleSheet.create({
    headerContainer: {
        padding:10,
        paddingVertical:12,
        //paddingTop: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.white,
        elevation: 3,
        //height: 55
    },
    title: {
        marginLeft: 15,
        fontSize: 16,
        marginTop: 3,
        fontFamily: fontFamily.semiBold,
        fontWeight: '600',
        color: colors.primary
    },
    rowContainer: {
        flexDirection: 'row', 
        alignItems: 'center'
    }

})