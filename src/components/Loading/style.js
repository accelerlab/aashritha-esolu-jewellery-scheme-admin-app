import { StyleSheet,Dimensions } from 'react-native'
import fontFamily from '../../styles/fontFamily'

export default StyleSheet.create({
    loaderContainer: {
        flex:1,
        justifyContent:'center',
        alignItems:'center' ,
       
    },
    text: {
        fontFamily: fontFamily.regular,
        fontSize: 12,
        color: '#000'
    }
})