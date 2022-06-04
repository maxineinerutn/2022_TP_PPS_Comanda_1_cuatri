/* eslint-disable no-param-reassign */
import { View, TouchableOpacity, Text } from 'react-native';
import React, { useState } from 'react';
import UserForm from '../../../components/UserForm/UserForm';
import { UserTypes } from '../../../util/Enums';
import Styles from './Styles';
import { createUserWithEmailAndPassword } from '../../../services/AuthService';
import { saveImageInStorage } from '../../../services/StorageServices';
import { saveItemInCollection } from '../../../services/FirestoreServices';

function RegisterTab() {
  const [userTypeForm, setUserTypeForm] = useState( null );
  const handleSubmit = ( newUser ) => {
    registerUser( newUser );
  };
  const registerUser = ( newUser ) => {
    createUserWithEmailAndPassword( newUser.email, newUser.password ).then(( user ) => {
      createBlob( newUser.photo ).then(( blob ) => {
        saveImageInStorage( user.user.uid, blob ).then(( uri ) => {
          newUser.photo = uri;
          saveItemInCollection( 'users', user.user.uid, newUser );
        });
      }).catch(( error ) => { console.log( error ); });
    });
  };
  async function createBlob( photoUri ) {
    return ( await fetch( photoUri )).blob();
  }
  const renderForm = ( userType ) => (
    <View><UserForm userType={userType} onSubmit={handleSubmit} onCancel={handleCancelRegistration} /></View>
  );
  const handleCancelRegistration = () => {
    setUserTypeForm( null );
  };
  return (
    <View style={Styles.container}>
      {userTypeForm ? renderForm( userTypeForm )
        : (
          <>
            <TouchableOpacity
              onPress={() => setUserTypeForm( UserTypes.Guest )}
              style={Styles.button}
            >
              <View>
                <Text style={Styles.buttonText}>Ingresá como invitado</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setUserTypeForm( UserTypes.Employee )}
              style={Styles.button}
            >
              <View>
                <Text style={Styles.buttonText}>Ingresá como Cliente</Text>
              </View>
            </TouchableOpacity>
          </>
        )}
    </View>
  );
}

export default RegisterTab;
