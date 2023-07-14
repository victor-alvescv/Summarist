// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDeZAvR7Yra2FO9uR_dKCYWuyS74NBYHzk",
  authDomain: "summary-3bcce.firebaseapp.com",
  projectId: "summary-3bcce",
  storageBucket: "summary-3bcce.appspot.com",
  messagingSenderId: "23238559200",
  appId: "1:23238559200:web:543fef90fadd43bc1fd785"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app) 
export const provider = new GoogleAuthProvider();