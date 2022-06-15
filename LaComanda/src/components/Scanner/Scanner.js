/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  ActivityIndicator
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import Styles from './Styles';
import theme from '../../config/theme';

export default function Scanner( props ) {
  const { onScan } = props;
  const isFocused = useIsFocused();
  const [hasPermission, setHasPermission] = useState( null );
  const [scanned, setScanned] = useState( false );
  useEffect(() => {
    ( async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission( status === 'granted' );
    })();
  }, [isFocused]);

  const handleBarCodeScanned = ({ data }) => {
    setScanned( true );
    const qrData = data;
    validateBarCode( qrData );
  };

  const validateBarCode = ( qrData ) => {
    onScan( qrData );
    setScanned( false );
  };

  if ( hasPermission === null ) {
    return (
      <View style={Styles.containerScanner}>
        <ActivityIndicator size={180} color={theme.colors.primary} />
      </View>
    );
  }
  if ( hasPermission === false ) {
    return (
      <Text>La aplicación no tiene acceso a la camara de su dispositivo.</Text>
    );
  }

  return (
    <View style={Styles.container}>
      {isFocused && (
        <View style={Styles.containerScanner}>
          <BarCodeScanner
            barCodeTypes={[BarCodeScanner.Constants.BarCodeType.pdf417, BarCodeScanner.Constants.BarCodeType.qr]}
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={Styles.wrapper}
          />
        </View>
      )}
    </View>
  );
}

