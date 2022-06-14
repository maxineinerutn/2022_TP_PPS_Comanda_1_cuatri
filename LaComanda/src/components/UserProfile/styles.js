import { StyleSheet, Dimensions } from 'react-native';
import theme from '../../config/theme';

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get( 'screen' ).height * 0.78,
    width: Dimensions.get( 'screen' ).width,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  formControl: {
    borderColor: theme.colors.primary,
    width: Dimensions.get( 'screen' ).width * 0.8,
    height: Dimensions.get( 'screen' ).height * 0.065,
    paddingVertical: Dimensions.get( 'screen' ).height * 0.01,
    paddingLeft: Dimensions.get( 'screen' ).width * 0.02,
    borderRadius: 10,
    borderWidth: 3,
    marginBottom: 25
  },
  formControlPhoto: {
    borderColor: theme.colors.primary,
    width: Dimensions.get( 'screen' ).width * 0.37,
    height: Dimensions.get( 'screen' ).height * 0.167,
    borderRadius: 10,
    borderWidth: 4,
    marginBottom: 10,
    marginTop: 5
  },
  formControlPhotoWithPhoto: {
    width: Dimensions.get( 'screen' ).width * 0.35,
    height: Dimensions.get( 'screen' ).height * 0.158,
    marginLeft: 0
  },
  cardContainer: {
    width: Dimensions.get( 'screen' ).width * 0.95,
    height: Dimensions.get( 'screen' ).height * 0.6
  }

});
export default styles;
