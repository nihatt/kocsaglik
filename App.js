import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import slides from './Data/slider'
import { useState } from 'react';
import { View ,ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppIntroSlider from 'react-native-app-intro-slider';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import renderItem from './Components/IntroCard';
import LoginPage from './Pages/Login';
import DrawerMenu from './Navigators/drawer';
const Stack = createNativeStackNavigator();
function App() {
  const [fontsLoaded] = useFonts({
    'Inter-Bold': require('./assets/fonts/Inter-Bold.ttf'),
    'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
    'Roboto-BoldItalic': require('./assets/fonts/Roboto-BoldItalic.ttf'),
    'Roboto-Italic': require('./assets/fonts/Roboto-Italic.ttf'),
    'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
    'Roboto-MediumItalic': require('./assets/fonts/Roboto-MediumItalic.ttf'),
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
  });
  const [isSeen, setIsSeen] = useState(true)

   const checkIsFirst = async () => {
     try {
       const deger = await AsyncStorage.getItem('isSeen');
       if (deger === null) {
         setIsSeen(true);
         await AsyncStorage.setItem('isSeen', 'true');
       } else {
         setIsSeen(false);
       }
     } catch (error) {
       console.log('Hata:', error);
     }
   };
   useEffect(() => {
    checkIsFirst();
   }, []);

  if (!fontsLoaded) {
    return (
      <View style={{alignItems:'center',justifyContent:'center'}}>
           <ActivityIndicator size="large" color="#00ff00" />
      </View>
    )
  }else{
    if (isSeen) { return (<AppIntroSlider renderItem={renderItem} nextLabel='İleri' doneLabel='Başla' data={slides} onDone={() => setIsSeen(false)} />) }
    else {
      return (
  
        <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" options={{headerShown:false}} component={LoginPage} />
          <Stack.Screen name="Main" options={{headerShown:false}} component={DrawerMenu} />
        </Stack.Navigator>
      </NavigationContainer>
      );
    }
  }


}

export default App;