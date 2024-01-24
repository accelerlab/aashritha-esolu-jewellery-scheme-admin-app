import {StyleSheet} from 'react-native';
import colors from '../../constants/colors';
import fontFamily from '../../styles/fontFamily';
export default StyleSheet.create({
  headerContainer: {
    padding: 10,
    paddingVertical: 12,
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
    color: colors.primary,
    textTransform:'uppercase'
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationBadge: {
    position: 'absolute',
    bottom: 14,
    left: 12,
    backgroundColor: '#E74C3C',
    height: 18,
    width: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationBadgeText: {
    fontSize: 9,
    fontFamily: fontFamily.regular,
    color: '#fff',
  },
});
