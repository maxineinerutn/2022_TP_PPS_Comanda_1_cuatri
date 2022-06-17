import { StyleSheet } from 'react-native';
import theme from '../../config/theme';

const styles = StyleSheet.create({
  card: {
    flex: 0.23,
    borderRadius: 10,
    borderBottomWidth: 3,
    borderColor: theme.colors.primary,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center'
  },
  title: {
    textAlign: 'left',
    borderColor: theme.colors.primary,
    fontSize: 28
  },
  smallTitle: { fontSize: 22 }
});
export default styles;
