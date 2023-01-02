import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDvDTUsBi7jhQll4-WO5587GxwTa31cjj8",
    authDomain: "mychat-48d19.firebaseapp.com",
    projectId: "mychat-48d19",
    storageBucket: "mychat-48d19.appspot.com",
    messagingSenderId: "198059228058",
    appId: "1:198059228058:web:97d6469bd204bc0ddc5823"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();