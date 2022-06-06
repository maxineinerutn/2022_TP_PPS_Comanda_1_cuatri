import {
  KeyboardAvoidingView,
  TextInput,
  Text,
  TouchableOpacity,
  View,
  Image,
  ActivityIndicator
} from 'react-native';
import React, { useContext, useState } from 'react';
import { styles } from './styles';
import GlobalContext from '../../../context/GlobalContext';
import { verifyUserIsApproved, handleLoginErrorMessage } from './utils';
import theme from '../../../config/theme';
import { signInUser } from '../../../services/AuthService';
import Gifplay from '../../../../assets/gifplayBig.gif';

function LoginTab() {
  const {
    email, setEmail, password, setPassword
  } = useContext( GlobalContext );

  const [errorMessage, setErrorMessage] = useState( '' );
  const [error, setError] = useState( false );
  const [loading, setLoading] = useState( false );

  const handleLogin = () => {
    setLoading( true );
    if ( verifyUserIsApproved( email )) {
      signIn( email, password );
    } else {
      setErrorMessage( 'Su usuario todavía no fué aprobado' );
      setError( true );
      setLoading( false );
    }
  };

  const signIn = async ( userEmail, userPassword ) => {
    await signInUser( userEmail, userPassword )
      .then(( userCredential ) => {
        setLoading( false );
        console.log( 'User logged in with: ', userCredential.user.email );
      // navigation.replace('HomeScreen');
      })
      .catch(( err ) => {
        setLoading( false );
        setError( true );
        setErrorMessage( handleLoginErrorMessage( err.code ));
        console.log( err.code );
        console.log( err.message );
      });
  };

  return (
    <KeyboardAvoidingView style={styles.container}>

      {loading && (
        <View style={styles.spinnerContainer}>
          <ActivityIndicator style={styles.spinner} size={180} color={theme.colors.icons} />
        </View>
      )}

      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>

          <Image
            style={{ width: 290, height: 290 }}
            source={Gifplay}
          />

          <TextInput
            placeholder='Email'
            placeholderTextColor='black'
            style={styles.input}
            value={email}
            onChangeText={( text ) => setEmail( text )}
          />
          <TextInput
            placeholder='Contraseña'
            placeholderTextColor='black'
            style={styles.input}
            value={password}
            onChangeText={( text ) => setPassword( text )}
            secureTextEntry
          />
          {error && <Text style={styles.error}>{errorMessage}</Text>}
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={handleLogin}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Ingresar</Text>
          </TouchableOpacity>

        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

export default LoginTab;
