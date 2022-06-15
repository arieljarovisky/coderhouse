// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAGAzRWj4oS532GxTJHd968Ja44ILehuNs",
  authDomain: "ecommerce-89dc7.firebaseapp.com",
  projectId: "ecommerce-89dc7",
  storageBucket: "ecommerce-89dc7.appspot.com",
  messagingSenderId: "288993372404",
  appId: "1:288993372404:web:193786e7b2897dceab16a1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);