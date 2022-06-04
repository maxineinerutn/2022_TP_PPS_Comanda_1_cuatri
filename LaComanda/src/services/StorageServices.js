import uuid from 'react-native-uuid';
import { app } from '../../firebase';

const storage = app.storage();
/**
 *
 * @param {string} imgRefName Ruta donde se va a guardar la imagen en el storage
 * @param {Blob} blob Imagen pasada como un blob
 * @returns
 */
export const saveImageInStorage = async ( imgRefName, blob ) => {
  try {
    const docName = uuid.v4().toString();
    const ref = storage.ref( `${imgRefName}/${docName}` );
    await ref.put( blob );
    const uri = await ref.getDownloadURL();
    console.log( uri );
    const respuesta = { uri };
    return respuesta;
  } catch ( error ) {
    throw new Error( error.message );
  }
};
