import { StyleSheet, ActivityIndicator, Text, View } from 'react-native'
import React from 'react'
import styles from './style'
import colors from '../../constants/colors'
const Loading = () => {
    return (
        <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={styles.text} >Loading...</Text>
        </View>
    )
}

export default Loading

