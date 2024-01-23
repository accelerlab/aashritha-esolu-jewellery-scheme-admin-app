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
    },
    notificationBadge: {
        position: 'absolute',
        bottom: 20,
        left: 15,
        backgroundColor: '#E74C3C',
        borderRadius: 10,
        width: 15,
        height: 15,
        justifyContent: 'center',
        alignItems: 'center',
      },
      notificationBadgeText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
      },

})