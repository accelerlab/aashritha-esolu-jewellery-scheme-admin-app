import { StyleSheet } from 'react-native'
import colors from '../../constants/colors'
import fontFamily from '../../styles/fontFamily'
export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    statusContainer: {
        backgroundColor: 'grey', // Customize the background color as needed
        padding: 5,
        paddingVertical: 2,
        alignSelf: 'flex-end',
        alignItems: 'center',
        borderRadius:5,
        marginBottom:10
        // Adjust the left position as needed
    },
    statusText: {
        color: 'white', // Customize the text color as needed
        fontFamily: fontFamily.semiBold,
        fontSize: 13,
    },
    profileContainer: {
        padding: 10,
        backgroundColor: colors.pink,
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
        borderRadius: 10
    },
    statusContainer: {
        backgroundColor: 'grey', // Customize the background color as needed
        padding: 5,
        paddingVertical: 2,
        alignSelf: 'flex-end',
        alignItems: 'center',
        borderRadius: 5,
        marginBottom: 2,
      },
    imageStyle: {
        height: 100,
        width: 100,
        borderRadius: 50,
        resizeMode: 'contain'
    },
    infoText: {
        fontSize: 16,
        fontFamily: fontFamily.regular,
        fontWeight: '400',
        color: colors.black,
    },
    heading: {
        fontSize: 16,
        fontFamily: fontFamily.medium,
        fontWeight: '500',
        color: colors.black,

    },
    filterContainer: {
        // marginLeft: 10,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15,
        justifyContent: 'center',
        marginBottom: 10
    },
    btnStyle: {
        height: 30,
        width: 80,
        padding: 0
    },
    itemContainer: {
        //marginTop: 20,
        paddingHorizontal: 30,
        paddingVertical: 10,
        backgroundColor: colors.cream
    },
    customerInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: 5,
        borderBottomColor: colors.primary,
        borderBottomWidth: 1
    },
    detailContainer: {
        paddingVertical: 10,
        borderBottomColor: colors.primary,
        borderBottomWidth: 1,
    },
    detailText: {
        fontSize: 16,
        fontFamily: fontFamily.regular,
        fontWeight: '400',
        color: colors.black,
        marginTop: 10
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10
    },
    filterOptions: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20
    },
    stickyFooter: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 84,
        backgroundColor: colors.primary,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal: 20
        // Add any other styles you need for the sticky footer here
    },
    footerText: {
        fontFamily: fontFamily.semiBold,
        fontSize: 16,
        color: colors.white,
    },
      modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: colors.white,
        padding: 20,
        justifyContent: 'center',
        paddingTop: 10,
        width: '90%',
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    modalHeading: {
        fontFamily: fontFamily.bold,
        color: colors.black,
        fontSize: 20,
        textAlign: 'center'
    },
    submit: {
        marginTop: 10
    }
    
})