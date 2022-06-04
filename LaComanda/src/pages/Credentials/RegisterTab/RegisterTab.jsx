/* eslint-disable no-param-reassign */
import { View } from 'react-native';
import React from 'react';
import UserForm from '../../../components/UserForm/UserForm';
import { UserTypes } from '../../../util/Enums';
import Styles from './Styles';
import { createUserWithEmailAndPassword } from '../../../services/AuthService';
import { saveImageInStorage } from '../../../services/StorageServices';
import { saveItemInCollection } from '../../../services/FirestoreServices';

const handleSubmit = ( newUser ) => {
  registerUser( newUser );
};
function registerUser( newUser ) {
  createUserWithEmailAndPassword( newUser.email, newUser.password ).then(( user ) => {
    createBlob( newUser.photo ).then(( blob ) => {
      saveImageInStorage( user.user.uid, blob ).then(( uri ) => {
        newUser.photo = uri;
        saveItemInCollection( 'users', user.user.uid, newUser );
      });
    }).catch(( error ) => { console.log( error ); });
  });
}
async function createBlob( photoUri ) {
  return ( await fetch( photoUri )).blob();
}
function RegisterTab() {
  return (
    <View styles={Styles.container}>
      <UserForm userType={UserTypes.Client} onSubmit={handleSubmit} />
    </View>
  );
}

export default RegisterTab;
