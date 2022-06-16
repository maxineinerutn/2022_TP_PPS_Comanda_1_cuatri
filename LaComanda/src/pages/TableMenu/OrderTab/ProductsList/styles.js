import { StyleSheet } from 'react-native';
import theme from '../../../../config/theme';

const styles = StyleSheet.create({
  container: {
    height: '100%'
  },
  estimatedTimeText: {
    textAlign: 'center',
    fontSize: 23
  },
  containerOrderButton: {
    width: '70%',
    height: '10%',
    position: 'absolute',
    bottom: 0
  },
  orderButton: {
    paddingVertical: 15,
    backgroundColor: theme.colors.success,
    marginBottom: 10,
    marginLeft: 10,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  orderButtonText: {
    color: 'white',
    fontSize: 20,
    marginLeft: 15
  },
  orderTotalPriceButtonText: {
    color: 'white',
    fontSize: 20,
    marginRight: 15
  },
  containerChatIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: theme.colors.details,
    borderRadius: 50,
    padding: 10,
    marginBottom: 10,
    marginRight: 10
  }
});
export default styles;
