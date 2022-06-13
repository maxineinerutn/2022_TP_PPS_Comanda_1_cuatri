import { View } from 'react-native';
import React, { useContext, useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import UserProfile from '../../components/UserProfile/UserProfile';
import Fab from '../../components/Fab/Fab';
import GlobalContext from '../../context/GlobalContext';
import styles from '../../components/Fab/styles';

export default function Home() {
  const { user } = useContext( GlobalContext );

  useEffect(() => {
    switch ( user.role ) {
      case 'Dueño':
      case 'Supervisor':
        Notifications.addNotificationResponseReceivedListener( handleNotificationResponse );
        break;
      case 'Mozo':
        Notifications.addNotificationResponseReceivedListener( handleNotificationResponse );
        break;
      case 'Cocinero':
      case 'Bartender':
        Notifications.addNotificationResponseReceivedListener( handleNotificationResponse );
        break;
      case 'Metre':
        Notifications.addNotificationResponseReceivedListener( handleNotificationResponse );
        break;
      default:
        break;
    }
  }, []);

  const handleNotificationResponse = ( response ) => {
    console.log( response );
  };
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
