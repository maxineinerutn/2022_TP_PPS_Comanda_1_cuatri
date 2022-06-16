import React from 'react';
import { View } from 'react-native';
import StandbyScreen from '../../../../components/StandbyScreen/StandbyScreen';
import styles from './styles';

export default function WaitingConfirmedOrder() {
  return (
    <View style={styles.containerWaitingScreen}>
      <StandbyScreen text='Tiempo estimado para recibir el pedido' />
      {/* agregar el tiempo aca */}
    </View>
  );
}

