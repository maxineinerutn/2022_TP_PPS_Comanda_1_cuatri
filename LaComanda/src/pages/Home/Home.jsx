import { View } from 'react-native';
import React, { useContext } from 'react';
import UserProfile from '../../components/UserProfile/UserProfile';
import Fab from '../../components/Fab/Fab';
import GlobalContext from '../../context/GlobalContext';
import styles from '../../components/Fab/styles';

export default function Home() {
  const { user } = useContext( GlobalContext );

  return (
    <View style={styles.container}>
      <Fab
        style={{}}
        type={user.role}
      />
      <UserProfile />
    </View>
  );
}
