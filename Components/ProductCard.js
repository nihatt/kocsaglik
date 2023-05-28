import 'react-native-gesture-handler';
import * as React from 'react';
import {  View, Text } from 'react-native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { Overlay } from '@rneui/themed';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import ImageSlider from './ImageSlider';
import { ImageBackground } from 'react-native';
import { TouchableOpacity } from 'react-native';
import Star from 'react-native-star-view';
function ProductCard(props) {
    let images = props.images
    const [visible, setVisible] = useState(false);
    const toggleOverlay = () => {
        setVisible(!visible);
    };
    return (
        <View>
            <Overlay isVisible={visible} style={{ height: responsiveHeight(50) }} overlayStyle={styles.overlay} onBackdropPress={toggleOverlay}>
                <View style={styles.mainView}>
                    <ImageSlider width={60} height={40} images={images}></ImageSlider>
                </View>
                <View style={styles.textView}>
                    <View>
                        <Text style={{ fontSize: 24, fontFamily: 'Inter-Bold' }}>{props.title}</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Star score={parseFloat(props.rating)} style={styles.star} />
                            <Text>{props.rating}</Text>
                        </View>
                    </View>
                    <Text style={{ textAlign: 'center' }} numberOfLines={5}>{props.description}</Text>
                    <View>
                        <Text>{props.brand} - {props.category}</Text>
                        <Text style={{ fontSize: 24, fontFamily: 'Inter-Bold', textAlign: 'center' }}>{props.price} $</Text>
                    </View>
                </View>
            </Overlay>
            <View style={styles.overFlow}>

                <ImageBackground source={require('../assets/images/bg.jpg')} resizeMode='cover'>

                    <View style={{ width: responsiveWidth(50), height: responsiveHeight(20), alignItems: 'center' }}>
                        <ImageSlider width={35} height={20} images={images}></ImageSlider>
                    </View>
                    <TouchableOpacity onPress={() => toggleOverlay()}>
                        <View style={styles.textFor}>
                            <Text numberOfLines={1} style={{ fontSize: 18, fontFamily: 'Inter-Bold', marginHorizontal: 8 }}>{props.title}</Text>
                            <Text style={{ fontSize: 18, fontFamily: 'Roboto-Bold' }}>{props.price} $</Text>
                            <Text numberOfLines={1} style={{ fontSize: 16, overflow: 'hidden', marginHorizontal: 10 }}>{props.brand}</Text>

                        </View>
                    </TouchableOpacity>
                </ImageBackground>
            </View>
        </View>

    );
}

const styles = StyleSheet.create({
    star:{
        width: 100,
        height: 20,
        marginBottom: 20,
    },
    textFor: {
        overflow: 'hidden',
        height: responsiveHeight(15),
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    overFlow: {
        overflow: 'hidden',
        height: responsiveHeight(35),
        width: responsiveWidth(45),
        alignItems: 'center',
        flexDirection: 'column',
        borderRadius: 30,
        margin: 10
    },
    textView: {
        height: responsiveHeight(40),
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    mainView: {
        height: responsiveHeight(40),
        alignItems: 'center'
    },
    button: {
        margin: 10,
    },
    textPrimary: {
        marginVertical: 20,
        textAlign: 'center',
        fontSize: 20,
    },
    textSecondary: {
        marginBottom: 10,
        textAlign: 'center',
        fontSize: 17,
    },
    overlay: { height: responsiveHeight(80), width: responsiveWidth(80) }
});

export default ProductCard;