import { StyleSheet } from 'react-native'
import colors from '../../constants/colors'
import fontFamily from '../../styles/fontFamily'
export default StyleSheet.create({
    container: {
        flex: 1,
        //backgroundColor: colors.white
    },
    inputContainer: {
        marginVertical: 2,
        backgroundColor: colors.white,
        paddingVertical: 10,
        height: '100%'

    },
    heading: {
        fontSize: 16,
        fontFamily: fontFamily.medium,
        fontWeight: '500',
        color: colors.black,
        marginLeft: 30
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 30
    },
    btnStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        padding: 5,
        backgroundColor: colors.primary,


    },
    btnText: {
        fontSize: 16,
        fontFamily: fontFamily.medium,
        fontWeight: '500',
        color: colors.white,
    },
    inputRowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        marginHorizontal: 30,
        marginRight:16,
    },
    imgStyle: {
        height: 80,
        width: 80,
        borderRadius: 10,
        marginRight: 8,
        marginTop: 10,

    },
    deleteIcon:{
        flex:0.1,
        marginTop:16,
        marginLeft:10,
    },
    infoText: {
        fontSize: 15,
        color: colors.dark,
        fontFamily: fontFamily.medium,
        fontWeight: '500',
        marginTop: 3,
        marginLeft: 10
    },

})