import { Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import styles from './style'
import colors from '../../constants/colors'
import { useNavigation } from '@react-navigation/native'
const Header = ({ title, additionalButtons,showBackButton,leftIcon, onPress }) => {
    const navigation = useNavigation();
    return (
        <View style={styles.headerContainer}>
            <View style={styles.rowContainer}>
                {showBackButton && (
                    <TouchableOpacity
                    onPress={() => onPress ? onPress() : navigation.goBack()}>
                    <AntDesign size={25} color={colors.black} name="arrowleft" />
                </TouchableOpacity>
                )}
                {leftIcon && (
                    <TouchableOpacity
                    onPress={() => onPress ? onPress() : navigation.goBack()}>
                    <FontAwesome5 size={25} color={colors.black} name="users" />
                </TouchableOpacity>
                )}
                <Text style={styles.title}>{title}</Text>
            </View>
            <View style={styles.rowContainer}>
                {additionalButtons && additionalButtons.map((button, index) => (

                    <TouchableOpacity key={index} onPress={button.onPress} style={{ marginLeft: 20 }}>
                        <AntDesign
                            size={25}
                            color={button.color || colors.black}
                            name={button.icon} />
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    )
}
export default Header

