import { Dimensions, StyleSheet } from 'react-native';

const win = Dimensions.get("window");

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3D4544',
        justifyContent: 'space-around',
    },
    backgroundImage: {
        flex: 1,
        justifyContent: "center"
    },
    body: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',    
    },
    titleText: { 
        fontSize: 40,    
        color: "#DCDCE1",
        fontFamily: 'Oswald_500Medium',
    },
    loginLogo: {
        width: win.width / 1.5,
        height: win.width / 1.5,
        resizeMode: "contain",
        alignSelf: "center",
    },
    inputContainer: {
        width: '80%',      
    },
    inputField: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: ' rgba(220, 220, 225, 0.5);',
        borderBottomColor: '#F7AD3B',
        borderBottomWidth: 0,
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginTop: 20,
        borderRadius: 10,
    },
    inputImage: {
        padding: 10,
        margin: 5,
        height: 25,
        width: 25,
        resizeMode: 'stretch',
        alignItems: 'center',
        color: '#F7AD3B',
    },
    inputText: {
        color: 'black',
        fontFamily: 'Oswald_300Light',
        fontSize: 16,
        width: '100%',
    },
    buttonLogin: {
        backgroundColor: '#A4C3B2',
        borderColor: '#A4C3B2',
        marginTop: 20,
        margin: 5,
        width: "80%",
        height: 60,
        padding: 15,
        borderRadius: 30,
        borderWidth: 0,
        justifyContent: 'center',
        alignItems: 'center',
    }, 
    buttonRegister: {
        backgroundColor: '#F0F2EF',
        borderColor: '#F0F2EF',
        marginTop:40,
        marginRight: 40,
        margin: 15,
        width: 150,
        height: 60,
        padding: 15,
        borderRadius: 100,
        borderWidth: 0,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-end',
    },
    buttonText: {
        color: '#545454',
        fontSize: 16,
        fontFamily: 'Oswald_500Medium',
    },
    quickStartIcon: {
      padding: 5,
      margin: 5,
      height: 85,
      width: 85,
      resizeMode: 'contain',
    },
});
