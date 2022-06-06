import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import styles from "./StyleClientSurveyScreen";
import { Image, ImageBackground, Text, TouchableOpacity, View, ScrollView } from "react-native";
import { returnIcon, backgroundImage, cancelIcon } from "./AssetsClientSurveyScreen";
import Modal from "react-native-modal";
import React, { useCallback, useLayoutEffect, useState } from 'react'
import RotatingLogo from "../../rotatingLogo/RotatingLogo";
import { useForm } from "react-hook-form";
import Toast from 'react-native-simple-toast';
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../App";

//IMPORTS DEL FORM
import Slider from '@react-native-community/slider';



type NewSurvey = {
  waiterEvaluation: string;
  payMethod: string;
  foodQuality: string;
  placeEvaluation: string;
  personalComments: string;
}

const NewClientSurvey = () => {

  //CONSTANTES
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [isModalSpinnerVisible, setModalSpinnerVisible] = useState(false);
  const {getValues, formState:{}, reset, setValue} = useForm<NewSurvey>();
  const [loading, setLoading] = useState(false);





  //RETURN
  const handleReturn = () => {
    navigation.replace("TableControlPanel")
  }

  //TOOGLE SPINNER
  const toggleSpinnerAlert = () => {
    setModalSpinnerVisible(true);
    setTimeout(() => {
      setModalSpinnerVisible(false);
    }, 3000);
  }; 

  //SUBMIT DEL FORM
  const onSubmit = async () => {
    const values=getValues();
    console.log(values);
    let error=false;

    //VALIDACION CAMPOS
    Object.values(values).map(value=>{
      if(!value){
        error=true;
        return;
      }
    })
    setLoading(true)
    toggleSpinnerAlert();
    try {
      
      //UPLOAD DATA
      await addDoc(collection(db, "clientSurvey"), {
        //Ver como completar la info
        creationDate:new Date()          
      });        
      Toast.showWithGravity(
        "ENCUESTA CARGADA EXITOSAMENTE",
        Toast.LONG, 
        Toast.CENTER);      
    reset();
    //VUELTA AL CONTROL PANEL ( VER DE PONER EL QUE CORRESPONDE EN CADA CASO)
    handleReturn();
    } catch (error:any) {
      Toast.showWithGravity(
        error.code,
        Toast.LONG, 
        Toast.CENTER); 
    }finally{
      setLoading(false);
    }
  }
  
  //MANEJADORES DE INPUTS

  //SLIDER
  const [sliderState, setSliderState] = useState(0);


  //HEADER
  useLayoutEffect(() => {
      navigation.setOptions({
        headerLeft: () => (
          <TouchableOpacity onPress={handleReturn}>
              <Image source={returnIcon} style={styles.headerIcon}/>
          </TouchableOpacity>
        ),
        headerTitle: () => (
          <Text style={styles.headerText}>ENCUESTA DE SATISFACCION</Text>
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
        <View style={styles.inputContainer}>

          <View style={styles.buttonLayout}>
            <Text style={styles.inputText}>
              {sliderState} {sliderState.toFixed(3)}
            </Text>
            <Slider
              step={0.5}
              style={styles.inputText}
              onValueChange={value => setSliderState(value)}
            />
          </View>



          <View style={styles.submitContainer}>
            <TouchableOpacity onPress={onSubmit} style={styles.buttonLayout}>
              <Text style={styles.buttonText}>CARGAR DUEÑO / SUPERVISOR</Text>         
            </TouchableOpacity>
          </View>      
        </View> 
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

export default NewClientSurvey;