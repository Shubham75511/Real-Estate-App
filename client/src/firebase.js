// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-c7aa7.firebaseapp.com",
  projectId: "mern-estate-c7aa7",
  storageBucket: "mern-estate-c7aa7.firebasestorage.app",
  messagingSenderId: "11055654625",
  appId: "1:11055654625:web:26b66f37bf763b0ac179a0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);