import React, { useLayoutEffect } from "react";
import styles from "../employeeRegistration/StyleEmployeeRegistrationScreen";
import { ImageBackground, TouchableOpacity, View, Image, Text } from "react-native";
import { returnIcon, backgroundImage,  } from "../employeeRegistration/AssetsEmployeeRegistrationScreen";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const EmployeeRegistration = () => {

    //CONSTANTES
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    //RETURN
    const handleReturn = () => {
      navigation.replace("ControlPanelPropietario")
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
            <Text style={styles.headerText}>ALTA DE DUEÑO / SUPERVISOR</Text>
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

                    <Text>ALTA EMPLEADO</Text>
                
                </View>                
            </ImageBackground>           
        </View>
    );
};

export default EmployeeRegistration;