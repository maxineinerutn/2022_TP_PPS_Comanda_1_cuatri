import React, { useLayoutEffect } from "react";
import styles from "../adminRegistration/StyleAdminRegistrationScreen";
import { ImageBackground, TouchableOpacity, View, Image, Text } from "react-native";
import { returnIcon, backgroundImage,  } from "../adminRegistration/AssetsAdminRegistrationScreen";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { auth } from "../../../App";

const ClientRegistration = () => {

    //CONSTANTES
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    //RETURN
    const handleReturn = () => {
      if(auth.currentUser == null){
        navigation.replace("Login")
      }else{
        navigation.replace("ControlPanelMetre")
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
            <Text style={styles.headerText}>ALTA DE CLIENTE</Text>
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

                    <Text>ALTA CLIENTE</Text>
                    
                </View>                
            </ImageBackground>           
        </View>
    );
};

export default ClientRegistration;