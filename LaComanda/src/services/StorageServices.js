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
  const docName = uuid.v4().toString();
  const ref = storage.ref( `${imgRefName}/${docName}` );
  await ref.put( blob );
  const uri = await ref.getDownloadURL();
  const respuesta = { uri };

  return respuesta;
};
export const saveImagesInStorage = async ( imgRefName, blobs ) => {
  if ( typeof blobs === typeof [] && blobs.length > 0 ) {
    const respuesta = [];
    blobs.forEach(( b ) => {
      const docName = uuid.v4().toString();
      const ref = storage.ref( `${imgRefName}/${docName}` );
      ref.put( b ).then(() => {
        ref.getDownloadURL().then(( uri ) => {
          respuesta.push( uri );
          console.log( uri );
        });
      });
    });
    console.log( `${respuesta} respuesta adentro del service` );
    return respuesta;
  }
  return null;
};
