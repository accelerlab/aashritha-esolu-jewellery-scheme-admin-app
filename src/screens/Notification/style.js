import { StyleSheet} from 'react-native'
import colors from '../../constants/colors'
import fontFamily from '../../styles/fontFamily'
export default StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.white
    },
    itemContainer:{
        margin:10,
        marginVertical:5,
        paddingHorizontal:10,
        paddingVertical:12,
        backgroundColor:colors.primary,
        borderRadius:5,
    },
    rowContainer:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    title:{
        fontSize:15,
        color:colors.dark,
        fontFamily:fontFamily.medium,
        fontWeight:'500'
    },
    time:{
        fontSize:12,
        color:colors.dark,
        fontFamily:fontFamily.medium,
        fontWeight:'500'
       
        
    },
    body:{
        fontSize:14,
        color:colors.dark,
        fontFamily:fontFamily.regular,
        marginTop:4,
        fontWeight:'400'
    },
   

})