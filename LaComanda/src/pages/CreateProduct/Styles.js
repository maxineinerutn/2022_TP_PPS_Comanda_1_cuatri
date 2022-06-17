import { StyleSheet, Dimensions } from 'react-native';
import Constants from 'expo-constants';

const Styles = StyleSheet.create({
  container: { flex: 1, marginTop: Constants.statusBarHeight },
  spinner: {
    width: '100%',
    height: '100%'
  },
  containerSpinner: {
    flex: 1,
    alignItems: 'center',
    width: Dimensions.get( 'screen' ).width,
    height: Dimensions.get( 'screen' ).height,
    justifyContent: 'center'
  }
});
export default Styles;
