
import { StyleSheet, Dimensions } from 'react-native';
import theme from '../../config/theme';

const Styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  text: {
    fontSize: 24,
    fontWeight: '300',
    color: 'white',
    textAlign: 'center'
  },
  button: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    height: Dimensions.get( 'screen' ).height * 0.1,
    width: Dimensions.get( 'screen' ).width * 0.6,
    borderRadius: 10,
    marginLeft: 5
  }
});
export default Styles;

