import {
  View, Image
} from 'react-native';
import React, { useContext } from 'react';
import GlobalContext from '../../context/GlobalContext';
import styles from './styles';
import Card from '../Card/Card';

export default function UserProfile() {
  const { user } = useContext( GlobalContext );
  return (
    <View style={[( user.role === 'Cliente' || user.role === 'Invitado' ) ? styles.containerClient : styles.container]}>
      <View style={styles.formControlPhoto}>
        <Image
          style={styles.formControlPhotoWithPhoto}
          source={{ uri: user.photo.uri }}
          resizeMode='center'
        />
      </View>
      <View style={styles.cardContainer}>
        {user.surname ? <Card text={`${user.name} ${user.surname}`} /> : <Card text={user.name} />}
        {user.dni && <Card text={user.dni} />}
        <Card text={user.role} />
        {user.email && <Card text={user.email} />}
      </View>

    </View>
  );
}
