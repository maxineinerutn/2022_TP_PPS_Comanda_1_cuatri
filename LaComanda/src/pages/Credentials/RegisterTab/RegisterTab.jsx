/* eslint-disable react/prop-types */
/* eslint-disable no-param-reassign */
import { View, TouchableOpacity, Text } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import UserForm from '../../../components/UserForm/UserForm';
import { UserTypes } from '../../../util/Enums';
import Styles from './Styles';
import { createUserWithEmailAndPassword, signOutUser } from '../../../services/AuthService';
import { saveImageInStorage } from '../../../services/StorageServices';
import { saveItemInCollection } from '../../../services/FirestoreServices';

function RegisterTab({ route }) {
  const { displayFormOnType } = route.params;
  const [userTypeForm, setUserTypeForm] = useState( displayFormOnType );
  const navigation = useNavigation();

  const handleSubmit = ( newUser ) => {
    registerUser( newUser );
  };

  const registerUser = ( newUser ) => {
    createUserWithEmailAndPassword( newUser.email, newUser.password ).then(( user ) => {
      createBlob( newUser.photo ).then(( blob ) => {
        saveImageInStorage( user.user.uid, blob ).then(( uri ) => {
          newUser.photo = uri;
          saveItemInCollection( 'users', user.user.uid, newUser );
        })
          .catch(( error ) => console.log( error ));
      }).catch(( error ) => { console.log( error ); });
    }).then(() => {
      signOutUser();
      navigation.navigate( 'Ingresar' );
    });
  };

  async function createBlob( photoUri ) {
    return ( await fetch( photoUri )).blob();
  }

  const renderForm = ( userType ) => (
    <View>
      <UserForm userType={userType} onSubmit={handleSubmit} />
    </View>
  );

  return (
    <View style={Styles.container}>
      {userTypeForm !== UserTypes.None ? renderForm( userTypeForm )
        : (
          <>
            <TouchableOpacity
              onPress={() => setUserTypeForm( UserTypes.Guest )}
              style={Styles.button}
            >
              <View>
                <Text style={Styles.buttonText}>Registrate como</Text>
                <Text style={Styles.buttonTextSecondary}>Invitado</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setUserTypeForm( UserTypes.Employee )}
              style={Styles.button}
            >
              <View>
                <Text style={Styles.buttonText}>Registrate como</Text>
                <Text style={Styles.buttonTextSecondary}>Cliente</Text>
              </View>
            </TouchableOpacity>
          </>
        )}
    </View>
  );
}

export default RegisterTab;
