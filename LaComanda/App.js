import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import CreateUser from "./src/pages/CreateOwnerOrSupervisor/CreateOwnerOrSupervisor";

export default function App() {
  return (
    <View style={styles.container}>
      <CreateUser></CreateUser>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
  },
});
