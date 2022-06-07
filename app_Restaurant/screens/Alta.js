import { Text, View, TouchableOpacity, Dimensions } from "react-native";
import React, { Component } from "react";

const HEIGHT = Dimensions.get("window").height;
const WIDTH = Dimensions.get("window").width;

const Altas = (props) => {
  const { navigation, route } = props;
  const { tipoAlta } = route.params;

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Alta de {tipoAlta}</Text>
    </View>
  );
};

export default Altas;
