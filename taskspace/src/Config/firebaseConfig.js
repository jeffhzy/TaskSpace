import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "firebase/storage";

export const firebaseConfig = {
  apiKey: "AIzaSyAeIES3QtR_T_ZF6e_4hbmO6JfnldKURqI",
  authDomain: "taskspace-7a4b8.firebaseapp.com",
  projectId: "taskspace-7a4b8",
  storageBucket: "taskspace-7a4b8.appspot.com",
  messagingSenderId: "505163423921",
  appId: "1:505163423921:web:c366ccb8da906dc4e84290",
  measurementId: "G-TMKVGGWEYZ",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);