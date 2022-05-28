import { NavigationContainer } from '@react-navigation/native';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import React from 'react';
import { Text } from 'react-native';
import { useSelector } from 'react-redux';
import { firebaseConfig } from '../firebase';
import LoginStack from './navigation/stacks/LoginStack';
import { IStore } from './redux/store';
import { AuthTypes } from './redux/authReducer';

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const InitApp = ()=> {
  const data:AuthTypes = useSelector<IStore, any>(store=>store.auth);
  return (
    <NavigationContainer>
      <LoginStack />
    </NavigationContainer>
  );
}

export default InitApp
