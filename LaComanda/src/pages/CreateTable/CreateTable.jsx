/* eslint-disable no-param-reassign */
import { View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import Styles from './Styles';
import TableForm from '../../components/TableForm/TableForm';
import { saveImageInStorage } from '../../services/StorageServices';
import { saveItemInCollection } from '../../services/FirestoreServices';

export default function CreateTable() {
  const navigation = useNavigation();
  const handlesubmit = ( formData ) => {
    saveTable( formData );
  };
  const saveTable = ( newTable ) => {
    createBlob( newTable.photo ).then(( blob ) => {
      saveImageInStorage( newTable.number, blob ).then(( uri ) => {
        newTable.photo = uri;
        newTable.qrId = 'qr';
        saveItemInCollection( 'tables', newTable.number, newTable ).then(() => {
          navigation.navigate( 'Home' );
        }).catch(() => {
          navigation.navigate( 'Home' );// mostrar el error
        });
      });
    }).catch(( error ) => { console.log( error ); });
  };
  async function createBlob( photoUri ) {
    return ( await fetch( photoUri )).blob();
  }
  return (
    <View style={Styles.container}>
      <TableForm onSubmit={handlesubmit} />
    </View>
  );
}

