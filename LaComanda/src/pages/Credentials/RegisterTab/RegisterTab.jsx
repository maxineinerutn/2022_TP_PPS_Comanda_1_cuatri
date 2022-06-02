import { View } from "react-native";
import React from "react";
import UserForm from "../../../components/UserForm/UserForm";
import { UserTypes } from "../../../util/Enums";
import Styles from "./Styles";
const handleSubmit = (newUser) => {
  console.log(newUser);
};
const RegisterTab = () => {
  return (
    <View styles={Styles.container}>
      <UserForm userType={UserTypes.Client} onSubmit={handleSubmit}></UserForm>
    </View>
  );
};

export default RegisterTab;
