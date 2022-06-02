import {
  Text, View, Image, ImageBackground
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { styles } from './styles';
import SplashS from '../../../assets/SplashS.png';
import Gifplay from '../../../assets/gifplay.gif';

export default function SplashScreen() {
  const [showSpinner, setShowSpinner] = useState( false );
  useEffect(() => {
    setTimeout(() => {
      setShowSpinner( true );
    }, 1500 );
  }, []);

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
          resizeMode='stretch'
        />

      </View>

      <View style={styles.names}>
        <Text style={styles.text}>Guido Clas</Text>
      </View>

      <View style={styles.appName}>
        <Text style={styles.appTitle}>Chateando</Text>
      </View>

      {showSpinner && (
        <View style={styles.gifContainer}>
          <Image
            style={styles.gif}
            source={Gifplay}
          />
        </View>
      )}

    </View>
  );
}
