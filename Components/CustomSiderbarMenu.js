import React from 'react';
import {
    SafeAreaView,
    View,
    StyleSheet,
    Image,
    Text,
    Linking,
    StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Lottie from 'lottie-react-native';
import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from '@react-navigation/drawer';
import { Button } from '@rneui/themed';
const CustomSidebarMenu = (props) => {
    const navigation = useNavigation()


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{  marginTop: StatusBar.currentHeight }}>
            <Lottie source={require('../assets/images/start.json')} style={{ height: 200, width:400,overflow: 'hidden',alignSelf:'center' }} autoPlay loop />
            </View>
            <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} />
                <DrawerItem
                    label="Geliştiriciye Ulaş"
                    onPress={() => Linking.openURL('https://wa.link/8249ft')}
                />


            </DrawerContentScrollView>
            <Button
                onPress={()=>navigation.navigate("Login")}
                title="Çıkış Yap"
                buttonStyle={{ backgroundColor: 'rgba(214, 61, 57, 1)', justifyContent: 'center' }}
                containerStyle={{
                    height: 40,
                    marginHorizontal: 50,
                    marginVertical: 10,
                }}
                titleStyle={{ color: 'white', marginHorizontal: 20 }}
            />

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    sideMenuProfileIcon: {
        resizeMode: 'center',
        width: 100,
        height: 200,
        borderRadius: 100 / 2,
        borderWidth: 1,
        alignSelf: 'center',
    },
    iconStyle: {
        width: 15,
        height: 15,
        marginHorizontal: 5,
    },
    customItem: {
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default CustomSidebarMenu;