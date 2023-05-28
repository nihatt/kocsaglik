import React, { useEffect, useRef, useState } from 'react';
import {
    View, Image, StyleSheet, SafeAreaView, ScrollView, Dimensions, Text
} from 'react-native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

const ImageSlider = (props) => {

    const { width } = Dimensions.get('window');


    const [active, setActive] = useState(0);
    const scrollViewRef = useRef(null);

    useEffect(() => {
      const interval = setInterval(() => {
        scrollViewRef.current.scrollTo({ x: responsiveWidth(props.width), animated: true });
      }, 4000);
      return () => clearInterval(interval);
    }, []);



    
    const onScrollChange = ({ nativeEvent }) => {
        const slide = Math.ceil(
            nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width,
        );
        if (slide !== active) {
            setActive(slide);
        }
    };

    return (
        <View>
            <ScrollView
                pagingEnabled
                horizontal
                ref={scrollViewRef}
                onScroll={onScrollChange}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{borderRadius:30}}
                style={{ width:responsiveWidth(props.width), height:responsiveHeight(props.height),borderRadius:30 }}>
                {props.images.map((image, index) => (
                    <Image
                        key={index}
                        source={{ uri: image }}
                        resizeMode='cover'
                        style={{ width:responsiveWidth(props.width), height:responsiveHeight(props.height),borderRadius:30 }}
                    />
                ))}
            </ScrollView>
            <View style={styles.pagination}>
                {props.images.map((i, k) => (
                    <Text key={k} style={k == active ? styles.activeDot : styles.dot}>
                        •
                    </Text>
                ))}
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    pagination: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: -15,
        alignSelf: 'center',
    },
    dot: {
        color: '#888',
        fontSize: 50,
    },
    activeDot: {
        color: '#FFF',
        fontSize: 50,
    },
});

export default ImageSlider;