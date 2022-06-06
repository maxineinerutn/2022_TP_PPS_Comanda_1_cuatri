import { showMessage } from 'react-native-flash-message';

export const errorHandler = (error:any) => {
    let message:string="";
    switch(error){
        case 'auth/invalid-email':
            message="El correo electrónico es inválido"
            break;
        case 'auth/email-already-in-use':
            message="El correo electrónico ingresado ya está registrado"
            break;
        case 'auth/weak-password':
            message="La contraseña debe tener un mínimo de 6 carácteres"
        break;
        case 'auth/user-not-found':
            message="Correo electrónico y/o contraseña inválido"
        break;
        case 'auth/wrong-password':
            message="Correo electrónico y/o contraseña inválido"
        break;
        case 'pass-diff':
            message="Las contraseñas no coinciden"
        break;
        case 'image-error':
            message="Ha ocurrido un error intentando cargar el producto"
        break;
        case 'empty-fields':
            message="Todos los campos son requeridos"
        break;
        case 'table-exists':
            message="El número de la tabla ya existe"
        break;
        case 'unauthorized':
            message="Usuario no autorizado"
        break;
        default:
            message="Ha ocurrido un error, por favor reintente nuevamente"
        break;
    }
    showMessage({type:"danger", message:"Error", description:message});
}
