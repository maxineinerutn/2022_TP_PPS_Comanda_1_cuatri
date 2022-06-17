import { StyleSheet, Dimensions } from 'react-native';
import theme from '../../../config/theme';

const Styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: Dimensions.get( 'screen' ).width,
    height: Dimensions.get( 'screen' ).height * 0.75,
    justifyContent: 'center'
  },
  containerSpinner: {
    flex: 1,
    alignItems: 'center',
    width: Dimensions.get( 'screen' ).width,
    height: Dimensions.get( 'screen' ).height,
    justifyContent: 'center'
  },
  containerChoose: {
    flex: 1,
    alignItems: 'center',
    width: Dimensions.get( 'screen' ).width,
    height: Dimensions.get( 'screen' ).height,
    justifyContent: 'center'
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 32
  },
  buttonTextSecondary: {
    color: theme.colors.icons,
    fontWeight: '700',
    fontSize: 38,
    textAlign: 'center',
    textDecorationColor: 'white',
    borderBottomColor: 'white',
    borderBottomWidth: 2,
    borderTopWidth: 2,
    borderTopColor: 'white',
    marginTop: 20
  },
  button: {
    backgroundColor: theme.colors.primary,
    width: Dimensions.get( 'window' ).width * 0.7,
    height: Dimensions.get( 'window' ).height * 0.35,
    marginTop: 15,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  spinner: {
    width: '100%',
    height: '100%'
  }
});
export default Styles;
