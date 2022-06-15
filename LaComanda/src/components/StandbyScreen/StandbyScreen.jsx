import { Text, Image } from 'react-native';
import React from 'react';
import styles from './styles';
import gifClock from '../../../assets/clock.gif';

export default function StandbyScreen() {
  return (
    < >
      <Image
        style={{ width: 290, height: 290 }}
        source={gifClock}
      />
      <Text style={styles.textWaiting}>Se encuentra en lista de espera para ingresar</Text>
    </>
  );
}

