import React, { useLayoutEffect, useEffect, useState, useCallback  } from "react";
import styles from "../tableRegistration/StyleTableRegistrationScreen";
import { ImageBackground, TouchableOpacity, View, Image, Text, TextInput, StyleSheet } from "react-native";
import { returnIcon, backgroundImage, cameraIcon, qrIcon,  } from "../tableRegistration/AssetsTableRegistrationScreen";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Modal from "react-native-modal";

import { Camera } from 'expo-camera';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useForm } from 'react-hook-form';
import Toast from 'react-native-simple-toast';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, uploadBytes } from 'firebase/storage';
import { addDoc, collection } from "firebase/firestore";
import { auth, db, storage } from "../../../App";
import { getBlob } from "../../../utils/utils";
import * as ImagePicker from "expo-image-picker";
import { RadioButton } from 'react-native-paper';
import RotatingLogo from "../../rotatingLogo/RotatingLogo";

type NewUser = {
  // apellido:string;
  // nombre:string;
  // dni:string;
  // cuil:string;
  // email:string;
  // // password:string;
  // // confirmPassword:string
  // rol:string;
  number:string;
  capacity:string;
  type:string;
}

const TableRegistration = () => {

    //CONSTANTES
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    // const [apellidoForm, setApellido] = useState("Apellido");
    // const [nombreForm, setNombre] = useState("Nombre");
    const [numberForm, setNumber] = useState("Numero de Mesa");
    const [capacityForm, setCapacity] = useState("Cantidad de Comensales");
    // const [cuilForm, setCuil] = useState("CUIL");
    // const [emailForm, setEmail] = useState("Correro Electrónico");
    // const [passwordForm, setPassword] = useState("Contraseña");
    // const [confirmPasswordForm, setConfirmPassword] = useState("Confirmar Contraseña");
    const [scanned, setScanned] = useState(false);
    const [openQR, setOpenQR] = useState(false);
    const {getValues, formState:{}, reset, setValue} = useForm<NewUser>();
    const [image, setImage] = useState("");
    const [loading, setLoading] = useState(false);
    const [placeholderColor, setPlaceholderColor] = useState("white");
    const [isModalSpinnerVisible, setModalSpinnerVisible] = useState(false);
    const [checked, setChecked] = React.useState('Dueño');


        //VARIABLE PARA GUARDAR EL USUARIO ORIGINAL
        let originalUser = auth.currentUser;

    //RETURN
    const handleReturn = () => {
      navigation.replace("ControlPanelPropietario")
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
      const capacity = dataSplit[2].trim();
      // const nombre = dataSplit[2].trim();
      // const apellido = dataSplit[1].trim();
      const number = dataSplit[1].trim();
      setValue("capacity",capacity);
      // setValue("nombre",nombre);
      // setValue("apellido",apellido);
      setValue("number",number);
      // setApellido(apellido);
      // setNombre(nombre);
      setCapacity(capacity);
      setNumber(number);
      setPlaceholderColor("black");
    };

    //MANEJADOR DEL QR Y CAMARA
    const handleOpenQR = () => {
      setScanned(false);
      setOpenQR(true);
    }

    const handleCamera = async (type) => {
      let result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          aspect: [4, 3],
          quality: 1,
      });
      if (!result.cancelled) {
        setImage(result["uri"]);
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
      if(!image){
        Toast.showWithGravity(
          "Debe tomar una foto",
          Toast.LONG, 
          Toast.CENTER);
        return;
      }
      // if(values.password!==values.confirmPassword){
      //   Toast.showWithGravity(
      //     "Las contraseñas no coinciden",
      //     Toast.LONG, 
      //     Toast.CENTER);
      //   return;
      // }
      setLoading(true)
      toggleSpinnerAlert();
      try {
        console.log(auth.currentUser?.email);
        // //CREACION DE USUARIO
        // await createUserWithEmailAndPassword(auth,values.email,values.email);
        // console.log(auth.currentUser?.email);

        // //DESLOGUEO DEL USUARIO CREADO Y REESTABLECIMIENTO DEL USUARIO ORIGINAL
        // await auth.signOut();
        // await auth.updateCurrentUser(originalUser);

        //UPLOAD IMAGEN
        const blob:any = await getBlob(image);
        const fileName = image.substring(image.lastIndexOf("/") + 1);
        const fileRef = ref(storage, "tableInfo/" + fileName);
        await uploadBytes(fileRef, blob);
        //UPLOAD DATA
        await addDoc(collection(db, "tableInfo"), {
          // lastName:values.apellido,
          // name:values.nombre,
          // dni:values.dni, 
          // mesa:values.mesa,
          // cuil:values.cuil,
          // email:values.email,
          // rol:checked,
          // image:fileRef.fullPath,

          number:values.number,
          capacity:values.capacity,
          type:checked,
          image:fileRef.fullPath,

          creationDate:new Date()          
        });        
        Toast.showWithGravity(
          "Mesa creada exitosamente",
          Toast.LONG, 
          Toast.CENTER);      
      reset();
      setImage("");
      //VUELTA AL CONTROL PANEL ( VER DE PONER EL QUE CORRESPONDE EN CADA CASO)
      handleReturn;
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
      // setApellido("Apellido");
      // setNombre("Nombre");
      setCapacity("Numero de Comensales");
      setNumber("Number");
      // setCuil("CUIL");
      // setEmail('Correo Electrónico');
      // setPassword('Contraseña');
      // setConfirmPassword('Confirmar Contraseña');
      setValue("number","");
      setValue("capacity",'');
      // setValue("nombre",'');
      // setValue("apellido",'');
      // setValue("email",'');
      // setValue("password",'');
      // setValue("confirmPassword",'');
      // setValue("cuil",'');
      setValue("type",'');
      setImage("");
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
            <Text style={styles.headerText}>ALTA DE MESA</Text>
          ),
          headerTintColor: "transparent",
          headerBackButtonMenuEnabled: false,
          headerStyle: {
            backgroundColor: 'rgba(61, 69, 68, 0.4);',
          },         
        });
      }, []);

          //MANEJADORES RADIOBUTTONS

    const pressDueño = () => {
      setChecked('Dueño');
    }

    const pressSupervisor = () => {
      setChecked('Supervisor');
    }

    const pressEstandar = () => {
      setChecked('Estandar');
    }

    // const pressEtc = () => {
    //   setChecked('Etc');
    // }



    //CARGA CAMPOS SEGUN SELECCION RADIO BUTTON
    useFocusEffect(
      useCallback(() => {
        console.log(checked);
        if(checked=='Supervisor'){
          setValue("type",checked);
        }
        if(checked=='Dueño'){
          setValue("type",checked);
        }
        if(checked=='Estandar'){
          setValue("type",checked);
        }
        // if(checked=='Etc'){
        //   setValue("rol",checked);
        // }
    }, [checked]))
    
