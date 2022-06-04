import React, { useEffect, useLayoutEffect, useState } from "react";
import styles from "../clientPanel/StyleClientPanelScreen";
import { StyleSheet, ImageBackground, TouchableOpacity, View, Image, Text } from "react-native";
import { userIcon, backgroundImage, logoutIcon, qrIcon } from "../clientPanel/AssetsClientPanelScreen";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { auth, db } from "../../../App";
import { Camera } from "expo-camera";
import { BarCodeScanner } from "expo-barcode-scanner";
import Toast from 'react-native-simple-toast';
import { addDoc, collection } from "firebase/firestore";
import RotatingLogo from "../../rotatingLogo/RotatingLogo";
import Modal from "react-native-modal";



const ClientPanel = () => {

    //CONSTANTES
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const [scanned, setScanned] = useState(false);
    const [openQR, setOpenQR] = useState(false);
    const [isModalSpinnerVisible, setModalSpinnerVisible] = useState(false);

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
      const qrType = dataSplit[0];

      if(qrType === 'ingresoLocal'){
        addToWaitingList();
      }
      else {
        Toast.showWithGravity(
          "QR Eroneo. Debe ingresar a la lista de espera",
          Toast.LONG,
          Toast.CENTER);
      }


      console.log(qrType);


      //Si es entrada al local mandar push notification 
      //al metre avisandole que alguien entro(CECI)

    };

    //RUTEO A LA LISTA DE ESPERA
    const addToWaitingList = async () => {
      toggleSpinnerAlert();
      try {
        console.log(auth.currentUser?.email);
        //UPLOAD DATA
        await addDoc(collection(db, "waitingList"), {
          user:auth.currentUser?.email,
          status:'waiting',                       
        });
        Toast.showWithGravity(
          "INGRESO A LA LISTA DE ESPERA EXITOSO",
          Toast.LONG, 
          Toast.CENTER);
          navigation.replace("TableControlPanel");
      } catch (error:any) {
        Toast.showWithGravity(
          error.code,
          Toast.LONG, 
          Toast.CENTER);
      }  
    }

    //SPINNER
    const toggleSpinnerAlert = () => {
      setModalSpinnerVisible(true);
      setTimeout(() => {
        setModalSpinnerVisible(false);          
      }, 6000);
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

               <View>
                <Modal backdropOpacity={0.5} animationIn="rotate" animationOut="rotate" isVisible={isModalSpinnerVisible}>
                  <RotatingLogo></RotatingLogo>
                </Modal>
              </View> 

          </ImageBackground>           
      </View> : <BarCodeScanner
                  onBarCodeScanned={scanned && openQR ? undefined : handleBarCodeScanned}
                  style={StyleSheet.absoluteFillObject} />
    );
};

export default ClientPanel;