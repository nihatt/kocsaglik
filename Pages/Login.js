import React, { useState } from 'react';
import { View, Text, Alert, StatusBar } from 'react-native';
import { Button } from '@rneui/themed';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { Input } from '@rneui/themed';
import Lottie from 'lottie-react-native';
import users from '../Data/users';
const LoginPage = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [coloru, setColorU] = useState('gray')
    const [colorp, setColorP] = useState('gray')
    const [colorv, setColorV] = useState('gray')
    const [verificationCode, setVerificationCode] = useState('');
    const [attemptCount, setAttemptCount] = useState(0);
    const [verificationCodeG, setVerificationCodeG] = useState('');
    const handleLogin = () => {
        if (verificationCode == "") {
            const user = users.find((user) => user.username === username && user.password === password);
            if (user) {
                setUsername(""), setPassword(""), setAttemptCount(0)
                Alert.alert('Giriş Başarılı', "Yönlendiriliyorsunuz");
                navigation.navigate('Main', {
                    screen: 'FirstDrawerPage',
                    params: {
                      user: user,
                    },
                  });
            } else {
                setAttemptCount(attemptCount + 1);
                if (attemptCount === 2) {
                    Alert.alert('Doğrulama Kodu Gerekli');
                    generateRandomCode()
                } else {
                    Alert.alert('Hatalı Girdi', "Lütfen Alanları Tekrar Kontrol Ediniz");
                }
            }
        }
        else {
            const user = users.find((user) => user.username === username && user.password === password);
            if (user && verificationCode == verificationCodeG) {
                setUsername(""), setPassword(""), setAttemptCount(0)
                Alert.alert('Giriş Başarılı', "Yönlendiriliyorsunuz");
                navigation.navigate('Main', {
                    screen: 'FirstDrawerPage',
                    params: {
                      user: user,
                    },
                  });
            } else {
                Alert.alert('Hatalı Girdi', "Lütfen Alanları Tekrar Kontrol Ediniz");
            }
        }

    };
    const generateRandomCode = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let code = '';
        for (let i = 0; i < 4; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            code += characters.charAt(randomIndex);
        }
        setVerificationCode(code)
        return code;
    };

    return (
        <View style={{ height: responsiveHeight(100) - StatusBar.currentHeight, alignItems: 'center', paddingTop: StatusBar.currentHeight }}>
            <Lottie source={require('../assets/images/login2.json')} style={{ height: 200, overflow: 'hidden' }} autoPlay loop />
            <Input
                placeholder='Kullanıcı Adı'
                containerStyle={{ width: responsiveWidth(70) }}
                onFocus={() => setColorU("green")}
                onBlur={() => setColorU("gray")}
                leftIcon={{ type: 'font-awesome', name: 'user', color: coloru }}
                onChangeText={(text) => setUsername(text)}
                value={username}
            />

            <Input
                placeholder='Şifre'
                containerStyle={{ width: responsiveWidth(70) }}
                onFocus={() => setColorP("green")}
                onBlur={() => setColorP("gray")}
                leftIcon={{ type: 'font-awesome', name: 'lock', color: colorp }}
                onChangeText={(text) => setPassword(text)}
                value={password}
                secureTextEntry
            />

            {attemptCount === 3 ? (
                <>

                    <View style={{ flexDirection: 'row', width: responsiveWidth(70), alignSelf: 'center', justifyContent: 'space-between' }}>

                        <Text style={{ fontSize: 20, alignSelf: 'baseline', textAlign: 'center', textAlignVertical: 'center', flex: 1, height: responsiveHeight(8) }}>{verificationCode}</Text>
                        <Input
                            placeholder='Güvenlik Kodu'
                            containerStyle={{ width: responsiveWidth(50), alignSelf: 'center', justifyContent: 'center', height: responsiveHeight(10) }}

                            onFocus={() => setColorV("green")}
                            onBlur={() => setColorV("gray")}
                            leftIcon={{ type: 'font-awesome', name: 'star', color: colorv }}
                            onChangeText={(text) => setVerificationCodeG(text)}
                            value={verificationCodeG}
                        />
                    </View>

                </>
            ) : (
                null
            )}
            <Button
                onPress={handleLogin}
                title="Giriş Yap"
                buttonStyle={{ backgroundColor: 'rgba(127, 220, 103, 1)' }}
                containerStyle={{
                    width: responsiveWidth(70),
                }}
                titleStyle={{
                    color: 'white',
                    marginHorizontal: 20,
                }}
            />
        </View>
    );
};

export default LoginPage;
