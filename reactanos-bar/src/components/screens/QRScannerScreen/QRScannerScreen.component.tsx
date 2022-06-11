import { StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { BarCodeScanner } from 'expo-barcode-scanner'

const QRScannerScreen = ({route, navigation}:any) => {
  const [scanned, setScanned] = useState(false);

  const handleScanQR = ({data}:any) => {
    setScanned(true);
    route.params.goBack(data)
    navigation.goBack();
  }

  return (
    <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleScanQR}
        style={StyleSheet.absoluteFillObject}
    />
  )
}

export default QRScannerScreen