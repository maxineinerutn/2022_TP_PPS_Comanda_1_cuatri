import React, { useLayoutEffect } from "react";
import styles from "../productRegistration/StyleProductRegistrationScreen";
import { ImageBackground, TouchableOpacity, View, Image, Text } from "react-native";
import { returnIcon, backgroundImage,  } from "../productRegistration/AssetsProductRegistrationScreen";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { auth } from "../../../App";

const ProductRegistration = () => {

    //CONSTANTES
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    //RETURN
    const handleReturn = () => {
      if(auth.currentUser?.email == "cincotenedorescocina@gmail.com"){
        navigation.replace("ControlPanelCocina")
      }
      if(auth.currentUser?.email == "cincotenedoresbar@gmail.com"){
        navigation.replace("ControlPanelBar")
      }
    }

    //HEADER
    useLayoutEffect(() => {
        navigation.setOptions({
          headerLeft: () => (
            <TouchableOpacity onPress={handleReturn}>
                <Image source={returnIcon} style={styles.headerIcon}/>
            </TouchableOpacity>
         ),
          headerTitle: () => (
            <Text style={styles.headerText}>ALTA DE PRODUCTO</Text>
          ),
          headerTintColor: "transparent",
          headerBackButtonMenuEnabled: false,
          headerStyle: {
            backgroundColor: 'rgba(61, 69, 68, 0.4);',
          },         
        });
      }, []);

    return (
        <View style={styles.container}>
            <ImageBackground source={backgroundImage} resizeMode="cover" style={styles.backgroundImage} imageStyle = {{opacity:0.5}}>
                <View style={styles.body}>

                    <Text>ALTA PRODUCTO</Text>
                    
                </View>                
            </ImageBackground>           
        </View>
    );
};

export default ProductRegistration;