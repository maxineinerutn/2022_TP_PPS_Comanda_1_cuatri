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
    cardStyle: {
        backgroundColor: '#DCDCE1',
        borderColor: '#DCDCE1',
        margin: 10,
        borderRadius: 10,
        borderWidth: 2,
    },
    cardImage: {
        flex: 1, 
        borderRadius: 10,
        height:120, 
        width:120,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tableHeaderText: {
        color: '#3D4544',
        fontSize: 20,
        fontFamily: 'Oswald_500Medium',
    },
    tableCellText: {
    color: '#3D4544',
    fontSize: 15,
    fontFamily: 'Oswald_500Medium',
    },
});
