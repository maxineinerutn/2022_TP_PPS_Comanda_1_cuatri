import { createStackNavigator } from '@react-navigation/stack';
import { Screens } from '../Screens';
import React from 'react';
import QRButtonScreen from '../../components/screens/QRButtonScreen/QRButtonScreen.component';
import QRScannerScreen from '../../components/screens/QRScannerScreen/QRScannerScreen.component';
import WaitingClientListScreen from '../../components/screens/WaitingClientListScreen/WaitingClientListScreen.component';
import { TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

export type AddProductStackParamList = {
    [Screens.WAITING_CLIENT_LIST]: undefined | {};
    [Screens.QR_SCANNER]: undefined | {}
};
const Stack = createStackNavigator<AddProductStackParamList>();

const WaitingClientListStack = () => {
  return (
    <Stack.Navigator initialRouteName={Screens.WAITING_CLIENT_LIST}   >
        <Stack.Screen name={Screens.WAITING_CLIENT_LIST} component={WaitingClientListScreen}  options={({navigation}) => ({
        headerLeft:()=><TouchableOpacity style={{marginHorizontal:14}}
          onPress={() => navigation.openDrawer()}>
            <Feather name="menu" size={24} color="black" />
          </TouchableOpacity>
      })}/>
        <Stack.Screen name={Screens.QR_SCANNER} component={QRScannerScreen} options={{headerShown:true, headerTitle:"Escanear QR"}} />
    </Stack.Navigator>
  );
}

export default WaitingClientListStack