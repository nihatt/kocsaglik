

import 'react-native-gesture-handler';
import {createDrawerNavigator} from '@react-navigation/drawer';
import * as React from 'react';
import {Button, View, SafeAreaView} from 'react-native';
import { Text } from '@rneui/themed';

function MainPage({route}) {
  const { user } = route.params;
  return (
    <View style={{alignItems:'center'}}>
    <Text h1>Merhaba {user.name}</Text>
    <Text h2 style={{textAlign:'center'}}>Alışverişe Hemen Başla </Text>
 

    </View>

  );
}

export default MainPage;