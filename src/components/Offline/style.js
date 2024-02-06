import { StyleSheet } from "react-native";
import colors from "../../constants/colors";
export default StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,


  },
  modalContainer: {
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 16,
    flexDirection: 'row'



  },
  modalTitleText: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    color: colors.black,

  },
  modalText: {
    fontSize: 15,
    fontFamily: 'Poppins-SemiBold',
    color: colors.black,
    marginTop: -5

  },
  errorIconContainer: {
    flex: 0.5,



  },
  textContainer: {
    flex: 3,


  }
});