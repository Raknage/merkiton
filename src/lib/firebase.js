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
  apiKey: import.meta.env.PUBLIC_APIKEY,
  authDomain: import.meta.env.PUBLIC_AUTHDOMAIN,
  projectId: import.meta.env.PUBLIC_PROJECTID,
  storageBucket: import.meta.env.PUBLIC_STORAGEBUCKET,
  messagingSenderId: import.meta.env.PUBLIC_MESSAGINGSENDERID,
  appId: import.meta.env.PUBLIC_APPID,
  measurementId: import.meta.env.PUBLIC_MEASUREMENTID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
