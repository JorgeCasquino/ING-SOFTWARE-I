import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDpzu9eI4FkCLyWcU5SylI3NWDLQCo3Cpc",
  authDomain: "traductor-ia.firebaseapp.com",
  projectId: "traductor-ia",
  storageBucket: "traductor-ia.appspot.com",
  messagingSenderId: "143522908534",
  appId: "1:143522908534:web:a5dd0f0758fd3562079257",
  measurementId: "G-KN2R5GSV3R"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
