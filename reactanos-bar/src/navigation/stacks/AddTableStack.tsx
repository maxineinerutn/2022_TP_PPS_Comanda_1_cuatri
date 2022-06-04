import { createStackNavigator } from '@react-navigation/stack';
import { Screens } from '../Screens';
import React from 'react';
import QRCodeScreen from '../../components/screens/QRCodeScreen/QRCodeScreen.component';
import AddTableScreen from '../../components/screens/AddTableScreen/AddTableScreen.component';
import { TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons'; 

export type AddProductStackParamList = {
    [Screens.ADD_TABLE]: undefined | {};
    [Screens.QRCode]: undefined | {title:string, subtitle:string, code:string};
};
const Stack = createStackNavigator<AddProductStackParamList>();

const AddTableStack = () => {
  return (
    <Stack.Navigator initialRouteName={Screens.ADD_TABLE} >
        <Stack.Screen name={Screens.ADD_TABLE} component={AddTableScreen} options={({navigation}) => ({
        headerLeft:()=><TouchableOpacity style={{marginHorizontal:14}}
          onPress={() => navigation.openDrawer()}>
            <Feather name="menu" size={24} color="black" />
          </TouchableOpacity>
      })} />
        <Stack.Screen name={Screens.QRCode} component={QRCodeScreen} />
    </Stack.Navigator>
  );
}

export default AddTableStack