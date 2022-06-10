/* eslint-disable no-return-await */
import { app } from '../../firebase';

const firestore = app.firestore();
/**
 *
 * @param {*} collection Nombre de la coleccion
 * @param {*} docName Nombre o Id del documento
 * @param {*} item El item en ceustion a guardar
 * @returns
 */
export const saveItemInCollection = async ( collection, docName, item ) => await firestore.collection( collection ).doc( docName ).set( item );

/**
 *
 * @param {*} collection Nombre de la coleccion
 * @param {*} email Email del usuario
 * @param {*} onResult Callback que se va a ejecutar cuando traiga datos o se actualice la base de datos
 * @param {*} onError Callback que se va a ejecutar si ocurre un error
 * @returns
 */
export const getUserByEmail = async (
  collection,
  email,
  onResult,
  onError
) => await firestore
  .collection( collection )
  .where( 'email', '==', email )
  .onSnapshot( onResult, onError );
/**
 *
 * @param {*} collection Nombre de la coleccion
 * @param {*} onResult Callback que se va a ejecutar cuando traiga datos o se actualice la base de datos
 * @param {*} onError Callback que se va a ejecutar si ocurre un error
 * @returns
 */
export const getAllCollection = async ( collection, onResult, onError ) => await firestore.collection( collection ).onSnapshot( onResult, onError );
/**
 *
 * @param {*} collection Nombre de la coleccion
 * @param {*} docName Nombre o Id del documento
 * @param {*} updatedItem Item actualizado
 * @returns
 */
export const updateItem = async ( collection, docName, updatedItem ) => await firestore
  .collection( collection )
  .doc( docName )
  .update( updatedItem );

export const getAllNotApprovedClients = async ( collection, onResult, onError ) => {
  await firestore.collection( collection ).where( 'rol', '==', 'Cliente' ).where( 'approved', '==', false ).onSnapshot( onResult, onError );
};

