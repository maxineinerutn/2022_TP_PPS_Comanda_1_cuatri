import { Dimensions, StyleSheet } from 'react-native';
import theme from '../../config/theme';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Roboto',
    height: Dimensions.get( 'screen' ).height,
    width: Dimensions.get( 'screen' ).width
  },
  clientCard: {
    width: Dimensions.get( 'screen' ).width * 0.8,
    height: Dimensions.get( 'screen' ).height * 0.35,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: theme.colors.primary,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    marginBottom: 0
  },
  cardContainer: {
    width: Dimensions.get( 'screen' ).width * 0.90,
    height: Dimensions.get( 'screen' ).height,
    padding: 5
  },
  formControlPhoto: {
    borderColor: theme.colors.primary,
    width: Dimensions.get( 'screen' ).width * 0.7,
    height: Dimensions.get( 'screen' ).height * 0.2,
    borderRadius: 10,
    borderWidth: 4
  },
  formControlPhotoWithPhoto: {
    width: Dimensions.get( 'screen' ).width * 0.68,
    height: Dimensions.get( 'screen' ).height * 0.191
  },
  button: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontWeight: '700',
    textAlign: 'center'
  },
  textName: {
    color: theme.colors.icons,
    fontWeight: '700',
    fontSize: 20
  }

});
