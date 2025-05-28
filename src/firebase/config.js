// config.js – Firebase configuration & initialization
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBj8Xhu4Wfh-ly9IOmWOaiJ7H35HyuhO7k",
  authDomain: "carapp-d9481.firebaseapp.com",
  projectId: "carapp-d9481",
  storageBucket: "carapp-d9481.appspot.com",
  messagingSenderId: "426282696634",
  appId: "1:426282696634:web:4fa015070769155620e783",
  measurementId: "G-QDTKBDG1HE"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
