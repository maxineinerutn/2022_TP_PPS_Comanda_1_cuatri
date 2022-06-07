import {
  Text, View, Image, ImageBackground
} from 'react-native';
import React from 'react';
import { styles } from './styles';
import SplashS from '../../../assets/splash.png';
import Gifplay from '../../../assets/gifplay.gif';

export default function SplashScreen() {
  return (
    <View
      style={styles.container}
    >
      <View
        style={styles.imageContainer}
      >
        <ImageBackground
          style={styles.image}
          source={SplashS}
          resizeMode='cover'
        />

      </View>

      <View style={styles.appName}>
        <Text style={styles.appTitle}>Coman-Da</Text>
      </View>

      <View style={styles.gifContainer}>
        <Image
          style={styles.gif}
          source={Gifplay}
        />
      </View>

      <View style={styles.names}>
        <Text style={styles.text}>Guido Clas</Text>
        <Text style={styles.text}>&</Text>
        <Text style={styles.text}>Lucas Barbosa</Text>
      </View>
    </View>
  );
}
