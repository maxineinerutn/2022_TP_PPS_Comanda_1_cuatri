import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import styles from "../waitingListManagment/StyleWaitingListManagmentScreen";
import { Image, ImageBackground, Text, TouchableOpacity, View, ScrollView, TextInput, Alert } from "react-native";
import { returnIcon, backgroundImage, confirmIcon, cancelIcon } from "./AssetsWaitingListManagmentScreen";
import Modal from "react-native-modal";
import React, { useCallback, useLayoutEffect, useState } from 'react'
import RotatingLogo from "../../rotatingLogo/RotatingLogo";
import { db, storage } from "../../../App";
import { collection, query, where, getDocs, updateDoc, doc } from "firebase/firestore";
import { getDownloadURL, ref } from 'firebase/storage'
import { format } from 'date-fns'
import Toast from 'react-native-simple-toast';
import emailjs from '@emailjs/browser';

const WaitingListManagment = () => {

  //CONSTANTES
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [isModalSpinnerVisible, setModalSpinnerVisible] = useState(false);
  

  //RETURN
  const handleReturn = () => {
    navigation.replace("ControlPanelMetre")
  }

  
  //TOOGLE SPINNER
  const toggleSpinnerAlert = () => {
    setModalSpinnerVisible(true);
    setTimeout(() => {
      setModalSpinnerVisible(false);
    }, 3000);
  };

  //TOOGLE CANCEL USER
  

  //HEADER
  useLayoutEffect(() => {
      navigation.setOptions({
        headerLeft: () => (
          <TouchableOpacity onPress={handleReturn}>
              <Image source={returnIcon} style={styles.headerIcon}/>
          </TouchableOpacity>
        ),
        headerTitle: () => (
          <Text style={styles.headerText}>ADMINSITRAR LISTA DE ESPERA</Text>
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
          
                <Text> LISTA DE ESPERA</Text>
 
        </View> 

        <View>
          <Modal backdropOpacity={0.5} animationIn="rotate" animationOut="rotate" isVisible={isModalSpinnerVisible}>
            <RotatingLogo></RotatingLogo>
          </Modal>
        </View>
        
        </ImageBackground>           
    </View> 
  );
};

export default WaitingListManagment;