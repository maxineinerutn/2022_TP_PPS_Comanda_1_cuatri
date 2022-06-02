import { StyleSheet, Dimensions } from "react-native";
const Styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  camera: {
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height * 0.6,
  },
  hideCamera: {
    display: "none",
    width: 0,
    height: 0,
  },
  buttonContainer: {
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 100,
  },
  button: {
    alignSelf: "flex-end",
    alignItems: "center",
    backgroundColor: "red",
    padding: 20,
    borderTopLeftRadius: 10,
    borderBottomStartRadius: 10,
  },
  buttonSacarFoto: {
    alignSelf: "flex-end",
    alignItems: "center",
    backgroundColor: "red",
    padding: 20,
    borderRadius: 10,
  },
  text: {
    fontSize: 18,
    color: "white",
  },
  buttonGuardar: {
    alignSelf: "flex-end",
    alignItems: "center",
    backgroundColor: "green",
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderTopRightRadius: 10,
    borderBottomEndRadius: 10,
  },
});
export default Styles;
