import { StyleSheet, Dimensions } from 'react-native';
import theme from '../../../../config/theme';

const styles = StyleSheet.create({
  mainContainer: {
    width: Dimensions.get( 'screen' ).width * 0.95,
    flexDirection: 'row',
    padding: 10,
    marginTop: 10,
    marginLeft: 10,
    backgroundColor: '#fff',
    borderWidth: 3,
    borderColor: theme.colors.primary,
    borderRadius: 20
  },
  containerPhoto: {
    height: Dimensions.get( 'screen' ).height * 0.13
  },
  photo: {
    width: Dimensions.get( 'screen' ).width * 0.3,
    height: Dimensions.get( 'screen' ).height * 0.13,
    borderRadius: 20
  },
  containerInfo: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingLeft: 10,
    marginLeft: 10
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  description: {},
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'right',
    color: theme.colors.primary
  },
  containerCounter: {
    borderWidth: 1,
    borderRadius: 20,
    width: Dimensions.get( 'screen' ).width * 0.3,
    height: Dimensions.get( 'screen' ).height * 0.05,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  textCounter: {
    fontSize: 28
  },
  textAdd: {
    fontSize: 28,
    fontWeight: 'bold'
  },
  textRemove: {
    fontSize: 40,
    fontWeight: 'bold',
    marginTop: -10
  }
});
export default styles;
