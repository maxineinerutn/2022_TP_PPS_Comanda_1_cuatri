import React, { useContext, useState } from 'react';
import { Text, View } from 'react-native';
import StandbyScreen from '../../../../components/StandbyScreen/StandbyScreen';
import GlobalContext from '../../../../context/GlobalContext';
import styles from './styles';

export default function WaitingConfirmedOrder() {
  const { client } = useContext( GlobalContext );
  const { totalEstimatedTime } = client.order;
  const [remaining] = useState( totalEstimatedTime );

  return (
    <View style={styles.containerWaitingScreen}>
      <StandbyScreen text='Tiempo estimado para recibir el pedido' />
      <Text style={styles.text}>
        {remaining}
        {' '}
        Minutos
      </Text>
    </View>
  );
}

