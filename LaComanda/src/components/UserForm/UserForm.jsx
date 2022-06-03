/* eslint-disable react/prop-types */
import {
  Text,
  View,
  TextInput,
  Button,
  Keyboard,
  TouchableWithoutFeedback,
  Image
} from 'react-native';
import React, { useState } from 'react';
import { RadioButtons } from 'react-native-radio-buttons';
import Styles from './Styles';
import { UserTypes } from '../../util/Enums';
import userImgDefault from '../../../assets/user.png';

export default function UserForm( props ) {
  const { userType, onSubmit } = props;
  const [formValid, setFormValid] = useState( false );
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
                <Text style={Styles.textError}>{errorRol.message}</Text>
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
                <Text style={Styles.textError}>{errorRol.message}</Text>
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
          <Text style={[{ textAlign: 'center' }, textStyle]}>{option}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
  function renderContainer( options ) {
    return <View style={Styles.containerRadioButton}>{options}</View>;
  }
  const handleSubmit = () => {
    Keyboard.dismiss();
    setFormValid( true );
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

    if ( dni === '' ) {
      hasErrorDni({ message: 'El dni es requerido.', error: true });
      setFormValid( false );
    } else if ( dni.length < 8 || dni.length > 8 ) {
      hasErrorDni({ message: 'El dni es inválido.', error: true });
      setFormValid( false );
    } else {
      hasErrorDni({ message: '', error: false });
    }

    if ( cuil === '' ) {
      hasErrorCuil({ message: 'El cuil es requerido.', error: true });
      setFormValid( false );
    } else if ( cuil.length < 11 || cuil.length > 11 ) {
      hasErrorCuil({ message: 'El cuil es inválido.', error: true });
      setFormValid( false );
    } else {
      hasErrorCuil({ message: '', error: false });
    }

    if ( rol === '' ) {
      hasErrorRol({ message: 'El rol es requerido.', error: true });
      setFormValid( false );
    } else {
      hasErrorRol({ message: '', error: false });
    }

    if ( photo === '' ) {
      hasErrorPhoto({ message: 'La foto es requerida.', error: true });
      setFormValid( false );
    } else {
      hasErrorPhoto({ message: '', error: false });
    }
    if ( formValid ) {
      setFormValid( true );
      if ( userType === UserTypes.Anonymous ) {
        setRol( UserTypes.Anonymous );
        setSurname( null );
        setDni( null );
        setCuil( null );
      }
      const user = {
        name,
        surname,
        dni,
        cuil,
        rol,
        photo
      };
      onSubmit( user );
    }
  };

  return (
    <View style={Styles.container}>
      <View style={Styles.formControlPhoto}>
        {photo === '' ? (
          <Image
            style={Styles.formControlPhotoWithoutPhoto}
            source={userImgDefault}
            resizeMode='center'
          />
        ) : (
          <Image
            style={Styles.formControlPhotoWithoutPhoto}
            source={photo}
            resizeMode='center'
          />
        )}
        {errorPhoto.error && (
          <Text style={Styles.textError}>{errorPhoto.message}</Text>
        )}
      </View>
      <View style={Styles.formControl}>
        <TextInput
          placeholder='Nombre'
          value={name}
          onChangeText={( text ) => setName( text )}
        />
        {errorName.error && (
          <Text style={Styles.textError}>{errorName.message}</Text>
        )}
      </View>
      {renderSpecificFormControl()}
      <Button title='Registrar' onPress={() => handleSubmit()} />
    </View>
  );
}
