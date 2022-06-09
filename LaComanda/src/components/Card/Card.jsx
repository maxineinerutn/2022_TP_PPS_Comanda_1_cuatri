/* eslint-disable react/prop-types */
import { View, Text } from 'react-native';
import React from 'react';
import styles from './styles';

export default function Card( props ) {
  const { text } = props;

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{text}</Text>
    </View>
  );
}