//     return (
//         <View style={styles.container}>
//             <ImageBackground source={backgroundImage} resizeMode="cover" style={styles.backgroundImage} imageStyle = {{opacity:0.5}}>
//                 <View style={styles.body}>

//                     <Text>ALTA MESA</Text>
                
//                 </View>                
//             </ImageBackground>           
//         </View>
//     );
// };
return (
  !openQR ?
  <View style={styles.container}>
      <ImageBackground source={backgroundImage} resizeMode="cover" style={styles.backgroundImage} imageStyle = {{opacity:0.5}}>
      {loading}
      <View style={styles.body}>
        <View style={styles.cameraQrContainer}>
          {!image?
            <TouchableOpacity onPress={handleCamera}>
              <Image style={styles.cameraIcon} resizeMode="cover" source={cameraIcon} />
            </TouchableOpacity>:
            <View>
              <Image style={styles.cameraImage} resizeMode="cover" source={{uri:image}}/>
            </View>
          }

          {/* <TouchableOpacity onPress={handleOpenQR}>
            <Image 
                style={styles.qrIcon} resizeMode="cover" source={qrIcon}
            />
          </TouchableOpacity> */}
        </View>

        <View style={styles.inputContainer}>
          {/* <View style={styles.inputField}>
            <TextInput
              placeholder= {apellidoForm}
              placeholderTextColor= {placeholderColor}
              style={styles.inputText}
              onChangeText={(text) => setValue("apellido",text)}
            />
          </View> */}

          {/* <View style={styles.inputField}>
            <TextInput
              placeholder={nombreForm}
              placeholderTextColor= {placeholderColor}
              style={styles.inputText}
              onChangeText={(text) => setValue("nombre",text)}
            />
          </View> */}

          <View style={styles.inputField}>
            <TextInput
              placeholder={numberForm}
              placeholderTextColor= {placeholderColor}
              style={styles.inputText}
              keyboardType={'numeric'}
              onChangeText={(text) => setValue("number",text)}
            />
          </View>

          <View style={styles.inputField}>
            <TextInput
              placeholder={capacityForm}
              placeholderTextColor= {placeholderColor}
              style={styles.inputText}
              keyboardType={'numeric'}
              onChangeText={(text) => setValue("capacity",text)}
            />
          </View>

          {/* <View style={styles.inputField}>
            <TextInput
              placeholder={cuilForm}
              placeholderTextColor="white"
              style={styles.inputText}
              keyboardType={'numeric'}
              onChangeText={(text) => setValue("cuil",text)}
            />
          </View> */}

          {/* <View style={styles.inputField}>
            <TextInput
              placeholder= {emailForm}
              placeholderTextColor="white"
              style={styles.inputText}
              onChangeText={(text) => setValue("email",text)}
            />
          </View> */}

          {/* <View style={styles.inputField}>
            <TextInput
              placeholder= {passwordForm}
              placeholderTextColor="white"
              style={styles.inputText}
              onChangeText={(text) => setValue("password",text)}
              secureTextEntry = {true}
            />
          </View> */}

          {/* <View style={styles.inputField}>
            <TextInput
              placeholder= {confirmPasswordForm}
              placeholderTextColor="white"
              style={styles.inputText}
              onChangeText={(text) => setValue("confirmPassword",text)}
              secureTextEntry = {true}
            />
          </View> */}

          <View style={styles.inputField}>
            <Text style={styles.tagText}>TIPO</Text> 
          </View>


          <View style={styles.inputFieldRadioLayout}>
            <View style={styles.inputFieldRadio}>
              <RadioButton
                value="Dueño"
                status={ checked === 'Dueño' ? 'checked' : 'unchecked' }
                onPress={ pressDueño }
              />
              <Text style={styles.inputText}>VIP</Text>               
            </View>

            <View style={styles.inputFieldRadio}>
              <RadioButton
                value="Supervisor"
                status={ checked === 'Supervisor' ? 'checked' : 'unchecked' }
                onPress={ pressSupervisor }
              />
              <Text style={styles.inputText}>DISCAPACITADOS</Text>
            </View>

            <View style={styles.inputFieldRadio}>
              <RadioButton
                value="Estandar"
                status={ checked === 'Estandar' ? 'checked' : 'unchecked' }
                onPress={ pressEstandar }
              />
              <Text style={styles.inputText}>ESTÁNDAR</Text>
            </View>

            {/* <View style={styles.inputFieldRadio}>
              <RadioButton
                value="Etc"
                status={ checked === 'Etc' ? 'checked' : 'unchecked' }
                onPress={ pressEtc }
              />
              <Text style={styles.inputText}>ETC</Text>
            </View> */}
          </View>


          <View style={styles.submitContainer}>
            <TouchableOpacity onPress={onSubmit} style={styles.buttonLayout}>
              <Text style={styles.buttonText}>CARGAR MESA</Text>         
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
  </View> : <BarCodeScanner
              onBarCodeScanned={scanned && openQR ? undefined : handleBarCodeScanned}
              style={StyleSheet.absoluteFillObject} />
);
};

export default TableRegistration;