import { Dimensions, StyleSheet } from 'react-native';

const win = Dimensions.get("window");

export default StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'trasparent',
        resizeMode: 'cover',
    },
    spinnerLogo: {
        width: win.width / 1.5,
        height: win.width / 1.5,
        resizeMode: "contain",
        alignSelf: "center",
    },
});
