// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDa9AG42LM2b2AqouN65bjoo9MHSXu_TWA",
  authDomain: "qiskit-fall-fest.firebaseapp.com",
  projectId: "qiskit-fall-fest",
  storageBucket: "qiskit-fall-fest.appspot.com",
  messagingSenderId: "310230788036",
  appId: "1:310230788036:web:36cf23e5ccc72e934e6691",
  measurementId: "G-26PT9DYEMV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {auth,db}