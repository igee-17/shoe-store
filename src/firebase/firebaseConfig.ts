// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDOFej6Ox4SaQYX9f6faLxrs0RQbkf4XWs",
  authDomain: "shoestore-3c67f.firebaseapp.com",
  projectId: "shoestore-3c67f",
  storageBucket: "shoestore-3c67f.appspot.com",
  messagingSenderId: "465390983902",
  appId: "1:465390983902:web:0b1a4863e5e42955bb404f",
  measurementId: "G-9TWYMVJB86",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
