import { StyleSheet, Dimensions } from 'react-native';
import theme from '../../config/theme';

const Styles = StyleSheet.create({
  container: {
    // backgroundColor: "green",
    height: Dimensions.get( 'screen' ).height * 0.8,
    width: Dimensions.get( 'screen' ).width,
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  containerForm: {
    height: Dimensions.get( 'screen' ).height * 0.9,
    width: Dimensions.get( 'screen' ).width,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  formControl: {
    borderColor: theme.colors.primary,
    width: Dimensions.get( 'screen' ).width * 0.7,
    height: Dimensions.get( 'screen' ).height * 0.05,
    paddingVertical: Dimensions.get( 'screen' ).height * 0.01,
    paddingLeft: Dimensions.get( 'screen' ).width * 0.02,
    borderRadius: 10,
    borderWidth: 4,
    marginBottom: 25
  },
  formControlPhoto: {
    borderColor: theme.colors.primary,
    width: Dimensions.get( 'screen' ).width * 0.37,
    height: Dimensions.get( 'screen' ).height * 0.167,
    // paddingVertical: Dimensions.get( 'screen' ).height * 0.01,
    // paddingLeft: Dimensions.get( 'screen' ).width * 0.04,
    borderRadius: 10,
    borderWidth: 4,
    marginBottom: 40
  },
  formControlPhotoWithoutPhoto: {
    width: Dimensions.get( 'screen' ).width * 0.32,
    height: Dimensions.get( 'screen' ).height * 0.16,
    marginLeft: 6
  },
  formControlPhotoWithPhoto: {
    width: Dimensions.get( 'screen' ).width * 0.35,
    height: Dimensions.get( 'screen' ).height * 0.158,
    marginLeft: 0
  },
  textError: {
    top: 15,
    position: 'relative',
    color: theme.colors.error
  },
  textRadioButtonSelected: {
    fontWeight: 'bold'
  },
  containerRadioButton: {
    width: Dimensions.get( 'screen' ).width * 0.7,
    // height: Dimensions.get("screen").height * 0.5,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignContent: 'center'
  },
  radioBtn: {
    width: Dimensions.get( 'screen' ).width * 0.3,
    height: Dimensions.get( 'screen' ).height * 0.05,
    paddingVertical: Dimensions.get( 'screen' ).height * 0.01,
    paddingLeft: Dimensions.get( 'screen' ).width * 0.01,
    borderColor: theme.colors.primary,
    borderWidth: 3,
    borderRadius: 20,
    marginBottom: 10,
    marginLeft: 5
  },
  radioBtnSelected: {
    backgroundColor: theme.colors.primary
  },
  textErrorRadioButton: {
    marginLeft: 12,
    position: 'relative',
    color: theme.colors.error
  },
  containerActionButtons: {
    width: Dimensions.get( 'screen' ).width * 0.7,
    // height: Dimensions.get( 'screen' ).height * 0.5,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    alignContent: 'center',
    marginBottom: 15
  },
  buttonCancelRegistration: {
    margin: 0,
    padding: 0,
    justifyContent: 'flex-start',
    alignSelf: 'flex-end'
  }
});
export default Styles;
