import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import theme from "../../config/theme";
import LoginTab from "./LoginTab/LoginTab";
import RegisterTab from "./RegisterTab/RegisterTab";

const Tab = createBottomTabNavigator();

function renderTabBarICon(route, size) {
  let iconName;
  let iconColor;
  switch (route.name) {
    case "Ingresar":
      iconColor = theme.colors.icons;
      iconName = "login";
      break;
    case "Registrarse":
      iconColor = theme.colors.icons;
      iconName = "account-plus";
      break;
    default:
      break;
  }
  return (
    <MaterialCommunityIcons name={iconName} size={size} color={iconColor} />
  );
}

function Credentials() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ size }) => renderTabBarICon(route, size),
        headerStyle: {
          backgroundColor: theme.colors.primary,
          borderBottomWidth: 2,
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.neutral,
      })}
    >
      <Tab.Screen
        name="Ingresar"
        component={LoginTab}
        options={{
          headerStyle: {
            backgroundColor: theme.colors.primary,
            borderBottomWidth: 2,
            borderBottomColor: theme.colors.neutral,
          },
          headerShown: false,
          tabBarActiveTintColor: theme.colors.text,
          tabBarInactiveTintColor: theme.colors.neutral,
        }}
      />
      <Tab.Screen
        name="Registrarse"
        component={RegisterTab}
        options={{
          headerStyle: {
            backgroundColor: theme.colors.primary,
            borderBottomWidth: 2,
            borderBottomColor: theme.colors.neutral,
          },
          tabBarActiveTintColor: theme.colors.text,
          tabBarInactiveTintColor: theme.colors.neutral,
          headerTitleAlign: "center",
          headerTitleStyle: {
            color: theme.colors.secondary,
          },
        }}
      />
    </Tab.Navigator>
  );
}

export default Credentials;
