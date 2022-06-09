import { View } from 'react-native';
import { React } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Credentials from '../../pages/Credentials/Credentials';
import Home from '../../pages/Home/Home';
import theme from '../../config/theme';

const Stack = createNativeStackNavigator();

export default function Main() {
  // const { isLogged } = useContext(GlobalContext);

  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            options={{
              title: 'Aplicación',
              headerStyle: {
                backgroundColor: 'white'
              },
              headerShown: false,
              headerTintColor: 'black',
              headerTitleStyle: {
                fontWeight: 'bold',
                fontFamily: 'Roboto'
              }
            }}
            name='Credentials'
            component={Credentials}
          />
          <Stack.Screen
            options={{
              headerShown: true,
              headerStyle: {
                backgroundColor: theme.colors.primary,
                borderBottomWidth: 2,
                borderBottomColor: theme.colors.neutral
              },
              headerTitleAlign: 'center',
              headerTitleStyle: {
                color: theme.colors.secondary,
                fontSize: 25,
                fontWeight: '400'
              },
              headerTitle: 'Mi Perfil'
            }}
            name='Home'
            component={Home}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}
