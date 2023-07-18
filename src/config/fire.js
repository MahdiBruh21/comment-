// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCB6d8mIDZ1Sj3t6Y_c2ONwiZ1asfockfg",
  authDomain: "interapp-3e73f.firebaseapp.com",
  projectId: "interapp-3e73f",
  storageBucket: "interapp-3e73f.appspot.com",
  messagingSenderId: "1046993368989",
  appId: "1:1046993368989:web:419cb2e23aafc8361ee174",
  measurementId: "G-DQBGMT0GSR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
