import { View, Text, ActivityIndicator } from 'react-native';
import React, { useContext, useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import styles from './styles.js';
import StandbyScreen from '../../components/StandbyScreen/StandbyScreen.jsx';
import GlobalContext from '../../context/GlobalContext.js';
import { OrderStatus } from '../../util/Enums.js';
import Scanner from '../../components/Scanner/Scanner.js';
import theme from '../../config/theme.js';
import { updateItem } from '../../services/FirestoreServices.js';

export default function ClientHome() {
  const [waiting, setWaiting] = useState( null );
  const [spinner, setSpinner] = useState( false );
  const { client } = useContext( GlobalContext );
  const navigation = useNavigation();
  useEffect(() => {
    switch ( client.orderState ) {
      case OrderStatus.WaitingList:
        setWaiting( true );
        break;
      case OrderStatus.WaitingForScanTable:
        setWaiting( false );
        break;
      default:
        break;
    }
  }, [client.orderState]);
  const handleScan = ( _scanResult ) => {
    setSpinner( true );
    if ( _scanResult === client.assignedTable ) {
      updateItem( 'clients', client.email, { orderState: OrderStatus.ScannedAssignedTable });
      navigation.navigate( 'TableMenu' );
    } else {
      console.log( 'No es la mesa asignada' );
      setTimeout(() => {
        setSpinner( false );
      }, 1000 ); // TODO: aca se deberia mostrar un mensaje de error
    }
  };
  return (
    <View>
      { waiting
        ? <View style={styles.containerWaitingScreen}><StandbyScreen /></View> : (
          <View style={styles.containerScannerTable}>
            <Text style={styles.textScanTable}>Debe Scannear la mesa que se le fue asignada</Text>
            {
              spinner ? (
                <View style={styles.containerSpinner}>
                  <ActivityIndicator size={180} color={theme.colors.primary} />
                </View>
              )
                : <Scanner onScan={handleScan} />
            }
          </View>
        ) }
    </View>
  );
}

