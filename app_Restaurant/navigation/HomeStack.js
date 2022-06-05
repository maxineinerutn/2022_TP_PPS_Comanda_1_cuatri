import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { StyleSheet } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import { IconButton } from '../components';
import Firebase from '../config/firebase';

const auth = Firebase.auth();
const Stack = createStackNavigator();
const handleSignOut = async () => {
  try {
    await auth.signOut();
  } catch (error) {
    console.log(error);
  }
};

export default function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{
      headerRightContainerStyle: styles.headerRight,
      headerStyle: { backgroundColor: 'papayawhip' },
      headerRight: () => (
        <IconButton
          name='logout'
          size={24}
          color='#757ce8'
          onPress={handleSignOut}
        />
      ),
    }}
    >
      <Stack.Screen name='Home' component={HomeScreen} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  headerRight: {
    paddingRight: 30,
  }
});