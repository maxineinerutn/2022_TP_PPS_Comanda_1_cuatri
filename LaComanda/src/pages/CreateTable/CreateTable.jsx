/* eslint-disable no-param-reassign */
import { View } from 'react-native';
import React from 'react';
import Styles from './Styles';
import TableForm from '../../components/TableForm/TableForm';
import { saveImageInStorage } from '../../services/StorageServices';
import { saveItemInCollection } from '../../services/FirestoreServices';

export default function CreateTable() {
  const handlesubmit = ( formData ) => {
    saveTable( formData );
  };
  const saveTable = ( newTable ) => {
    createBlob( newTable.photo ).then(( blob ) => {
      saveImageInStorage( newTable.number, blob ).then(( uri ) => {
        newTable.photo = uri;
        newTable.qrId = 'qr';
        saveItemInCollection( 'tables', newTable.number, newTable ).then(() => {
          // redireccionar
        }).catch(() => { /* redireccionar*/ });
      });
    }).catch(( error ) => { console.log( error ); });
  };
  async function createBlob( photoUri ) {
    return ( await fetch( photoUri )).blob();
  }
  const handleCancel = () => {};
  return (
    <View style={Styles.container}>
      <TableForm onSubmit={handlesubmit} onCancel={handleCancel} />
    </View>
  );
}

