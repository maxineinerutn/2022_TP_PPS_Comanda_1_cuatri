import React from 'react';
import { TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import theme from '../../config/theme';
import LoginTab from './LoginTab/LoginTab';
import RegisterTab from './RegisterTab/RegisterTab';
import { UserTypes } from '../../util/Enums';

const Tab = createBottomTabNavigator();

function renderTabBarIcon( route, size ) {
  let iconName;
  let iconColor;

  switch ( route.name ) {
    case 'Ingresar':
      iconColor = theme.colors.icons;
      iconName = 'login';
      break;
    case 'Registrarse':
      iconColor = theme.colors.icons;
      iconName = 'account-plus';
      break;
    default:
      break;
  }

  return (
    <MaterialCommunityIcons name={iconName} size={size} color={iconColor} />
  );
}

function renderHeaderIcon( navigation ) {
  return (
    <TouchableOpacity onPress={() => handleBack( navigation )}>
      <MaterialCommunityIcons name='arrow-left-circle' color={theme.colors.secondary} size={50} />
    </TouchableOpacity>
  );
}

const handleBack = ( navigation ) => {
  navigation.replace( 'Credentials', { screen: 'Registrarse', displayFormOnType: UserTypes.None });
};

function Credentials() {
  const navigation = useNavigation();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ size }) => renderTabBarIcon( route, size ),
        headerStyle: {
          backgroundColor: theme.colors.primary,
          borderBottomWidth: 2
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.neutral
      })}
    >
      <Tab.Screen
        name='Ingresar'
        component={LoginTab}
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
        name='Registrarse'
        component={RegisterTab}
        initialParams={{ displayFormOnType: UserTypes.None }}
        options={{
          headerStyle: {
            backgroundColor: theme.colors.primary,
            borderBottomWidth: 2,
            borderBottomColor: theme.colors.neutral
          },
          tabBarActiveTintColor: theme.colors.text,
          tabBarInactiveTintColor: theme.colors.neutral,
          headerTitleAlign: 'center',
          headerTitleStyle: {
            color: theme.colors.secondary
          },
          headerLeft: () => renderHeaderIcon( navigation )
        }}
      />
    </Tab.Navigator>
  );
}

export default Credentials;
