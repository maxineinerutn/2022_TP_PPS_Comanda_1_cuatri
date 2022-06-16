import React from 'react';
import { View } from 'react-native';
import StandbyScreen from '../../../../components/StandbyScreen/StandbyScreen';
import styles from './styles';

export default function WaitingConfirmation() {
  return (
    <View style={styles.containerWaitingScreen}>
      <StandbyScreen text='Su pedido será confirmado a la brevedad' />
    </View>
  );
}
