import React from 'react'
import {
    Image,
    StyleSheet,
    Dimensions
} from 'react-native';

const ImageCarousel = ({ item, onPress }) => {
    const { height, width } = Dimensions.get('screen')
    return (
        <Image
            style={{ ...styles.imageStyle, width: width }}
            source={{ uri: item.image }}
        />

    )
}

export default ImageCarousel;
const styles = StyleSheet.create({
    imageStyle: {
        height: 300,
        resizeMode: 'contain',
    },

})