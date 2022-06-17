import { StyleSheet, Dimensions } from 'react-native';
import theme from '../../config/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  imageContainer: {
    position: 'absolute'
  },
  image: {
    width: Dimensions.get( 'screen' ).width,
    height: Dimensions.get( 'screen' ).height
  },
  names: {
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get( 'screen' ).width * 0.8,
    height: Dimensions.get( 'screen' ).height * 0.2
  },
  text: {
    textShadowRadius: 3,
    textShadowColor: theme.colors.primary,
    fontSize: 36,
    fontFamily: 'Roboto',
    fontWeight: '700'
  },
  appName: {
    width: Dimensions.get( 'screen' ).width * 0.8,
    right: -10
  },
  appTitle: {
    textAlign: 'center',
    fontSize: 50,
    fontFamily: 'Roboto',
    fontWeight: '800',
    textShadowRadius: 5,
    textShadowColor: theme.colors.primary
  },
  gifContainer: {
    position: 'relative',
    marginTop: 45
  },
  gif: {
    width: 250,
    height: 250
  }
});
