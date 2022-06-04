import { StyleSheet, Dimensions } from 'react-native';
import theme from '../../../config/theme';

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get( 'window' ).width,
    height: Dimensions.get( 'window' ).height
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 20
  },
  button: {
    backgroundColor: theme.colors.primary,
    width: Dimensions.get( 'window' ).width * 0.6,
    height: Dimensions.get( 'window' ).height * 0.2,
    marginTop: 15,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
export default Styles;
