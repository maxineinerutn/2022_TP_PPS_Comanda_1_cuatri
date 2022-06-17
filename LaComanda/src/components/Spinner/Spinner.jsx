/* eslint-disable react/prop-types */
import {
  ActivityIndicator, View
} from 'react-native';
import React from 'react';
import theme from '../../config/theme';

export default function Spinner( props ) {
  const { styles } = props;
  return (
    <View style={styles}>
      <ActivityIndicator size={180} color={theme.colors.primary} />
    </View>
  );
}

