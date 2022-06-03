import { StyleSheet, Dimensions } from 'react-native';
// import { Constants } from 'expo-constants';

const Styles = StyleSheet.create({
  container: {
    flex: 1
    // marginTop: Constants.statusBarHeight
  },
  camera: {
    width: Dimensions.get( 'screen' ).width,
    height: Dimensions.get( 'screen' ).height * 0.6
  },
  hideCamera: {
    display: 'none',
    width: 0,
    height: 0
  },
  buttonContainer: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 100
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'red',
    height: Dimensions.get( 'screen' ).height * 0.05,
    width: Dimensions.get( 'screen' ).width * 0.3,
    borderRadius: 10
  },
  buttonSacarFoto: {
    // alignSelf: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'red',
    height: Dimensions.get( 'screen' ).height * 0.05,
    width: Dimensions.get( 'screen' ).width * 0.3,
    borderRadius: 10
  },
  changeCameraIcon: {
    alignSelf: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get( 'screen' ).height * 0.05,
    width: Dimensions.get( 'screen' ).width * 0.3
  },
  text: {
    fontSize: 18,
    color: 'white'
  },
  buttonGuardar: {
    // alignSelf: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'green',
    height: Dimensions.get( 'screen' ).height * 0.05,
    width: Dimensions.get( 'screen' ).width * 0.3,
    borderRadius: 10
  }
});
export default Styles;
