import { TextInput, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './style'
import { } from 'react-native-gesture-handler'
import colors from '../../constants/colors'
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { FloatingLabelInput } from 'react-native-floating-label-input';
const Input = function ({
    inputStyle,
    placeHolder,
    value,
    onChangeText,
    rightIcon,
    onPressRight,
    placeHolderColor,
    hideInput,
    onPressLeft,
    ...props }) {
    return (
        <View style={{ ...styles.inputContainer, ...inputStyle }}>
            {value && !hideInput && <Text style={styles.floatingText}>{placeHolder}</Text>}
            {!hideInput && < TextInput
                style={{ ...styles.input, marginTop: value ? 10 : 0 }}
                placeholder={placeHolder}
                placeholderTextColor={colors.grey}
                onChangeText={onChangeText}
                value={value}
                autoCapitalize='none'

                {...props}
            />}
            { /*  add profile & add plans container */}
            {hideInput &&
                <TouchableOpacity
                    style={styles.addContainer}
                    onPress={onPressLeft}
                    activeOpacity={0.5}
                >

                    <MaterialIcons
                        name="add-photo-alternate"
                        color={colors.white}
                        size={20}
                    />
                    <Text style={styles.addText}>{placeHolder}</Text>
                </TouchableOpacity>

            }
            { /* password show/hide eye icon */}

            {rightIcon && <TouchableOpacity
                activeOpacity={0.8}
                onPress={onPressRight}
            >
                <Entypo
                    style={{ marginRight: 10 }}
                    size={22}
                    name={rightIcon}
                    color={colors.black}
                />
            </TouchableOpacity>}
        </View>
    )
}

export default Input
