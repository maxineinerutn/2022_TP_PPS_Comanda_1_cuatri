import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from '../../config/theme';
import { UserTypes } from '../../util/Enums';
import GameTab from './GameTab/GameTab';
import OrderTab from './OrderTab/OrderTab';
import SurveysTab from './SurveysTab/SurveysTab';

const Tab = createBottomTabNavigator();

function renderTabBarIcon( route, size ) {
  let iconName;
  let iconColor;

  switch ( route.name ) {
    case 'Juegos':
      iconColor = theme.colors.icons;
      iconName = 'gamepad';
      break;
    case 'Pedido':
      iconColor = theme.colors.icons;
      iconName = 'concierge-bell';
      break;
    case 'Encuestas':
      iconColor = theme.colors.icons;
      iconName = 'message-star';
      break;
    default:
      break;
  }

  return ( iconName === 'message-star'
    ? <IconMaterial name={iconName} size={size} color={iconColor} />
    : <Icon name={iconName} size={size} color={iconColor} />
  );
}
export default function TableMenu() {
  return (
    <Tab.Navigator
      initialRouteName='Pedido'
      screenOptions={
        ({ route }) => ({
          tabBarIcon: ({ size }) => renderTabBarIcon( route, size ),
          headerStyle: {
            backgroundColor: theme.colors.primary,
            borderBottomWidth: 2
          },
          headerShown: false,
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: theme.colors.neutral
        })
      }
    >
      <Tab.Screen
        name='Juegos'
        component={GameTab}
        options={{
          headerStyle: {
            backgroundColor: theme.colors.primary,
            borderBottomWidth: 2,
            borderBottomColor: theme.colors.neutral
          },
          headerShown: false,
          tabBarActiveTintColor: theme.colors.text,
          tabBarInactiveTintColor: theme.colors.neutral
        }}
      />
      <Tab.Screen
        name='Pedido'
        component={OrderTab}
        initialParams={{ displayFormOnType: UserTypes.None }}
        options={{
          headerStyle: {
            backgroundColor: theme.colors.primary,
            borderBottomWidth: 2,
            borderBottomColor: theme.colors.neutral
          },
          headerShown: false,
          tabBarActiveTintColor: theme.colors.text,
          tabBarInactiveTintColor: theme.colors.neutral
        }}
      />
      <Tab.Screen
        name='Encuestas'
        component={SurveysTab}
        initialParams={{ displayFormOnType: UserTypes.None }}
        options={{
          headerStyle: {
            backgroundColor: theme.colors.primary,
            borderBottomWidth: 2,
            borderBottomColor: theme.colors.neutral
          },
          tabBarActiveTintColor: theme.colors.text,
          tabBarInactiveTintColor: theme.colors.neutral
        }}
      />
    </Tab.Navigator>
  );
}

