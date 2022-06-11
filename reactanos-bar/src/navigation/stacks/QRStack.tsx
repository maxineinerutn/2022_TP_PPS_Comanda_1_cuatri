import { createStackNavigator } from '@react-navigation/stack';
import { Screens } from '../Screens';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons'; 
import QRButtonScreen from '../../components/screens/QRButtonScreen/QRButtonScreen.component';
import QRScannerScreen from '../../components/screens/QRScannerScreen/QRScannerScreen.component';

export type AddProductStackParamList = {
    [Screens.QR_BUTTON]: undefined | {};
    [Screens.QR_SCANNER]: undefined | {}
};
const Stack = createStackNavigator<AddProductStackParamList>();

const QRStack = () => {
  return (
    <Stack.Navigator initialRouteName={Screens.QR_BUTTON} >
        <Stack.Screen name={Screens.QR_BUTTON} component={QRButtonScreen} options={({navigation}) => ({
        headerLeft:()=><TouchableOpacity style={{marginHorizontal:14}}
          onPress={() => navigation.openDrawer()}>
            <Feather name="menu" size={24} color="black" />
          </TouchableOpacity>
      })} />
        <Stack.Screen name={Screens.QR_SCANNER} component={QRScannerScreen} />
    </Stack.Navigator>
  );
}

export default QRStack