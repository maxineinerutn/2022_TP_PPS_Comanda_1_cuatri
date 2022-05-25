import React from 'react';
import { Image } from "react-native";
import styles from "../rotatingLogo/StyleRotatingLogo";

const RotatingLogo = () => {

    const logoImage = require("../../assets/common/spinner.png");

    return (

        <Image style={styles.spinnerLogo} source={logoImage}/>
      
    );
};

export default RotatingLogo;
