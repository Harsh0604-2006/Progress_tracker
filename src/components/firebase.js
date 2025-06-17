// Import the functions you need from the SDKs you need
import {getAuth} from "firebase/auth"
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDV5UeTPRJXc-8XGa5_mZNQbiFyqY-8SgY",
  authDomain: "progress-tracker-13c68.firebaseapp.com",
  projectId: "progress-tracker-13c68",
  storageBucket: "progress-tracker-13c68.firebasestorage.app",
  messagingSenderId: "570650369980",
  appId: "1:570650369980:web:85aede5b59f6c5e78ad5b9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(); 
export const db=getFirestore(app);
export default app;