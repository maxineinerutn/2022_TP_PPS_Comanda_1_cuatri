import { app } from "../../firebase";
import uuid from "react-native-uuid";

const storage = app.storage("gs://lacomanda-47138.appspot.com");
/**
 *
 * @param {string} imgRefName Ruta donde se va a guardar la imagen en el storage
 * @param {Blob} blob Imagen pasada como un blob
 * @returns
 */
export const saveImageInStorage = async (imgRefName, blob) => {
  try {
    const docName = uuid.v4().toString();
    const ref = storage.ref(imgRefName + "/" + docName);
    await ref.put(blob);
    const respuesta = { ref: ref, docName: docName };
    return respuesta;
  } catch (error) {
    throw new Error(error.message);
  }
};
