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
  const [isModalTableVisible, setModalTableVisible] = useState(false);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [loadingTables, setLoadingTables] = useState(false);
  const [dataUsers, setDataUsers] = useState<any>([]); 
  const [dataTables, setDataTables] = useState<any>([]); 
  const [user, setUser] = useState<any>([]);

  //RETURN
  const handleReturn = () => {
    navigation.replace("ControlPanelMetre")
  }

  //REFRESH DE LA DATA
  useFocusEffect(
    useCallback(() => {
        getUsers();
        toggleSpinnerAlert();
  }, []))
  
  //TOOGLE SPINNER
  const toggleSpinnerAlert = () => {
    setModalSpinnerVisible(true);
    setTimeout(() => {
      setModalSpinnerVisible(false);
    }, 3000);
  };

  //GET DATA USUARIOS
  const getUsers = async () => {
    setLoadingUsers(true);    
    setDataUsers([]);    
    try {
      const q = query(collection(db, "waitingList"), where("status", "==", "waiting"));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (doc) => {
        const res: any = { ...doc.data(), id: doc.id };
        setDataUsers((arr: any) => [...arr, { ...res, id: doc.id}]);
      });
    } catch (error) {
        console.log(error)                    
    }finally{
        setLoadingUsers(false);
    }
  }

  //GET DATA MESAS
  const getTables = async () => {
    setLoadingTables(true);    
    setDataTables([]);    
    try {
      const q = query(collection(db, "tableInfo"), where("status", "==", "free"));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (doc) => {
        const res: any = { ...doc.data(), id: doc.id };
        setDataTables((arr: any) => [...arr, { ...res, id: doc.id}]);
      });
    } catch (error) {
        console.log(error)                    
    }finally{
      setLoadingTables(false);
    }
  }

  //SET ID PARA ASIGNAR A MESA
  const showAvailableTables = async (id) => {
    setUser(id);
    toggleModalTable();      
  }

  //ABRIR / CERRAR MODAL
  const toggleModalTable = () => {
    setModalTableVisible(!isModalTableVisible);
    toggleSpinnerAlert();
    getTables();
  }; 

  //ASIGNAR MESA A CLIENTE
  const handleTableReservation = async (id) => {
    try {
      const ref = doc(db, "tableInfo", id);
      const status =  'Assigned';
      await updateDoc(ref, {status:status});
      await updateDoc(ref, {assignedClient:user});
      getTables();
      toggleSpinnerAlert();
      setTimeout(() => {
        Toast.showWithGravity(
          "MESA ASIGNADA",
          Toast.LONG, 
          Toast.CENTER);
      }, 4000);      
    } catch (error) {
      console.log(error)
    } finally{
        setLoadingTables(false); 
        toggleModalTable();       
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
          <Text style={styles.headerText}>ADMINISTRAR LISTA DE ESPERA</Text>
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
      {loadingUsers}
      <ImageBackground source={backgroundImage} resizeMode="cover" style={styles.backgroundImage} imageStyle = {{opacity:0.5}}>
      
      <View style={styles.body}>
      <ScrollView>
          {dataUsers.map((item: { user: any;
                              id: string;}) => (               
            <View style={styles.cardStyle}>
              <View style={styles.infoContainer}>
                <Text style={styles.tableHeaderText}> CLIENTE: {item.user}</Text> 
                <TouchableOpacity onPress={() => showAvailableTables(item.user)} style={styles.buttonLayout}>
                  <Text style={styles.buttonText}>ASIGNAR MESA</Text> 
                </TouchableOpacity>
              </View> 
              
              <Modal backdropOpacity={0.5} isVisible={isModalTableVisible}>
                <View style={styles.modalContainer}> 
                  {loadingTables}
                  <View style={styles.modalBody}>
                  <View style={styles.modalIconContainer}>
                    <Text style={styles.buttonText}>MESAS DISPONIBLES</Text>
                      <TouchableOpacity  onPress={toggleModalTable} >
                        <Image source={cancelIcon} style={styles.cardIcon} />
                      </TouchableOpacity>
                    </View>

                    <ScrollView>
                    {dataTables.map((item: { tableNumber: any;
                                        id: string;}) => (               
                      <View style={styles.modalIconContainer}>
                          <Text style={styles.tableHeaderText}> MESA: {item.tableNumber}</Text>
                          <TouchableOpacity onPress={() => handleTableReservation(item.id)} style={styles.buttonLayout}>
                            <Text style={styles.buttonText}>ASIGNAR MESA</Text> 
                          </TouchableOpacity>
                        </View>
                        ))}
                      </ScrollView>                       
                   </View>
                </View>
              </Modal>              
            </View>              
          ))}
        </ScrollView> 

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