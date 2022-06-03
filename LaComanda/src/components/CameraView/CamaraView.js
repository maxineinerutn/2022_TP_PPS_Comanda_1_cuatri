/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  ActivityIndicator
} from 'react-native';
import { Camera } from 'expo-camera';
import { manipulateAsync } from 'expo-image-manipulator';
import { useIsFocused } from '@react-navigation/native';
// import { guardarImagenStorage } from '../../services/StorageServices';
// import { guardarFotoEnCollection } from '../../services/FirestoreServices';
import { auth } from '../../../firebase';
import theme from '../../config/theme';
import Styles from './Styles';
import changeCameraIcon from '../../../assets/girar-camara.png';

export default function CamaraView( props ) {
  const { onKeepPhoto } = props;
  const [fotoTomada, setFotoTomada] = useState( false );
  const [hideCamara, setHideCamara] = useState( false );
  const [spinner, setSpinner] = useState( false );
  const [spinnerGuardado, setSpinnerGuardado] = useState( false );
  const [uriFotoSacadaPreview, setUriFotoSacadaPreview] = useState( null );
  const [hasPermission, setHasPermission] = useState( null );
  const [type, setType] = useState( Camera.Constants.Type.front );
  const isFocused = useIsFocused();
  const camaraRef = useRef();
  useEffect(() => {
    ( async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission( status === 'granted' );
    })();
  }, []);
  if ( hasPermission === null ) {
    return <View />;
  }
  if ( hasPermission === false ) {
    return <Text>No tengo acceso para usar la camara</Text>;
  }
  const snap = async () => {
    try {
      if ( camaraRef ) {
        const options = { quality: 1, skipProcessing: true };
        const foto = await camaraRef.current.takePictureAsync( options );
        setHideCamara( true );
        setSpinner( true );
        const { uri } = foto;
        const manipResult = await manipulateAsync(
          uri,
          [{ resize: { width: 1024, height: 1024 }}],
          { format: 'png' }
        );
        setUriFotoSacadaPreview( manipResult.uri );
        setFotoTomada( true );
      }
    } catch ( error ) {
      console.log( error );
    }
  };
  const resetearCamara = () => {
    setSpinnerGuardado( false );
    setSpinner( false );
    setHideCamara( false );
    setFotoTomada( false );
    setUriFotoSacadaPreview( null );
  };
  const keepPhoto = async () => {
    onKeepPhoto( uriFotoSacadaPreview );
    // try {
    //   setSpinnerGuardado( true );
    //   const blob = await ( await fetch( uriFotoSacadaPreview )).blob();
    //   const imgRefName = `relevamientoVisual/${auth.currentUser.email}/${tipoDeFoto}`;
    //   const { ref, docName } = await guardarImagenStorage( imgRefName, blob );
    //   const fotoStorage = await ref.getDownloadURL();
    //   const foto = {
    //     id: docName,
    //     email: auth.currentUser.email,
    //     fotoURL: { uri: fotoStorage },
    //     tipo: tipoDeFoto,
    //     fecha: new Date().toLocaleString(),
    //     votos: []
    //   };
    //   await guardarFotoEnCollection( 'relevamientoVisual', docName, foto );
    //   resetearCamara();
    // } catch ( error ) {
    //   console.log( `aca${error}` );
    // }
  };
  return (
    <View style={Styles.container}>
      {fotoTomada ? (
        <View style={Styles.container}>
          <Image
            source={{ uri: uriFotoSacadaPreview }}
            style={{
              width: Dimensions.get( 'screen' ).width,
              height: Dimensions.get( 'screen' ).height * 0.6
            }}
          />

          {spinnerGuardado ? (
            <View
              style={[
                Styles.container,
                { justifyContent: 'center', alignItems: 'center' }
              ]}
            >
              <ActivityIndicator size={180} color={theme.colors.details} />
            </View>
          ) : (
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: Dimensions.get( 'screen' ).width,
                marginBottom: 50
              }}
            >
              <TouchableOpacity
                style={Styles.buttonGuardar}
                onPress={() => keepPhoto()}
              >
                <Text style={Styles.text}> Guardar </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={Styles.button}
                onPress={() => resetearCamara()}
              >
                <Text style={Styles.text}> Eliminar Foto </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      ) : (
        <>
          {isFocused ? (
            <View style={{ flex: 1 }}>
              <View>
                <Camera
                  pictureSize=''
                  ref={camaraRef}
                  style={[Styles.camera, hideCamara && Styles.hideCamera]}
                  type={type}
                  ratio='1:1'
                />
                <View
                  style={[
                    Styles.buttonContainer,
                    hideCamara && Styles.hideCamera
                  ]}
                >
                  <TouchableOpacity
                    style={Styles.buttonSacarFoto}
                    onPress={() => snap()}
                  >
                    <Text style={Styles.text}> Sacar Foto </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={Styles.buttonSacarFoto}
                    onPress={() => setType( type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back )}
                  >
                    <Image source={changeCameraIcon} resizeMode='contain' style={Styles.changeCameraIcon} />
                  </TouchableOpacity>
                </View>
              </View>
              {spinner && (
                <View
                  style={[
                    Styles.container,
                    { justifyContent: 'center', alignItems: 'center' }
                  ]}
                >
                  <ActivityIndicator size={180} color={theme.colors.details} />
                </View>
              )}
            </View>
          ) : (
            <View style={Styles.container}>
              <ActivityIndicator size={180} color={theme.colors.details} />
            </View>
          )}
        </>
      )}
    </View>
  );
}
