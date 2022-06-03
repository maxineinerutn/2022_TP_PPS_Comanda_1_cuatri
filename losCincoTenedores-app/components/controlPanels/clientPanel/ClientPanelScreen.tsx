import React, { useEffect, useLayoutEffect, useState } from "react";
import styles from "../clientPanel/StyleClientPanelScreen";
import { StyleSheet, ImageBackground, TouchableOpacity, View, Image, Text } from "react-native";
import { userIcon, backgroundImage, logoutIcon, qrIcon } from "../clientPanel/AssetsClientPanelScreen";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { auth } from "../../../App";
import { Camera } from "expo-camera";
import { BarCodeScanner } from "expo-barcode-scanner";
import * as ImagePicker from "expo-image-picker";

const ClientPanel = () => {

    //CONSTANTES
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const [scanned, setScanned] = useState(false);
    const [openQR, setOpenQR] = useState(false);

    //LOGOUT
    const handleLogout = () => {
        auth
          .signOut()
          .then(() => {
            navigation.replace("Login")
          })
          .catch(error => alert(error.message))
    }

     //PERMISOS CAMARA
     useEffect(() => {
      (async () => {
          await Camera.requestCameraPermissionsAsync();
          await BarCodeScanner.requestPermissionsAsync();
      })();
    }, [])

    //COMPLETADO DEL FORM A PARTIR DEL QR
    const handleBarCodeScanned = ({ data }) => {
      setScanned(true);
      setOpenQR(false);
      const dataSplit = data.split('@');
      ///Sacar de aca con el data split primero que tipo de qr es
      // y decidir si es mesa, alta, etc que hacer a partir de ahi

      //Si es entrada al local mandar push notification 
      //al metre avisandole que alguien entro(CECI)

    };

    //MANEJADOR DEL QR Y CAMARA
    const handleOpenQR = () => {
      setScanned(false);
      setOpenQR(true);
    } 
        
    
    //HEADER
    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <Image source={userIcon} style={styles.headerIcon} />
             ),
          headerTitle: () => (
            <Text style={styles.headerText}>CLIENTE</Text>
          ),
          headerTintColor: "transparent",
          headerBackButtonMenuEnabled: false,
          headerStyle: {
            backgroundColor: 'rgba(61, 69, 68, 0.4);',
          },
          headerRight: () => (
            <TouchableOpacity onPress={handleLogout}>
                <Image source={logoutIcon} style={styles.headerIcon}/>
            </TouchableOpacity>
         )
        });
      }, []);

    
    return (
      !openQR ?
      <View style={styles.container}>
          <ImageBackground source={backgroundImage} resizeMode="cover" style={styles.backgroundImage} imageStyle = {{opacity:0.5}}>
              <View style={styles.body}>
                <TouchableOpacity onPress={handleOpenQR}>
                  <Image style={styles.qrIcon} resizeMode="cover" source={qrIcon} />
                </TouchableOpacity>

                <View style={styles.buttonLayout}>
                  <Text style={styles.buttonText}>ESCANEE EL CODIGO QR</Text>
                  <Text style={styles.buttonText}>PARA INGRESAR AL LOCAL</Text>
                </View>
              </View>                
          </ImageBackground>           
      </View> : <BarCodeScanner
                  onBarCodeScanned={scanned && openQR ? undefined : handleBarCodeScanned}
                  style={StyleSheet.absoluteFillObject} />
    );
};

export default ClientPanel;