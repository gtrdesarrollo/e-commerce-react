import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { API_URL } from '../../utils/constants';

export default function CarouselImages(props) {
    const { images } = props;

    console.log(images);

    const renderItem = ({ item }) => {
        console.log(item);
        return (
            <Image style={styles.carrusel} source={{ uri: `${API_URL}${item.url}` }} />
        )
    }

    return (
        <>
            <Carousel
                layout={'default'}
                data={images}
                sliderWidth={300}
                itemWidth={300}
                renderItem={renderItem}
            />
        </>
    )
}

const styles = StyleSheet.create({
    carrusel: {
        width: 300,
        height: 600,
        resizeMode: "contain",
    },
});
