// Import the functions you need from the SDKs you need
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import firebase from "firebase/compat/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCppQtZV-X-nM6gZvks2HqxlOoCq4qT-c0",
  authDomain: "lacomanda-47138.firebaseapp.com",
  projectId: "lacomanda-47138",
  storageBucket: "lacomanda-47138.appspot.com",
  messagingSenderId: "1019356936378",
  appId: "1:1019356936378:web:85570ce6e0c9658e416a83",
};

// Initialize Firebase
let app = null;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}
const auth = firebase.auth();
export { auth, app };
