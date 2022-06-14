import { auth } from '../../firebase';
import { updateItem } from './FirestoreServices';

/**
 * Create new user with email and password with firebase
 * @param {*} email
 * @param {*} password
 * @returns
 */
export const createUserWithEmailAndPassword = ( email, password ) => auth.createUserWithEmailAndPassword( email, password );

/**
 * Sign user with email and password with firebase
 * @param {*} email
 * @param {*} password
 * @returns
 */
export const signInUser = ( email, password ) => auth
  .signInWithEmailAndPassword( email, password );

/**
 * Signs out user
 * @returns
 */
export const signOutUser = () => {
  updateItem( 'users', auth.currentUser.uid, { pushToken: '' });
  auth.signOut();
};

