import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { ImageBackground, Text, View, Image, TextInput, TouchableOpacity } from "react-native";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../App";
import Toast from 'react-native-simple-toast';
import styles from "../loginScreen/StyleLoginScreen";
import Modal from "react-native-modal";
import RotatingLogo from "../rotatingLogo/RotatingLogo";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faKey, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import ActionButton from "react-native-action-button";
import { adminLogo, backgroundImage, barmanLogo, chefLogo, clientLogo, logoImage, metreLogo, profilesLogo, waiterLogo } from "./AssetsLoginScreen";


const LoginScreen = () => {

    //CONSTANTES
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");    
    const [isModalSpinnerVisible, setModalSpinnerVisible] = useState(false);
    
    //SPINNER ERROR
    const toggleErrorAlert = async (error) => {
        setModalSpinnerVisible(true);
        
        setTimeout(() => {
          setModalSpinnerVisible(false);          
        }, 1000);

        setTimeout(() => {
            Toast.showWithGravity(
                error,
                Toast.LONG, 
                Toast.CENTER);
        }, 2000);
    };

    //SETEOS INICIOS RAPIDOS
    const onPressAdminHandler = () => {
        console.log("Works");
        setEmail("cincotenedorespropietario@gmail.com");
        setPassword("administrador123");
    };

    const onPressMetreHandler = () => {
        setEmail("cincotenedoresmetre@gmail.com");
        setPassword("metre123");
    };

    const onPressMozoHandler = () => {
        setEmail("cincotenedoresmozo@gmail.com");
        setPassword("mozo123");
    };

    const onPressCocinaHandler = () => {
        setEmail("cincotenedorescocina@gmail.com");
        setPassword("cocina123");
    };

    const onPressBarHandler = () => {
        setEmail("cincotenedoresbar@gmail.com");
        setPassword("bar123");
    };

    const onPressClienteHandler = () => {
        setEmail("cincotenedorescliente@gmail.com");
        setPassword("cliente123");
    };

    //INICIO DE SESION
    useEffect(() => {
        const unsuscribe = auth.onAuthStateChanged((user) => {
          if(user) {
            navigation.replace("MockScreen");
          }
        });
        return unsuscribe;
    }, []);

    //MANEJO LOGIN Y REGISTRO

    const handelSignUp = async () => {
        await createUserWithEmailAndPassword(auth,email, password)
          .then((userCredentials: { user: any }) => {
            const user = userCredentials.user;
            console.log("Registro de usuario como: ", user?.email);
          })
          .catch((error) => {
            let errorMsg = error.code;
            // Armar switch de mensajes de error
            toggleErrorAlert(errorMsg);                
          });
    };
    
    const handleLogin = async () => {
        await signInWithEmailAndPassword(auth,email, password)
          .then((userCredentials: { user: any }) => {
            const user = userCredentials.user;
            console.log("Inicio de sesion como: ", user?.email);
            if (user?.email == "cincotenedorespropietario@gmail.com") {
              navigation.replace("ControlPanelPropietario");
            }
            if (user?.email == "cincotenedoresmetre@gmail.com") {
                navigation.replace("ControlPanelMetre");
            }
            if (user?.email == "cincotenedoresmozo@gmail.com") {
                navigation.replace("ControlPanelMozo");
            }
            if (user?.email == "cincotenedorescocina@gmail.com") {
                navigation.replace("ControlPanelCocina");
            }
            if (user?.email == "cincotenedoresbar@gmail.com") {
                navigation.replace("ControlPanelBar");
            }
            if (user?.email == "cincotenedorescliente@gmail.com") {
                navigation.replace("ControlPanelCliente");
            }            
          })
          .catch((error) => {
            let errorMsg = error.code;
            // Armar switch de mensajes de error
            toggleErrorAlert(errorMsg); 
        });
    };
    
    return (
        <View style={styles.container}>
            <ImageBackground
                source={backgroundImage}
                resizeMode="cover"
                style={styles.backgroundImage}
                imageStyle = {{opacity:0.5}}>

                <View style={styles.body}>

                    <Text style={styles.titleText}>LOS CINCO</Text>
                    <Image style={styles.loginLogo} source={logoImage}/>
                    <Text style={styles.titleText}>TENEDORES</Text>

                    <View style={styles.inputContainer}>
                        <View style={styles.inputField}>
                        <FontAwesomeIcon style={styles.inputImage} icon={faEnvelope} size={15} />
                        <TextInput
                            placeholder="Correo Electrónico  "
                            placeholderTextColor="white"
                            style={styles.inputText}
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                        />
                        </View>

                        <View style={styles.inputField}>
                        <FontAwesomeIcon style={styles.inputImage} icon={faKey} size={15} />
                        <TextInput
                            placeholder="Contraseña  "
                            placeholderTextColor="white"
                            style={styles.inputText}
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                            secureTextEntry
                        />
                        </View>
                    </View>

                        <TouchableOpacity onPress={handleLogin} style={styles.buttonLogin}>
                            <Text style={styles.buttonText}>INICIAR SESIÓN</Text>
                        </TouchableOpacity>
                            

                       
                 <View style={styles.actionButton}>

                        <ActionButton
                            renderIcon={(active) => active ? ( <Image source={profilesLogo} style={styles.quickStartIcon} /> )
                                                        : ( <Image source={profilesLogo} style={styles.quickStartIcon} /> )}
                            verticalOrientation="up"
                            position="left"
                            buttonColor="rgba(0,0,0,1)"
                            spacing={20}
                            size={90}
                            >

                            <ActionButton.Item onPress={onPressAdminHandler} >
                                <Image source={adminLogo} style={styles.quickStartIcon} />
                            </ActionButton.Item>

                            <ActionButton.Item onPress={onPressMetreHandler} >
                                <Image source={metreLogo} style={styles.quickStartIcon} />
                            </ActionButton.Item>

                            <ActionButton.Item onPress={onPressMozoHandler} >
                                <Image source={waiterLogo} style={styles.quickStartIcon} />
                            </ActionButton.Item>

                            <ActionButton.Item onPress={onPressCocinaHandler} >
                                <Image source={chefLogo} style={styles.quickStartIcon} />
                            </ActionButton.Item>

                            <ActionButton.Item onPress={onPressBarHandler} >
                                <Image source={barmanLogo} style={styles.quickStartIcon} />
                            </ActionButton.Item>

                            <ActionButton.Item onPress={onPressClienteHandler} >
                                <Image source={clientLogo} style={styles.quickStartIcon} />
                            </ActionButton.Item>                    
                        </ActionButton>

                        
                    </View>

                    <TouchableOpacity onPress={handelSignUp} style={styles.buttonRegister} >
                            <Text style={styles.buttonText}>REGISTRARSE</Text>
                    </TouchableOpacity> 

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

export default LoginScreen;