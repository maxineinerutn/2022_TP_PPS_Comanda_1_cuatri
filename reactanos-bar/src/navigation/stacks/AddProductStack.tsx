import { createStackNavigator } from '@react-navigation/stack';
import { Screens } from '../Screens';
import React from 'react';
import QRCodeScreen from '../../components/screens/QRCodeScreen/QRCodeScreen.component';
import { TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons'; 
import AddProductsScreen from '../../components/screens/AddProductsScreen/AddProductsScreen.component';

export type AddProductStackParamList = {
    [Screens.ADD_PRODUCTS]: undefined | {};
    [Screens.QRCode]: undefined | {title:string, subtitle:string, code:string};
};
const Stack = createStackNavigator<AddProductStackParamList>();

const AddProductStack = () => {
  return (
    <Stack.Navigator initialRouteName={Screens.ADD_PRODUCTS} >
        <Stack.Screen name={Screens.ADD_PRODUCTS} component={AddProductsScreen} options={({navigation}) => ({
        headerLeft:()=><TouchableOpacity style={{marginHorizontal:14}}
          onPress={() => navigation.openDrawer()}>
            <Feather name="menu" size={24} color="black" />
          </TouchableOpacity>
      })} />
        <Stack.Screen name={Screens.QRCode} component={QRCodeScreen} />
    </Stack.Navigator>
  );
}

export default AddProductStack