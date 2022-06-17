import { StyleSheet, Dimensions } from 'react-native';
import theme from '../../config/theme';

export const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22
  },
  modalView: {
    margin: 20,
    height: Dimensions.get( 'screen' ).height * 0.6,
    width: Dimensions.get( 'screen' ).width * 0.9,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: 20,
    padding: 10,
    marginTop: 10,
    marginLeft: 10,
    color: theme.colors.secondary
  },
  buttonAsigned: {
    backgroundColor: theme.colors.icons,
    borderRadius: 20,
    padding: 10,
    marginTop: 10,
    color: theme.colors.secondary
  },
  buttonConfirm: {
    backgroundColor: theme.colors.primary
  },
  buttonClose: {
    backgroundColor: theme.colors.icons
  },
  textButton: {
    textAlign: 'center',
    fontSize: 20,
    color: theme.colors.secondary
  },
  textButtonAsigned: {
    textAlign: 'center',
    fontSize: 20,
    color: theme.colors.secondary
  },
  textStyle: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center'
  },
  container: {
    flex: 1,
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
    marginBottom: 15,
    marginTop: 10
  },
  tableCard: {
    width: Dimensions.get( 'screen' ).width * 0.7,
    height: Dimensions.get( 'screen' ).height * 0.2,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: theme.colors.primary,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    marginTop: 10
  },
  cardContainer: {
    width: Dimensions.get( 'screen' ).width * 0.95,
    height: Dimensions.get( 'screen' ).height,
    padding: 5
  },
  formControlPhoto: {
    borderColor: theme.colors.primary,
    width: Dimensions.get( 'screen' ).width * 0.5,
    height: Dimensions.get( 'screen' ).height * 0.2,
    borderRadius: 10,
    borderWidth: 4
  },
  formControlPhotoWithPhoto: {
    width: Dimensions.get( 'screen' ).width * 0.48,
    height: Dimensions.get( 'screen' ).height * 0.191
  },
  text: {
    fontWeight: '700',
    textAlign: 'center'
  },
  textName: {
    color: theme.colors.icons,
    fontWeight: '700',
    fontSize: 20
  },
  icon: {
    fontSize: 28,
    textAlign: 'center',
    marginTop: 10,
    borderColor: theme.colors.primary,
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: theme.colors.icons
  }
});

