import { NavigationContainer } from "@react-navigation/native";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import React from "react";
import { Text } from "react-native";
import { useSelector } from "react-redux";
import { firebaseConfig } from "../firebase";
import LoginStack from "./navigation/stacks/LoginStack";
import { IStore } from './redux/store';
import { AuthTypes } from "./redux/authReducer";
import Spinner from "./components/atoms/Spinner/Spinner.component";
import DrawerStack from "./navigation/Drawer";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import QRCodeScreen from "./components/screens/QRCodeScreen/QRCodeScreen.component";

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);

const InitApp = () => {
    const data:IStore = useSelector<IStore, any>(store => store);
    return (
        <NavigationContainer>
            {data.loader.loading && <Spinner />}
            {data.auth.success ? <DrawerStack /> : <LoginStack />}
        </NavigationContainer>
    );
};

export default InitApp;
