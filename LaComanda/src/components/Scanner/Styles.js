import { StyleSheet, Dimensions } from 'react-native';
import Constants from 'expo-constants';

const Styles = StyleSheet.create({
  container: {
    // backgroundColor: "black",
    flex: 1
    // width: Dimensions.get( 'screen' ).width,
    // height: Dimensions.get( 'screen' ).height
    // justifyContent: 'flex-start'
  },
  containerScanner: {
    // backgroundColor: "black",
    width: Dimensions.get( 'screen' ).width
    // height: Dimensions.get( 'screen' ).height * 0.8
  },
  wrapper: {
    // backgroundColor: "black",
    width: Dimensions.get( 'screen' ).width,
    height: Dimensions.get( 'screen' ).height * 0.83
  },
  bottomWrapper: {
    backgroundColor: '#212842',
    height: Dimensions.get( 'screen' ).height * 0.12
  },
  buttonContainer: {
    marginTop: Constants.statusBarHeight,
    // alignItems: 'flex-end',
    // justifyContent: "center",
    // backgroundColor: "#212842",
    height: Dimensions.get( 'screen' ).height * 0.3
  }
});
export default Styles;
