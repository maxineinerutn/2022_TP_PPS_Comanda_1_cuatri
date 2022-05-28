// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// Add Firebase to your JavaScript project  |  Firebase Documentation

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
apiKey: "AIzaSyBrSOsilAmf_uw_NNCcT_J3oyLXgQwpfzo",
authDomain: "reactanos-bar.firebaseapp.com",
projectId: "reactanos-bar",
storageBucket: "reactanos-bar.appspot.com",
messagingSenderId: "879248746442",
appId: "1:879248746442:web:af65b11c118fbab6895133",
measurementId: "G-7D5HVTGNGX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);