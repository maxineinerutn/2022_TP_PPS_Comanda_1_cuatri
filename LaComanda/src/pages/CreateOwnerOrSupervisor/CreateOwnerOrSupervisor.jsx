import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Styles from "./style.js";
import UserForm from "../../components/UserForm/UserForm.jsx";
import { UserTypes } from "../../util/Enums.js";

export default function CreateOwnerOfSupervisor() {
  const handleSubmit = (newUser) => {
    console.log(newUser);
  };
  return (
    <View style={Styles.container}>
      {/* <UserForm
        userType={UserTypes.Anonymous}
        onSubmit={handleSubmit}
      ></UserForm> */}
    </View>
  );
}
