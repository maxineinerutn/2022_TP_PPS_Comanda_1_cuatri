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
import userImgDefault from '../../../assets/iconoCamara.png';
import CamaraView from '../CameraView/CamaraView';
import { ConstantsSystem } from '../../config/constantsSystem';

export default function TableForm( props ) {
  const { onSubmit } = props;
  const [formValid, setFormValid] = useState( false );

  const [number, setNumber] = useState( '' );
  const [errorNumber, hasErrorNumber] = useState({ message: '', error: false });

  const [capacity, setCapacity] = useState( '' );
  const [errorCapacity, hasErrorCapacity] = useState({
    message: '',
    error: false
  });

  const [type, setType] = useState( '' );
  const [errorType, hasErrorType] = useState({ message: '', error: false });

  const [photo, setPhoto] = useState( '' );
  const [errorPhoto, hasErrorPhoto] = useState({ message: '', error: false });

  const [cameraActivated, setCameraActivate] = useState( false );

  useEffect(() => {
    if ( formValid ) {
      setFormValid( true );
      validatePhoto();
      validateType();
      validateNumber();
      validateCapacity();
    }
  }, [number, capacity, type, photo]);

  function renderSpecificFormControl() {
    const options = ConstantsSystem.Tables.TYPES_OF_TABLES;

    return (
      <>
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
            placeholder='Numero de mesa'
            keyboardType='numeric'
            value={number}
            onChangeText={( text ) => setNumber( text )}
            onBlur={() => validateNumber()}
          />
          {errorNumber.error && (
            <Text style={Styles.textError}>{errorNumber.message}</Text>
          )}
        </View>
        <View style={Styles.formControl}>
          <TextInput
            placeholder='Capacidad'
            keyboardType='numeric'
            value={capacity}
            onChangeText={( text ) => setCapacity( text )}
            onBlur={() => validateCapacity()}
          />
          {errorCapacity.error && (
            <Text style={Styles.textError}>{errorCapacity.message}</Text>
          )}
        </View>
        <View style={Styles.formControlRadio}>
          <RadioButtons
            options={options}
            onSelection={( option ) => setType( option )}
            selectedOption={type}
            renderOption={renderOption}
            renderContainer={renderContainer}
          />
          {errorType.error && (
            <Text style={Styles.textErrorRadioButton}>{errorType.message}</Text>
          )}
        </View>
      </>
    );
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
  function validateNumber() {
    if ( number === '' ) {
      hasErrorNumber({ message: 'El Número de mesa es requerido.', error: true });
      setFormValid( false );
    } else if ( number <= 0 ) {
      hasErrorNumber({ message: 'El Número debe ser mayor que 0.', error: true });
      setFormValid( false );
    } else if ( number > ConstantsSystem.Tables.NUMBER_OF_TABLES ) {
      hasErrorNumber({ message: 'El Número es muy grande.', error: true });
      setFormValid( false );
    } else {
      hasErrorNumber({ message: '', error: false });
    }
  }
  function validateCapacity() {
    if ( capacity === '' ) {
      hasErrorCapacity({ message: 'La capacidad es requerida.', error: true });
      setFormValid( false );
    } else if ( capacity <= 0 ) {
      hasErrorCapacity({ message: 'La capacidad debe ser mayor que 0.', error: true });
      setFormValid( false );
    } else if ( capacity > ConstantsSystem.Tables.CAPACITY_FOR_TABLE ) {
      hasErrorCapacity({ message: 'La capacidad es muy grande.', error: true });
      setFormValid( false );
    } else {
      hasErrorCapacity({ message: '', error: false });
    }
  }
  function validateType() {
    if ( type === '' ) {
      hasErrorType({ message: 'El rol es requerido.', error: true });
      setFormValid( false );
    } else {
      hasErrorType({ message: '', error: false });
    }
  }
  const handleSubmit = () => {
    Keyboard.dismiss();
    setFormValid( true );
    validatePhoto();
    validateType();
    validateNumber();
    validateCapacity();

    if ( formValid ) {
      const table = {
        type,
        photo,
        number,
        capacity
      };
      onSubmit( table );
    }
  };
  function takePhoto() {
    setCameraActivate( true );
  }
  function handleCamera( photoTaken ) {
    setPhoto( photoTaken );
    setCameraActivate( false );
  }

  return (
    <View>
      { cameraActivated ? (
        <View>
          <CamaraView onKeepPhoto={( photoTaken ) => handleCamera( photoTaken )} />
        </View>
      )
        : (
          <View style={Styles.container}>
            <ScrollView>
              <View style={Styles.containerForm}>
                {renderSpecificFormControl()}
              </View>
            </ScrollView>
            <TouchableOpacity style={Styles.button} onPress={() => handleSubmit()}>
              <Text style={Styles.buttonText}>Registrar Mesa</Text>
            </TouchableOpacity>
          </View>
        )}
    </View>
  );
}

