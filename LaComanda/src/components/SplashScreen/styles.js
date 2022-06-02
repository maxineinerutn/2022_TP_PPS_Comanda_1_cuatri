import { StyleSheet, Dimensions } from 'react-native';

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
    position: 'absolute',
    top: -280
  },
  text: {
    fontSize: 26,
    fontFamily: 'Roboto'
  },
  appName: {
    position: 'absolute',
    top: -180,
    width: 300
  },
  appTitle: {
    textAlign: 'center',
    fontSize: 50,
    fontFamily: 'Roboto',
    fontWeight: 'bold'
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
