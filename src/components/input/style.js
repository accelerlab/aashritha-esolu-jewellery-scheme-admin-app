import { StyleSheet } from 'react-native'
import colors from '../../constants/colors'
import fontFamily from '../../styles/fontFamily'
export default StyleSheet.create({
    inputContainer: {
        marginHorizontal: 30,
        paddingHorizontal: 10,
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: colors.black,
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 55
    },
    input: {
        fontSize: 16,
        color: colors.grey,
        fontFamily: fontFamily.regular,
        fontWeight: '400',
        flex: 1,
       

    },
    addContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.darkGrey,
        borderRadius: 5,
        margin: 8,
        paddingHorizontal: 10,
        paddingVertical: 5


    },
    addText: {
        fontSize: 16,
        fontFamily: fontFamily.medium,
        fontWeight: '500',
        color: colors.white,
        marginLeft: 5,
        marginTop: 3,
    },
    floatingText: {
        position: 'absolute',
        left: Platform.OS === 'android' ? 15 : 10,
        top: 5,
        fontSize: 9,
        fontFamily: fontFamily.medium,
        fontWeight: '500',
        color: colors.black,
    }

})