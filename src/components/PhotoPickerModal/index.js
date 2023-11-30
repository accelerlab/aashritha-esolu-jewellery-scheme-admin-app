import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './style';
import colors from '../../constants/colors';
const PhotoPickerModal = ({ isVisible, onClose, onGalleryPress, onCameraPress }) => {
    return (
        <Modal
            isVisible={isVisible}
            style={{
                justifyContent: 'flex-end',
                margin: 0,
            }}
            onBackdropPress={onClose}
        >
            <View style={styles.container}>

                <TouchableOpacity style={styles.optionContainer} onPress={onCameraPress}>
                    <Icon name="camera-outline" size={24} color={colors.black} style={styles.icon} />
                    <Text style={styles.optionText}>Camera</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionContainer} onPress={onGalleryPress}>
                    <Icon name="image-outline" size={24} color={colors.black} style={styles.icon} />
                    <Text style={styles.optionText}>Gallery</Text>
                </TouchableOpacity>

            </View>
        </Modal>
    );
};

export default PhotoPickerModal