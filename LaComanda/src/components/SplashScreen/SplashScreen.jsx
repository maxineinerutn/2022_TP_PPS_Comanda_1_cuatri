import { Text, View, Image, ImageBackground } from "react-native";
import { useState, useEffect } from "react";
import React from "react";
import { styles } from './styles';

export default function SplashScreen() {
  const [showSpinner, setShowSpinner] = useState(false);
  useEffect(() => {
    setTimeout(() => {
        setShowSpinner(true);
    }, 1500);
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
          source={require("../../../assets/SplashS.png")}
          resizeMode='stretch'
        ></ImageBackground>

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
            source={require("../../../assets/gifplay.gif")}
          ></Image>
        </View>
      )}
      
    </View>
  );
}
