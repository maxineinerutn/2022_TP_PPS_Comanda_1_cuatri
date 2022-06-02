import { StyleSheet, Dimensions } from "react-native";
import theme from "../../config/theme";
const Styles = StyleSheet.create({
  container: {
    // backgroundColor: "green",
    height: Dimensions.get("screen").height * 0.8,
    width: Dimensions.get("screen").width,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  formControl: {
    borderBottomColor: theme.colors.details,
    width: Dimensions.get("screen").width * 0.7,
    height: Dimensions.get("screen").height * 0.05,
    paddingVertical: Dimensions.get("screen").height * 0.01,
    paddingLeft: Dimensions.get("screen").width * 0.02,
    borderRadius: 10,
    borderBottomWidth: 4,
  },
  formControlPhoto: {
    borderColor: theme.colors.details,
    width: Dimensions.get("screen").width * 0.5,
    height: Dimensions.get("screen").height * 0.2,
    paddingVertical: Dimensions.get("screen").height * 0.01,
    paddingLeft: Dimensions.get("screen").width * 0.02,
    borderRadius: 10,
    borderWidth: 4,
  },
  formControlPhotoWithoutPhoto: {
    width: Dimensions.get("screen").width * 0.45,
    height: Dimensions.get("screen").height * 0.185,
  },
  textError: {
    top: 15,
    position: "relative",
    color: theme.colors.error,
  },
  textRadioButtonSelected: {
    fontWeight: "bold",
  },
  containerRadioButton: {
    width: Dimensions.get("screen").width * 0.7,
    // height: Dimensions.get("screen").height * 0.5,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignContent: "center",
  },
  radioBtn: {
    width: Dimensions.get("screen").width * 0.3,
    height: Dimensions.get("screen").height * 0.05,
    paddingVertical: Dimensions.get("screen").height * 0.01,
    paddingLeft: Dimensions.get("screen").width * 0.02,
    borderColor: theme.colors.details,
    borderWidth: 3,
    borderRadius: 20,
    marginBottom: 10,
    marginLeft: 5,
  },
  radioBtnSelected: {
    backgroundColor: theme.colors.details,
  },
});
export default Styles;
