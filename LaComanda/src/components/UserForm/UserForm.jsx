/* eslint-disable react/prop-types */
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  Image,
  ScrollView
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { RadioButtons } from 'react-native-radio-buttons';
import Styles from './Styles';
import { UserTypes } from '../../util/Enums';
import userImgDefault from '../../../assets/iconoCamara.png';
import CamaraView from '../CameraView/CamaraView';
import Scanner from '../Scanner/Scanner';

export default function UserForm( props ) {
  const { userType, onSubmit } = props;
  const [formValid, setFormValid] = useState( false );
  const [email, setEmail] = useState( '' );
  const [errorEmail, hasErrorEmail] = useState({ message: '', error: false });
  const [password, setPassword] = useState( '' );
  const [errorPassword, hasErrorPassword] = useState({
    message: '',
    error: false
  });
  const [name, setName] = useState( '' );
  const [errorName, hasErrorName] = useState({ message: '', error: false });
  const [surname, setSurname] = useState( '' );
  const [errorSurname, hasErrorSurname] = useState({
    message: '',
    error: false
  });
  const [dni, setDni] = useState( '' );
  const [errorDni, hasErrorDni] = useState({ message: '', error: false });
  const [cuil, setCuil] = useState( '' );
  const [errorCuil, hasErrorCuil] = useState({ message: '', error: false });
  const [rol, setRol] = useState( '' );
  const [errorRol, hasErrorRol] = useState({ message: '', error: false });
  const [photo, setPhoto] = useState( '' );
  const [errorPhoto, hasErrorPhoto] = useState({ message: '', error: false });
  const [cameraActivated, setCameraActivate] = useState( false );
  const [scannerActivated, setScannerActivate] = useState( false );

  useEffect(() => {
    if ( userType === UserTypes.Guest ) {
      setRol( 'Invitado' );
      setSurname( '-' );
      setDni( '-' );
      setCuil( '-' );
    } else if ( userType === UserTypes.Client ) {
      setRol( 'Cliente' );
      setCuil( '-' );
    }
  }, []);
  useEffect(() => {
    if ( formValid ) {
      setFormValid( true );
      validatePhoto();
      validateRol();
      validateCuil();
      validateName();
      validateSurname();
      validateDni();
      validateEmail();
      validatePassword();
    }
  }, [email, password, name, surname, dni, cuil, rol, photo]);

  function renderSpecificFormControl() {
    const options = ['Dueño', 'Supervisor'];
    const employeeOptions = ['Metre', 'Mozo', 'Cocinero', 'Bartender'];

    switch ( userType ) {
      case UserTypes.OwnerOrSupervisor:
        return (
          <>
            <View style={Styles.formControl}>
              <TextInput
                placeholder='Apellido'
                value={surname}
                onChangeText={( text ) => setSurname( text )}
                onBlur={() => validateSurname()}
              />
              {errorSurname.error && (
                <Text style={Styles.textError}>{errorSurname.message}</Text>
              )}
            </View>
            <View style={Styles.formControl}>
              <TextInput
                placeholder='DNI'
                keyboardType='numeric'
                value={dni}
                onChangeText={( text ) => setDni( text )}
                onBlur={() => validateDni()}
              />
              {errorDni.error && (
                <Text style={Styles.textError}>{errorDni.message}</Text>
              )}
            </View>
            <View style={Styles.formControl}>
              <TextInput
                placeholder='CUIL'
                keyboardType='numeric'
                value={cuil}
                onChangeText={( text ) => setCuil( text )}
                onBlur={() => validateCuil()}
              />
              {errorCuil.error && (
                <Text style={Styles.textError}>{errorCuil.message}</Text>
              )}
            </View>
            <View style={Styles.formControlRadio}>
              <RadioButtons
                options={options}
                onSelection={( option ) => setRol( option )}
                selectedOption={rol}
                renderOption={renderOption}
                renderContainer={renderContainer}
              />
              {errorRol.error && (
                <Text style={Styles.textErrorRadioButton}>{errorRol.message}</Text>
              )}
            </View>
          </>
        );
      case UserTypes.Employee:
        return (
          <>
            <View style={Styles.formControl}>
              <TextInput
                placeholder='Apellido'
                value={surname}
                onChangeText={( text ) => setSurname( text )}
                onBlur={() => validateSurname()}
              />
              {errorSurname.error && (
                <Text style={Styles.textError}>{errorSurname.message}</Text>
              )}
            </View>
            <View style={Styles.formControl}>
              <TextInput
                placeholder='DNI'
                keyboardType='numeric'
                value={dni}
                onChangeText={( text ) => setDni( text )}
                onBlur={() => validateDni()}
              />
              {errorDni.error && (
                <Text style={Styles.textError}>{errorDni.message}</Text>
              )}
            </View>
            <View style={Styles.formControl}>
              <TextInput
                placeholder='CUIL'
                keyboardType='numeric'
                value={cuil}
                onChangeText={( text ) => setCuil( text )}
                onBlur={() => validateCuil()}
              />
              {errorCuil.error && (
                <Text style={Styles.textError}>{errorCuil.message}</Text>
              )}
            </View>
            <View style={Styles.formControlRadio}>
              <RadioButtons
                options={employeeOptions}
                onSelection={( option ) => setRol( option )}
                selectedOption={rol}
                renderOption={renderOption}
                renderContainer={renderContainer}
              />
              {errorRol.error && (
                <Text style={Styles.textErrorRadioButton}>{errorRol.message}</Text>
              )}
            </View>
          </>
        );
      case UserTypes.Client:
        return (
          <>
            <View style={Styles.formControl}>
              <TextInput
                placeholder='Apellido'
                value={surname}
                onChangeText={( text ) => setSurname( text )}
                onBlur={() => validateSurname()}
              />
              {errorSurname.error && (
                <Text style={Styles.textError}>{errorSurname.message}</Text>
              )}
            </View>
            <View style={Styles.formControl}>
              <TextInput
                placeholder='DNI'
                keyboardType='numeric'
                value={dni}
                onChangeText={( text ) => setDni( text )}
                onBlur={() => validateDni()}
              />
              {errorDni.error && (
                <Text style={Styles.textError}>{errorDni.message}</Text>
              )}
            </View>
          </>
        );
      default:
        return null;
    }
  }

  function renderOption( option, selected, onSelect, index ) {
    const textStyle = selected ? Styles.textRadioButtonSelected : {};
    const containerStateStyle = selected ? Styles.radioBtnSelected : {};

    return (
      <TouchableWithoutFeedback onPress={onSelect} key={index}>
        <View style={[Styles.radioBtn, containerStateStyle]}>
          <Text style={[{ textAlign: 'center' }, textStyle, selected && { color: 'white' }]}>{option}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  function renderContainer( options ) {
    return <View style={Styles.containerRadioButton}>{options}</View>;
  }

  function validatePhoto() {
    if ( photo === '' ) {
      hasErrorPhoto({ message: 'La foto es requerida.', error: true });
      setFormValid( false );
    } else {
      hasErrorPhoto({ message: '', error: false });
    }
  }

  function validateEmail() {
    if ( email !== '-' ) {
      if ( email === '' ) {
        hasErrorEmail({ message: 'El Correo electrónico es requerido.', error: true });
        setFormValid( false );
      } else if ( !email.includes( '@' )) {
        hasErrorEmail({ message: 'El nombre es inválido.', error: true });
        setFormValid( false );
      } else {
        hasErrorEmail({ message: '', error: false });
      }
    }
  }

  function validatePassword() {
    if ( password === '' ) {
      hasErrorPassword({ message: 'La clave es requerida.', error: true });
      setFormValid( false );
    } else if ( password.length < 8 ) {
      hasErrorPassword({ message: 'La clave es demasiada corta.', error: true });
      setFormValid( false );
    } else if ( password.length > 20 ) {
      hasErrorPassword({ message: 'La clave es demasiada larga.', error: true });
      setFormValid( false );
    } else {
      hasErrorPassword({ message: '', error: false });
    }
  }

  function validateName() {
    if ( name !== '-' ) {
      if ( name === '' ) {
        hasErrorName({ message: 'El nombre es requerido.', error: true });
        setFormValid( false );
      } else if ( name.length < 2 ) {
        hasErrorName({ message: 'El nombre es demasiado corto.', error: true });
        setFormValid( false );
      } else if ( name.length > 20 ) {
        hasErrorName({ message: 'El nombre es demasiado largo.', error: true });
        setFormValid( false );
      } else {
        hasErrorName({ message: '', error: false });
      }
    }
  }

  function validateSurname() {
    if ( surname !== '-' ) {
      if ( surname === '' ) {
        hasErrorSurname({ message: 'El apellido es requerido.', error: true });
        setFormValid( false );
      } else if ( surname.length < 2 ) {
        hasErrorSurname({
          message: 'El apellido es demasiado corto.',
          error: true
        });
        setFormValid( false );
      } else if ( surname.length > 20 ) {
        hasErrorSurname({
          message: 'El apellido es demasiado largo.',
          error: true
        });
        setFormValid( false );
      } else {
        hasErrorSurname({ message: '', error: false });
      }
    }
  }

  function validateDni() {
    if ( dni !== '-' ) {
      if ( dni === '' ) {
        hasErrorDni({ message: 'El dni es requerido.', error: true });
        setFormValid( false );
      } else if ( dni.length < 8 || dni.length > 8 ) {
        hasErrorDni({ message: 'El dni es inválido.', error: true });
        setFormValid( false );
      } else {
        hasErrorDni({ message: '', error: false });
      }
    }
  }

  function validateCuil() {
    if ( cuil !== '-' ) {
      if ( cuil === '' ) {
        hasErrorCuil({ message: 'El cuil es requerido.', error: true });
        setFormValid( false );
      } else if ( cuil.length < 11 || cuil.length > 11 ) {
        hasErrorCuil({ message: 'El cuil es inválido.', error: true });
        setFormValid( false );
      } else {
        hasErrorCuil({ message: '', error: false });
      }
    }
  }

  function validateRol() {
    if ( rol !== '-' ) {
      if ( rol === '' ) {
        hasErrorRol({ message: 'El rol es requerido.', error: true });
        setFormValid( false );
      } else {
        hasErrorRol({ message: '', error: false });
      }
    }
  }

  const handleSubmit = () => {
    Keyboard.dismiss();
    setFormValid( true );
    validatePhoto();
    validateRol();
    validateCuil();
    validateName();
    validateSurname();
    validateDni();
    validateEmail();
    validatePassword();

    if ( formValid ) {
      const user = {
        name,
        surname,
        dni,
        cuil,
        rol,
        photo,
        email,
        password,
        approved: true
      };
      if ( userType === UserTypes.Client ) { user.approved = false; }
      onSubmit( user );
    }
  };

  function takePhoto() {
    setCameraActivate( true );
  }

  function handleCamera( photoTaken ) {
    setPhoto( photoTaken );
    setCameraActivate( false );
  }

  function handleScanner() {
    setScannerActivate( true );
    setCameraActivate( true );
  }

  function handleScannerResult( _result ) {
    const result = processData( _result );
    setScannerActivate( false );
    setCameraActivate( false );
    setName( result.name );
    setSurname( result.surname );
    setDni( result.dni );
  }
  function processData( qrData ) {
    const datos = qrData.split( '@' );
    return { surname: datos[1], name: datos[2], dni: datos[4] };
  }
  return (
    <View>
      { cameraActivated ? (
        <View>
          {scannerActivated ? ( <Scanner onScan={( result ) => handleScannerResult( result )} /> )
            : ( <CamaraView onKeepPhoto={( photoTaken ) => handleCamera( photoTaken )} /> )}
        </View>
      )
        : (
          <View style={Styles.container}>
            <ScrollView>

              <View style={Styles.containerForm}>
                <View style={Styles.formControlPhoto}>
                  <TouchableWithoutFeedback onPress={() => takePhoto()}>
                    {photo === '' ? (
                      <Image
                        style={Styles.formControlPhotoWithoutPhoto}
                        source={userImgDefault}
                        resizeMode='center'
                      />
                    ) : (
                      <Image
                        style={Styles.formControlPhotoWithPhoto}
                        source={{ uri: photo }}
                        resizeMode='center'
                      />
                    )}
                  </TouchableWithoutFeedback>
                  {errorPhoto.error && (
                    <Text style={Styles.textError}>{errorPhoto.message}</Text>
                  )}
                </View>
                <View style={Styles.formControl}>
                  <TextInput
                    placeholder='Nombre'
                    value={name}
                    onChangeText={( text ) => setName( text )}
                    onBlur={() => validateName()}
                  />
                  {errorName.error && (
                    <Text style={Styles.textError}>{errorName.message}</Text>
                  )}
                </View>
                {renderSpecificFormControl()}
                <View style={Styles.formControl}>
                  <TextInput
                    placeholder='Correo Electrónico'
                    value={email}
                    onChangeText={( text ) => setEmail( text )}
                    keyboardType='email-address'
                    onBlur={() => validateEmail()}
                  />
                  {errorEmail.error && (
                    <Text style={Styles.textError}>{errorEmail.message}</Text>
                  )}
                </View>
                <View style={Styles.formControl}>
                  <TextInput
                    placeholder='Clave'
                    value={password}
                    onChangeText={( text ) => setPassword( text )}
                    secureTextEntry
                    onBlur={() => validatePassword()}
                  />
                  {errorPassword.error && (
                    <Text style={Styles.textError}>{errorPassword.message}</Text>
                  )}
                </View>
              </View>
            </ScrollView>
            <View style={Styles.containerActionButtons}>
              {userType !== UserTypes.Guest
              && (
                <TouchableOpacity style={Styles.button} onPress={() => handleScanner()}>
                  <Text style={Styles.buttonText}>Escanear DNI</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity style={Styles.button} onPress={() => handleSubmit()}>
                <Text style={Styles.buttonText}>Registrarse</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
    </View>
  );
}
