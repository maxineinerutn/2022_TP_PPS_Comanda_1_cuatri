import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import styles from "./StyleClientManagmentScreen";
import { Image, ImageBackground, Text, TextInput, TouchableOpacity, View, StyleSheet, ScrollView } from "react-native";
import { returnIcon, backgroundImage } from "./AssetsClientManagmentScreen";
import Modal from "react-native-modal";
import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import RotatingLogo from "../../rotatingLogo/RotatingLogo";
import { db, storage } from "../../../App";
import { collection, query, where, getDocs } from "firebase/firestore";
import { getDownloadURL, ref } from 'firebase/storage'
import { format } from 'date-fns'



const ClientManagment = () => {

  //CONSTANTES
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [isModalSpinnerVisible, setModalSpinnerVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>([]);

  //RETURN
  const handleReturn = () => {
    navigation.replace("ControlPanelPropietario")
  }

  //REFRESH DE LA DATA
  useFocusEffect(
    useCallback(() => {
        getDocuments();
        toggleSpinnerAlert();
  }, []))

  //SPINNER
  const toggleSpinnerAlert = () => {
    setModalSpinnerVisible(true);
    setTimeout(() => {
      setModalSpinnerVisible(false);
    }, 3000);
  };

  //GET DATA
  const getDocuments = async () => {
    setLoading(true);
    
    setData([]);
    
    try {
      const q = query(collection(db, "userInfo"), where("clientStatus", "==", "Pending"));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (doc) => {
        const res: any = { ...doc.data(), id: doc.id };
        const imageUrl = await getDownloadURL(ref(storage, res.image));
        setData((arr: any) => [...arr, { ...res, id: doc.id, imageUrl: imageUrl}].sort((a, b) => (a.creationDate < b.creationDate ? 1 : a.creationDate > b.creationDate ? -1 : 0)));
      });
    } catch (error) {
        console.log(error)                    
    }finally{
        setLoading(false);
    }
    console.log(data.length);        
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
          <Text style={styles.headerText}>ALTA NUEVOS CLIENTES</Text>
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
        {loading}
        <ImageBackground source={backgroundImage} resizeMode="cover" style={styles.backgroundImage} imageStyle = {{opacity:0.5}}>
        
        <View style={styles.body}>
          <ScrollView>
            {data.map((item: { imageUrl: any;
                               email: any;       
                               name: any; 
                               lastName: any; 
                               dni: any;
                               creationDate: {toDate: () => Date; }; votes: string | any[]; voted: any; id: string;}) => (               
              <View style={styles.cardStyle}>
                  <Image style={styles.cardImage} resizeMode="cover" source={{ uri: item.imageUrl }} />
                <View>      
                  <Text style={styles.tableHeaderText}>-----------------------------------------------------</Text>                      
                  <Text style={styles.tableHeaderText}>CORREO: {item.email}</Text> 
                  <Text style={styles.tableCellText}>NOMBRE: {item.name}</Text>
                  <Text style={styles.tableCellText}>APELLIDO: {item.lastName}</Text>
                  <Text style={styles.tableCellText}>DNI: {item.dni}</Text>
                  <Text style={styles.tableCellText}>CREACIÓN: {format(item.creationDate.toDate(), 'dd/MM/yyyy HH:mm:ss')} hs</Text>
                </View>
              </View>
            ))}
          </ScrollView> 
        </View> 

        <View>
          <Modal backdropOpacity={0} animationIn="rotate" animationOut="rotate" isVisible={isModalSpinnerVisible}>
            <RotatingLogo></RotatingLogo>
          </Modal>
        </View> 

        </ImageBackground>           
    </View> 
  );
};

export default ClientManagment;