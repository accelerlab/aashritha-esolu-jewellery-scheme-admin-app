import { StyleSheet, ActivityIndicator, Text, View } from 'react-native'
import React from 'react'
import styles from './style'
import colors from '../../constants/colors'
const NoDataFound = () => {
    return (
        <View style={styles.loaderContainer}>
            <Text style={styles.text} >No Data Found</Text>
        </View>
    )
}

export default NoDataFound

