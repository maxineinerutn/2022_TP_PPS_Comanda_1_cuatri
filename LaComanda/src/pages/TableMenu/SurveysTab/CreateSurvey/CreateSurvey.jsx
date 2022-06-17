/* eslint-disable react/prop-types */
import {
  Image, ScrollView, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View, Keyboard
} from 'react-native';
import React, { useEffect, useState } from 'react';
import RadioButtons from 'react-native-radio-buttons';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import Slider from '@react-native-community/slider';
import { Select } from '@mobile-reality/react-native-select-pro';
import Styles from './styles';
import CamaraView from '../../../../components/CameraView/CamaraView';
import userImgDefault from '../../../../../assets/iconoCamara.png';
import theme from '../../../../config/theme';
import { ConstantsSystem } from '../../../../config/constantsSystem';

export default function CreateSurvey( props ) {
  const { onSubmit } = props;
  const [formValid, setFormValid] = useState( false );

  const [stayInThePlace, setStayInThePlace] = useState( 2 );
  const [errorStayInThePlace] = useState({ message: '', error: false });

  const [finishDish, setFinishDish] = useState( '' );
  const [errorFinishDish, hasErrorFinishDish] = useState({
    message: '',
    error: false
  });

  const [paymentMethod, setPaymentMethod] = useState( '' );
  const [errorPaymentMethod, hasErrorPaymentMethod] = useState({ message: '', error: false });

  const [whereDidYouMeetUs, setWhereDidYouMeetUs] = useState([]);
  const [errorWheredidYouMeetUs, hasErrorWheredidYouMeetUs] = useState({ message: '', error: false });

  const [suggestion, setsuggestion] = useState( '' );
  const [errorSuggestion, hasErrorSuggestion] = useState({ message: '', error: false });

  const [firstPhoto, setFirstPhoto] = useState( '' );

  const [secondPhoto, setSecondPhoto] = useState( '' );

  const [thirdPhoto, setThirdPhoto] = useState( '' );

  const [cameraActivated, setCameraActivate] = useState( false );
  const [numberPhotoTaken, setPhotoTaken] = useState( '' );

  useEffect(() => {
    if ( formValid ) {
      setFormValid( true );
      validateFinishDish();
      validatePaymentMethod();
      validateWhereDidYouMeetUs();
      validateSuggestion();
    }
  }, [stayInThePlace, finishDish, paymentMethod, whereDidYouMeetUs]);

  function renderSpecificFormControl() {
    const rangeOptions = ConstantsSystem.Survey.RANGE_OPTIONS;
    const radioOptions = ConstantsSystem.Survey.RADIO_OPTIONS;
    const selectOptions = ConstantsSystem.Survey.SELECT_OPTIONS;
    const checkOptions = ConstantsSystem.Survey.CHECKS_OPTIONS;

    return (
      <>
        <View style={Styles.containerPhotos}>
          <View style={Styles.formControlPhoto}>
            <TouchableWithoutFeedback onPress={() => takePhoto( 1 )}>
              {firstPhoto === '' ? (
                <Image
                  style={Styles.formControlPhotoWithoutPhoto}
                  source={userImgDefault}
                  resizeMode='center'
                />
              ) : (
                <Image
                  style={Styles.formControlPhotoWithPhoto}
                  source={{ uri: firstPhoto }}
                  resizeMode='center'
                />
              )}
            </TouchableWithoutFeedback>
          </View>
          <View style={Styles.formControlPhoto}>
            <TouchableWithoutFeedback onPress={() => takePhoto( 2 )}>
              {secondPhoto === '' ? (
                <Image
                  style={Styles.formControlPhotoWithoutPhoto}
                  source={userImgDefault}
                  resizeMode='center'
                />
              ) : (
                <Image
                  style={Styles.formControlPhotoWithPhoto}
                  source={{ uri: secondPhoto }}
                  resizeMode='center'
                />
              )}
            </TouchableWithoutFeedback>
          </View>
          <View style={Styles.formControlPhoto}>
            <TouchableWithoutFeedback onPress={() => takePhoto( 3 )}>
              {thirdPhoto === '' ? (
                <Image
                  style={Styles.formControlPhotoWithoutPhoto}
                  source={userImgDefault}
                  resizeMode='center'
                />
              ) : (
                <Image
                  style={Styles.formControlPhotoWithPhoto}
                  source={{ uri: thirdPhoto }}
                  resizeMode='center'
                />
              )}
            </TouchableWithoutFeedback>
          </View>
        </View>
        {/* Range */}
        <View style={Styles.formControlRange}>
          <Text style={Styles.labelFormControl}>¿Cómo fue tu estadía en el lugar?</Text>
          <Text style={Styles.labelFormControl}>{rangeOptions[stayInThePlace]}</Text>
          <Slider
            style={{ width: 380, height: 60 }}
            thumbTintColor={theme.colors.primary}
            minimumValue={0}
            maximumValue={4}
            minimumTrackTintColor='#FFFFFF'
            maximumTrackTintColor='#000000'
            step={1}
            onValueChange={( value ) => setStayInThePlace( value )}
            value={stayInThePlace}
          />
          {errorStayInThePlace.error && (
            <Text style={Styles.textError}>{errorStayInThePlace.message}</Text>
          )}
        </View>
        {/* Radios */}
        <View>
          <Text style={Styles.labelFormControl}>¿Pudo terminar el plato?</Text>
          <RadioButtons
            options={radioOptions}
            onSelection={( option ) => setFinishDish( option )}
            selectedOption={finishDish}
            renderOption={renderOption}
            renderContainer={renderContainer}
          />
          {errorFinishDish.error && (
            <Text style={Styles.textErrorRadioButton}>{errorFinishDish.message}</Text>
          )}
        </View>
        {/* Select */}
        <View>
          <Text style={Styles.labelFormControl}>¿Cúal es tu método de pago favorito?</Text>
          <Select
            options={selectOptions}
            onSelect={( value ) => setPaymentMethod( value )}
            placeholderText='Seleccione un método de pago'
            selectControlStyle={{ borderColor: theme.colors.primary, borderWidth: 3 }}
            selectControlArrowImageStyle={{ tintColor: theme.colors.primary }}
          />
          {errorPaymentMethod.error && (
            <Text style={Styles.textError}>{errorPaymentMethod.message}</Text>
          )}
        </View>
        {/* Checkbox */}
        <View>
          <Text style={Styles.labelFormControl}>¿Cómo nos conociste?</Text>
          {checkOptions.map(( option ) => (
            <BouncyCheckbox
              key={option}
              size={25}
              fillColor={theme.colors.primary}
              unfillColor='#FFFFFF'
              text={option}
              iconStyle={{ borderColor: theme.colors.primary, marginBottom: 5 }}
              textStyle={{ }}
              onPress={( isChecked ) => {
                if ( isChecked ) {
                  whereDidYouMeetUs.push( option );
                } else {
                  setWhereDidYouMeetUs( whereDidYouMeetUs.filter(( item ) => item !== option ));
                }
              }}
            />
          ))}
          {errorWheredidYouMeetUs.error && (
            <Text style={Styles.textError}>{errorWheredidYouMeetUs.message}</Text>
          )}
        </View>
        {/* TextBox */}
        <View>
          <Text style={Styles.labelFormControl}>¿Te gustaría dejarnos una sugerencia?</Text>
          <TextInput
            style={Styles.formControl}
            placeholder='Podes dejarnos una Sugerencia'
            value={suggestion}
            onChangeText={( text ) => setsuggestion( text )}
            onBlur={() => validateSuggestion()}
          />
          {errorSuggestion.error && (
            <Text style={Styles.textError}>{errorSuggestion.message}</Text>
          )}
        </View>
      </>
    );
  }

  function validateWhereDidYouMeetUs() {
    if ( whereDidYouMeetUs.length === 0 ) {
      hasErrorWheredidYouMeetUs({ message: 'Debe elegir una opcion como mínimo', error: true });
      setFormValid( false );
    } else {
      hasErrorWheredidYouMeetUs({ message: '', error: false });
    }
  }
  function validateSuggestion() {
    if ( whereDidYouMeetUs.length > 250 ) {
      hasErrorSuggestion({ message: 'Debe ingresar menos de 250 caracteres', error: true });
      setFormValid( false );
    } else {
      hasErrorSuggestion({ message: '', error: false });
    }
  }
  function validateFinishDish() {
    if ( finishDish === '' || finishDish.length <= 0 ) {
      hasErrorFinishDish({ message: 'La respuesta es requerida.', error: true });
      setFormValid( false );
    } else {
      hasErrorFinishDish({ message: '', error: false });
    }
  }
  function validatePaymentMethod() {
    if ( paymentMethod === '' ) {
      hasErrorPaymentMethod({ message: 'El método de pago es requerido.', error: true });
      setFormValid( false );
    } else {
      hasErrorPaymentMethod({ message: '', error: false });
    }
  }

  const handleSubmit = () => {
    Keyboard.dismiss();
    setFormValid( true );
    validateWhereDidYouMeetUs();
    validatePaymentMethod();
    validateFinishDish();

    if ( formValid ) {
      const survey = {
        paymentMethod,
        whereDidYouMeetUs,
        stayInThePlace,
        finishDish,
        suggestion,
        firstPhoto,
        secondPhoto,
        thirdPhoto
      };
      console.log( survey );
      onSubmit( survey );
    }
  };
  function takePhoto( photo ) {
    setPhotoTaken( photo );
    setCameraActivate( true );
  }
  function handleCamera( photo ) {
    switch ( numberPhotoTaken ) {
      case 1:
        setFirstPhoto( photo );
        break;
      case 2:
        setSecondPhoto( photo );
        break;
      case 3:
        setThirdPhoto( photo );
        break;
      default:
        break;
    }
    setCameraActivate( false );
    setPhotoTaken( '' );
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
              <Text style={Styles.buttonText}>Completar Encuesta</Text>
            </TouchableOpacity>
          </View>
        )}
    </View>
  );
}

