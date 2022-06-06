import { StyleSheet, Dimensions } from 'react-native';
import theme from '../../config/theme';
// import { Constants } from 'expo-constants';

const Styles = StyleSheet.create({
  container: {
    flex: 1
  },
  camera: {
    width: Dimensions.get( 'screen' ).width,
    height: Dimensions.get( 'screen' ).height * 0.7
  },
  hideCamera: {
    display: 'none',
    width: 0,
    height: 0
  },
  buttonContainer: {
    width: Dimensions.get( 'screen' ).width,
    flexDirection: 'row',
    justifyContent: 'center',
    borderTopWidth: 4,
    borderTopColor: theme.colors.primary
  },
  button: {
    marginTop: 15,
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    height: Dimensions.get( 'screen' ).height * 0.05,
    width: Dimensions.get( 'screen' ).width * 0.4,
    borderRadius: 10,
    marginLeft: 5
  },
  buttonEliminar: {
    marginTop: 15,
    alignItems: 'center',
    backgroundColor: theme.colors.secondary,
    borderColor: theme.colors.primary,
    borderWidth: 2,
    height: Dimensions.get( 'screen' ).height * 0.05,
    width: Dimensions.get( 'screen' ).width * 0.4,
    borderRadius: 10,
    marginLeft: 5
  },
  changeCameraIcon: {
    alignItems: 'center',
    height: Dimensions.get( 'screen' ).height * 0.05,
    width: Dimensions.get( 'screen' ).width * 0.3
  },
  text: {
    fontSize: 24,
    fontWeight: '300',
    color: 'white',
    textAlign: 'center'
  },
  textEliminar: {
    fontSize: 24,
    fontWeight: '300',
    color: theme.colors.primary,
    textAlign: 'center'
  },
  spinnerContainer: {
    position: 'absolute',
    zIndex: 99,
    opacity: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%'
  },
  spinner: {
    width: '100%',
    height: '100%'
  }
});
export default Styles;
