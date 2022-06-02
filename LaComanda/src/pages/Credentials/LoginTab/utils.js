import { getUserByEmail } from '../../../services/FirestoreServices';

export const handleLoginErrorMessage = ( code ) => {
  switch ( code ) {
    case 'auth/user-disabled': {
      return 'Usuario deshabilitado';
    }
    case 'auth/invalid-email': {
      return 'Email inválido';
    }
    case 'auth/user-not-found': {
      return 'No se encontró un usuario con éste mail';
    }
    case 'auth/wrong-password': {
      return 'Contraseña incorrecta';
    }
    default: {
      return 'Contraseña incorrecta';
    }
  }
};

export const verifyUserIsApproved = ( email ) => {
  getUserByEmail(
    'users',
    email,
    ( querySnapshot ) => {
      const user = querySnapshot.docs.map(( doc ) => doc.data());
      return user.approved;
    },
    () => {
      console.log( err );
    }
  );
};
