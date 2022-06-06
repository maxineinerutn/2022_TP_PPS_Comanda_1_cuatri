import { View } from 'react-native';
import { React } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Credentials from '../../pages/Credentials/Credentials';

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
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}
