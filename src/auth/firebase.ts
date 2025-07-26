// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCPjf4NXldu-rExcOjso1mtJCFOYr3MFws",
  authDomain: "cinemood-6b932.firebaseapp.com",
  projectId: "cinemood-6b932",
  storageBucket: "cinemood-6b932.firebasestorage.app",
  messagingSenderId: "514738685093",
  appId: "1:514738685093:web:4625f458d695fc2b82794c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
