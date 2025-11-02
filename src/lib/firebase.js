// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAP2nZb0qfbO_Bd9CkFs5_4xzxAxC_di0I",
  authDomain: "merkiton-1433e.firebaseapp.com",
  projectId: "merkiton-1433e",
  storageBucket: "merkiton-1433e.firebasestorage.app",
  messagingSenderId: "565745239371",
  appId: "1:565745239371:web:164ac844425a308bfb94ce",
  measurementId: "G-VPJJ6CQWR8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
