import { Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import styles from './style'
const Button = ({
    title,
    btnStyle,
    onPress,
    btnTextStyle,
    ...props

}) => {
    return (
        <TouchableOpacity
            style={{ ...styles.buttonStyle, ...btnStyle }}
            onPress={onPress}
            {...props}
            >
            <Text style={{ ...styles.buttonText, ...btnTextStyle }}>{title}</Text>
        </TouchableOpacity>
    )
}

export default Button

