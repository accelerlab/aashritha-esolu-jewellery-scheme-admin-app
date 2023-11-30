import { StyleSheet } from 'react-native'
import colors from '../../constants/colors'
import fontFamily from '../../styles/fontFamily'
import { Colors } from 'react-native/Libraries/NewAppScreen'

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    logoImgStyle: {
        height: 130,
        width: '100%',
        backgroundColor: colors.white,
        elevation: 5,
    },
    itemContainer: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(215, 189, 226, 0.3)',
        marginVertical: 8,
        marginHorizontal: 10,
        borderRadius: 10
        //borderBottomColor: colors.black,
        //borderBottomWidth: 0.5
    },
    profile: {
        height: 50,
        width: 50,
        borderRadius: 25,
        borderColor: colors.grey,
        borderWidth: 0.1

    },
    infoContainer: {
        marginLeft: 10
    },
    name: {
        fontSize: 16,
        fontFamily: fontFamily.medium,
        fontWeight: '500',
        color: colors.black,
        textTransform: 'capitalize'

    },
    phone: {
        fontSize: 16,
        fontFamily: fontFamily.regular,
        fontWeight: '400',
        color: colors.black

    },
    logoutContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 15,
        marginVertical:10
    },
    searchContainer: {
        backgroundColor: colors.pink,
        paddingVertical: 15,
        paddingHorizontal: 19,
        borderRadius: 5,
        flex: 1,
        marginRight:12,
    },
    searchText: {
        fontSize: 16,
        fontFamily: fontFamily.regular,
        fontWeight: '400',
        colors: colors.grey

    },
    detailContainer: {
        flexDirection: 'row'
    }
})