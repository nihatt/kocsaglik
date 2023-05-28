import { Button, View, Text, SafeAreaView ,ActivityIndicator} from 'react-native';
import Lottie from 'lottie-react-native';


renderItem = ({ item }) => {
    return (
      <View style={{ flex: 1, backgroundColor: item.backgroundColor, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ color: 'red',fontSize:20,fontFamily:'Roboto-Bold' }}>{item.title}</Text>
        <Lottie source={item.image} style={{ height: 300, overflow: 'hidden' }} autoPlay loop />
        <Text style={{textAlign:'center',fontSize:16,fontFamily:'Roboto-Medium'}}>{item.text}</Text>
      </View>
    );
  }

  export default renderItem