import { StyleSheet } from 'react-native';

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
    headerIcon: {
        height: 45,
        width: 45,
        resizeMode: 'contain',
        marginRight: 10,
    },
    headerText: {
        color: 'white',
        fontSize: 15,
        fontFamily: 'Oswald_500Medium',
        textAlign: 'center',
        alignContent: 'center',
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center', 
        alignContent: 'center', 
        justifyContent: 'flex-start', 
        marginBottom: 5
    },
    qrIcon: {
        height:100, 
        width:100, 
        borderRadius:20, 
        margin:10
    },
    buttonLayoutHeader: {
        backgroundColor: '#A4C3B2',
        borderColor: '#A4C3B2',
        marginTop: 20,
        margin: 5,
        width: "65%",
        height: 80,
        padding: 15,
        borderRadius: 30,
        borderWidth: 0,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
    },
    buttonLayout: {
        backgroundColor: '#A4C3B2',
        borderColor: '#A4C3B2',
        marginTop: 20,
        margin: 5,
        width: "80%",
        height: 60,
        padding: 15,
        borderRadius: 30,
        borderWidth: 0,
        justifyContent: 'space-around',
    }, 
    buttonText: {
        color: '#545454',
        fontSize: 16,
        fontFamily: 'Oswald_500Medium',
    },
    tableButtonLayout: {
        flexDirection: "row", 
        alignItems: 'center', 
    }, 
    buttonImage: {
        justifyContent: 'flex-start',
        padding: 10,
        margin: 5,
        height: 50,
        width: 50,
        resizeMode: 'contain',
    },
    hiddenOptions: {
        width: "100%",
        alignItems: 'center',
    },
    noTableSelected: {
        marginTop: 400,
    },
});
