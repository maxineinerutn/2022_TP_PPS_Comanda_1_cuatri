import React, { useLayoutEffect, useEffect, useState, useCallback  } from "react";
import styles from "../productRegistration/StyleProductRegistrationScreen";
import { ImageBackground, TouchableOpacity, View, Image, Text, TextInput, StyleSheet } from "react-native";
import { returnIcon, backgroundImage, cameraIcon, qrIcon,  } from "../productRegistration/AssetsProductRegistrationScreen";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Modal from "react-native-modal";
import { Camera } from 'expo-camera';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useForm } from 'react-hook-form';
import Toast from 'react-native-simple-toast';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, uploadBytes } from 'firebase/storage';
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { auth, db, storage } from "../../../App";
import { getBlob } from "../../../utils/utils";
import * as ImagePicker from "expo-image-picker";
import { RadioButton } from 'react-native-paper';
import RotatingLogo from "../../rotatingLogo/RotatingLogo";

type NewUser = {
  name:string;
  description:string;
  elaborationTime:string;
  price:string;
  type:string;
}

const ProductRegistration = () => {

    //CONSTANTES
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const [nameForm, setName] = useState("Nombre del Producto");
    const [descriptionnForm, setDescription] = useState("Descripción del Producto");
    const [elaborationTimeForm, setElaborationTime] = useState("Tiempo de Elaboración (en minutos)");
    const [priceForm, setPrice] = useState("Precio");
    const {getValues, formState:{}, reset, setValue} = useForm<NewUser>();
    const [image1, setImage1] = useState("");
    const [image2, setImage2] = useState("");
    const [image3, setImage3] = useState("");
    const [loading, setLoading] = useState(false);
    const [placeholderColor, setPlaceholderColor] = useState("white");
    const [isModalSpinnerVisible, setModalSpinnerVisible] = useState(false);
    const [checked, setChecked] = React.useState('Comida');
    const [employeeType, setEmployeeType] = React.useState('');

  //RETURN
  ///VER PORQUE NO FUNCIONA EL RETURN POR CUALQUIER mail

  useFocusEffect(
    useCallback(() => {
      async () => {
        const q = query(collection(db, "userInfo"), where("email", "==", auth.currentUser?.email));
        const querySnapshot = await getDocs(q);
        console.log(querySnapshot.size);
        querySnapshot.forEach((doc) => {
          setEmployeeType(doc.data().employeeType); 
          console.log(doc.data().employeeType);          
        });        
      };
  }, [checked]))


  const handleReturn = () => {
    
    if(auth.currentUser?.email == "cincotenedorescocina@gmail.com"){
      navigation.replace("ControlPanelCocina")
    }
    if(auth.currentUser?.email == "cincotenedoresbar@gmail.com"){
      navigation.replace("ControlPanelBar")
    }
  }

  //PERMISOS CAMARA
  useEffect(() => {
    (async () => {
        await Camera.requestCameraPermissionsAsync();
        await BarCodeScanner.requestPermissionsAsync();
    })();
  }, [])

  //MANEJADOR DE LA CAMARA
  const handleCamera1 = async (type) => {
    let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        aspect: [4, 3],
        quality: 1,
    });
    if (!result.cancelled) {
      setImage1(result["uri"]);
    }
  };

  const handleCamera2 = async (type) => {
    let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        aspect: [4, 3],
        quality: 1,
    });
    if (!result.cancelled) {
      setImage2(result["uri"]);
    }
  };

  const handleCamera3 = async (type) => {
    let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        aspect: [4, 3],
        quality: 1,
    });
    if (!result.cancelled) {
      setImage3(result["uri"]);
    }
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
    if(error){
      Toast.showWithGravity(
        "Todos los campos son requeridos",
        Toast.LONG, 
        Toast.CENTER);
      return;
    }
    if(!image1 || !image2 || !image3){
      Toast.showWithGravity(
        "Todas las fotos son obligatorias",
        Toast.LONG, 
        Toast.CENTER);
      return;
    }
   
    setLoading(true)
    toggleSpinnerAlert();
    try {
      console.log(auth.currentUser?.email);
      

      //UPLOAD IMAGEN
      const blob1:any = await getBlob(image1);
      const fileName1 = image1.substring(image1.lastIndexOf("/") + 1);
      const fileRef1 = ref(storage, "productInfo/" + fileName1);
      await uploadBytes(fileRef1, blob1);

      const blob2:any = await getBlob(image2);
      const fileName2 = image2.substring(image2.lastIndexOf("/") + 1);
      const fileRef2 = ref(storage, "productInfo/" + fileName2);
      await uploadBytes(fileRef2, blob2);

      const blob3:any = await getBlob(image3);
      const fileName3 = image3.substring(image3.lastIndexOf("/") + 1);
      const fileRef3 = ref(storage, "productInfo/" + fileName3);
      await uploadBytes(fileRef3, blob3);
      //UPLOAD DATA
      await addDoc(collection(db, "productInfo"), {
        name: values.name,
        description: values.description,
        elaborationTime: values.elaborationTime,
        price: values.price,
        type: values.type,
        image1:fileRef1.fullPath,
        image2:fileRef2.fullPath,
        image3:fileRef3.fullPath,
        qString: "producto"+"@"+values.name+"@"+values.description+"@"+values.elaborationTime+"@"+values.price+"@"+values.type+"@"+fileRef1.fullPath+"@"+fileRef2.fullPath+"@"+fileRef3.fullPath,
        creationDate:new Date()          
      });        
      Toast.showWithGravity(
        "Producto creado exitosamente",
        Toast.LONG, 
        Toast.CENTER);      
    reset();
    setImage1("");
    setImage2("");
    setImage3("");
    //VUELTA AL CONTROL PANEL ( VER DE PONER EL QUE CORRESPONDE EN CADA CASO)
    handleReturn();
    } catch (error:any) {
      Toast.showWithGravity(
        error.code,
        Toast.LONG, 
        Toast.CENTER); 
    }finally{
      setLoading(false);
      resetForm();  
      console.log(auth.currentUser?.email);
    }
  }

  //RESET DEL FORM
  const resetForm = () => {
    setPlaceholderColor("white");
    setName("Nombre del producto");
    setDescription("Descripción del producto");
    setElaborationTime("Tiempo de Elaboración (en minutos)");
    setPrice("Precio");
    setValue("name",'');
    setValue("description",'');
    setValue("elaborationTime",'');
    setValue("price",'');
    setValue("type",'');
    setImage1("");
    setImage2("");
    setImage3("");
  }

  //SPINNER
  const toggleSpinnerAlert = () => {
    setModalSpinnerVisible(true);
    setTimeout(() => {
      setModalSpinnerVisible(false);
    }, 3000);
  };

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

    //MANEJADORES RADIOBUTTONS

  const pressComida = () => {
    setChecked('Comida');
  }

  const pressBebida = () => {
    setChecked('Bebida');
  }

  //CARGA CAMPOS SEGUN SELECCION RADIO BUTTON
  useFocusEffect(
    useCallback(() => {
      console.log(checked);
      if(checked=='Comida'){
        setValue("type",checked);
      }
      if(checked=='Bebida'){
        setValue("type",checked);
      }
  }, [checked]))

  return (
    <View style={styles.container}>
        <ImageBackground source={backgroundImage} resizeMode="cover" style={styles.backgroundImage} imageStyle = {{opacity:0.5}}>
        {loading}
        <View style={styles.body}>
          <View style={styles.cameraQrContainer}>
            {!image1?
              <TouchableOpacity onPress={handleCamera1}>
                <Image style={styles.cameraIcon} resizeMode="cover" source={cameraIcon} />
              </TouchableOpacity>:
              <View>
                <Image style={styles.cameraImage} resizeMode="cover" source={{uri:image1}}/>
              </View>
            }

            {!image2?
              <TouchableOpacity onPress={handleCamera2}>
                <Image style={styles.cameraIcon} resizeMode="cover" source={cameraIcon} />
              </TouchableOpacity>:
              <View>
                <Image style={styles.cameraImage} resizeMode="cover" source={{uri:image2}}/>
              </View>
            }

            {!image3?
              <TouchableOpacity onPress={handleCamera3}>
                <Image style={styles.cameraIcon} resizeMode="cover" source={cameraIcon} />
              </TouchableOpacity>:
              <View>
                <Image style={styles.cameraImage} resizeMode="cover" source={{uri:image3}}/>
              </View>
            }            
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.inputField}>
              <TextInput
                placeholder={nameForm}
                placeholderTextColor= {placeholderColor}
                style={styles.inputText}
                onChangeText={(text) => setValue("name",text)}
              />
            </View>

            <View style={styles.inputField}>
              <TextInput
                placeholder= {descriptionnForm}
                placeholderTextColor= {placeholderColor}
                style={styles.inputText}
                onChangeText={(text) => setValue("description",text)}
              />
            </View>

            <View style={styles.inputField}>
              <TextInput
                placeholder={elaborationTimeForm}
                placeholderTextColor= {placeholderColor}
                style={styles.inputText}
                keyboardType={'numeric'}
                onChangeText={(text) => setValue("elaborationTime",text)}
              />
            </View>

            <View style={styles.inputField}>
              <TextInput
                placeholder={priceForm}
                placeholderTextColor="white"
                style={styles.inputText}
                keyboardType={'numeric'}
                onChangeText={(text) => setValue("price",text)}
              />
            </View>


            <View style={styles.inputFieldRadioLayout}>
              <View style={styles.inputFieldRadio}>
                <RadioButton
                  value="Comida"
                  status={ checked === 'Comida' ? 'checked' : 'unchecked' }
                  onPress={ pressComida }
                />
                <Text style={styles.inputText}>COMIDA</Text>               
              </View>


              <View style={styles.inputFieldRadio}>
                <RadioButton
                  value="Bebida"
                  status={ checked === 'Bebida' ? 'checked' : 'unchecked' }
                  onPress={ pressBebida }
                />
                <Text style={styles.inputText}>BEBIDA</Text>
              </View>
            </View> 


            <View style={styles.submitContainer}>
              <TouchableOpacity onPress={onSubmit} style={styles.buttonLayout}>
                <Text style={styles.buttonText}>CARGA DE PRODUCTO</Text>         
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
export default ProductRegistration;