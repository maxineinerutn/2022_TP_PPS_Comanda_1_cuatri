import React, { useEffect, useLayoutEffect, useState } from "react";
import styles from "../tablePanel/StyleTablePanelScreen";
import { StyleSheet, ImageBackground, TouchableOpacity, View, Image, Text } from "react-native";
import { backgroundImage, logoutIcon, qrIcon, tableIcon } from "../tablePanel/AssetsTablePanelScreen";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { auth, db } from "../../../App";
import { Camera } from "expo-camera";
import { BarCodeScanner } from "expo-barcode-scanner";
import Toast from 'react-native-simple-toast';
import { collection, getDocs, query, where } from "firebase/firestore";


const TablePanel = () => {

    //CONSTANTES
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const [scanned, setScanned] = useState(false);
    const [openQR, setOpenQR] = useState(false);
    const [tableNumber, setTableNumber] = useState('');
    const [assignedTable, setAssignedTable] = useState(false);

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
    const handleBarCodeScanned = async ({ data }) => {
      setScanned(true);
      setOpenQR(false);
      const dataSplit = data.split('@');
      const qrType = dataSplit[0];
      const tableNumberQR = dataSplit[1];
      console.log(qrType);
      console.log(tableNumberQR);
      //MANEJO QR MESA
      if(qrType === 'mesa'){
        const query1 = query(collection(db, "tableInfo"), where("assignedClient", "==", auth.currentUser?.email), where("tableNumber", "==", tableNumberQR));
        const querySnapshot1 = await getDocs(query1);
        if(querySnapshot1.size > 0){
          setTableNumber(tableNumberQR);
          setAssignedTable(true);
        }
        else {
          Toast.showWithGravity(
            "TODAVIA NO SE LE ASIGNO MESA O NO ESCANEO UN QR DE MESA",
            Toast.LONG,
            Toast.CENTER);
        } 
      }
      else {
        Toast.showWithGravity(
          "NO ES UN QR DE MESA",
          Toast.LONG,
          Toast.CENTER);
      }


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
                <Image source={tableIcon} style={styles.headerIcon} />
             ),
          headerTitle: () => (
            <Text style={styles.headerText}>MESA</Text>
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

                <View style={styles.rowContainer}>
                  
                    {!assignedTable ?
                    (
                      <View style={styles.buttonLayout}>
                        <Text style={styles.buttonText}>ESCANEE EL CODIGO QR</Text>
                        <Text style={styles.buttonText}>PARA INGRESAR A SU MESA</Text>
                      </View>)
                    :
                    (<View style={styles.buttonLayout}>
                      <Text style={styles.buttonText}>MESA NUMERO {tableNumber}</Text>
                    </View>)}

                  <TouchableOpacity onPress={handleOpenQR}>
                    <Image style={styles.qrIcon} resizeMode="cover" source={qrIcon} />
                  </TouchableOpacity>
                </View>


                
              </View>                
          </ImageBackground>           
      </View> : <BarCodeScanner
                  onBarCodeScanned={scanned && openQR ? undefined : handleBarCodeScanned}
                  style={StyleSheet.absoluteFillObject} />
    );
};

export default TablePanel;