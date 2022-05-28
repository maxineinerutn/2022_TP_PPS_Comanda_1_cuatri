import { createStackNavigator } from '@react-navigation/stack';
import { Screens } from '../Screens';
import React from 'react';
import LoginScreen from '../../components/screens/LoginScreen/LoginScreen.component';

export type LoginStackParamList = {
    [Screens.LOGIN]: undefined | {};
};
const Stack = createStackNavigator<LoginStackParamList>();

const LoginStack = () => {
  return (
    <Stack.Navigator initialRouteName={Screens.LOGIN} screenOptions={{headerShown:false}}>
        <Stack.Screen name={Screens.LOGIN} component={LoginScreen} />
    </Stack.Navigator>
  );
}

export default LoginStack