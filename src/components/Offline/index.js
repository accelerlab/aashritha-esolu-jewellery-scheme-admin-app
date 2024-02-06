import { Text, View } from 'react-native'
import React from 'react'
import Modal from "react-native-modal";
import styles from './style';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import colors from '../../constants/colors';
const NoInternetModal = ({ visible }) => {

    return (
        <Modal isVisible={visible} style={styles.modal} animationInTiming={600}>
            <View style={styles.modalContainer}>
                <View style={styles.errorIconContainer}>
                    <MaterialIcons
                        name="error-outline"
                        color={colors.black}
                        size={45}
                    />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.modalTitleText}>No Internet Connection!</Text>
                    <Text style={styles.modalText}>
                        Please check your internet connection.
                    </Text>
                </View>
            </View>
        </Modal>
    )
}

export default NoInternetModal




