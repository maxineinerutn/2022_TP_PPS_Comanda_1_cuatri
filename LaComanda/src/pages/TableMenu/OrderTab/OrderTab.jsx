/* eslint-disable react/prop-types */
import { View } from 'react-native';
import React, { useContext, useLayoutEffect, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import ProductsList from './ProductsList/ProductsList';
import WaitingConfirmedOrder from './WaitingConfirmedOrder/WaitingConfirmedOrder';
import GlobalContext from '../../../context/GlobalContext';
import { OrderStatus } from '../../../util/Enums';
import WaitingConfirmation from './WaitingConfirmation/WaitingConfirmation';
import ClientChat from './ClientChat/ClientChat';

const Stack = createNativeStackNavigator();

export default function OrderTab({ navigation, route }) {
  const { client } = useContext( GlobalContext );

  useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute( route );
    if ( routeName === 'ClientChat' ) {
      navigation.setOptions({ tabBarStyle: { display: 'none' }});
    }
  }, [navigation, route]);

  useEffect(() => {
    switch ( client.orderState ) {
      case OrderStatus.ScannedAssignedTable:
        navigation.navigate( 'ProductsList' );
        break;
      case OrderStatus.OrderSended:
        navigation.navigate( 'WaitingConfirmation' );
        break;
      case OrderStatus.OrderConfirmed:
        navigation.navigate( 'WaitingConfirmedOrder' );
        break;
      default:
        break;
    }
  }, [client.orderState]);

  return (
    <View style={{ flex: 1 }}>
      <Stack.Navigator
        initialRouteName='ProductsList'
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen
          options={{
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
          name='ProductsList'
          component={ProductsList}
        />
        <Stack.Screen
          options={{
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
          name='WaitingConfirmedOrder'
          component={WaitingConfirmedOrder}
        />
        <Stack.Screen
          options={{
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
          name='WaitingConfirmation'
          component={WaitingConfirmation}
        />
        <Stack.Screen
          options={{
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
          name='ClientChat'
          component={ClientChat}
        />
      </Stack.Navigator>
    </View>
  );
}

