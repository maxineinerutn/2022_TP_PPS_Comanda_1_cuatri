import { Dimensions, StyleSheet } from 'react-native';
import theme from '../../../config/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Roboto'
  },
  formContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get( 'window' ).width,
    height: Dimensions.get( 'window' ).height,
    backgroundColor: theme.colors.secondary
  },
  inputContainer: {
    width: Dimensions.get( 'window' ).width * 0.9,
    height: Dimensions.get( 'window' ).height * 0.65,
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Roboto'
  },
  input: {
    width: Dimensions.get( 'window' ).width * 0.9,
    color: 'black',
    fontSize: 20,
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderRadius: 10,
    marginTop: 25,
    paddingTop: 25,
    borderColor: theme.colors.primary,
    borderWidth: 3,
    fontFamily: 'Roboto'
  },
  buttonContainer: {
    width: Dimensions.get( 'window' ).width * 0.8,
    height: Dimensions.get( 'window' ).height * 0.25,
    paddingBottom: 50,
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Roboto'
  },
  button: {
    backgroundColor: theme.colors.primary,
    width: '100%',
    height: '60%',
    marginTop: 15,
    borderRadius: 15,
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 20
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#e09e31',
    borderWidth: 2
  },
  buttonOutlineText: {
    color: '#e09e31',
    fontWeight: '700',
    fontSize: 16
  },
  error: {
    color: 'red',
    padding: 5,
    marginLeft: 5
  },
  success: {
    color: 'green',
    padding: 5,
    marginLeft: 5
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
  },
  text: {
    color: 'black',
    height: 20,
    fontWeight: '700'
  },
  containerTouchable: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get( 'window' ).width,
    height: Dimensions.get( 'window' ).height * 0.15
  },
  buttonAux: {
    backgroundColor: 'rgba(256,256,256,0.5)',
    width: Dimensions.get( 'window' ).width / 2.95,
    height: Dimensions.get( 'window' ).height * 0.2,
    borderWidth: 2,
    borderRadius: 0,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonAuxText: {
    bottom: 25,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'black',
    fontWeight: '700',
    fontSize: 20
  }
});
