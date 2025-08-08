import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCPjf4NXldu-rExcOjso1mtJCFOYr3MFws",
  authDomain: "cinemood-6b932.firebaseapp.com",
  projectId: "cinemood-6b932",
  storageBucket: "cinemood-6b932.firebasestorage.app",
  messagingSenderId: "514738685093",
  appId: "1:514738685093:web:4625f458d695fc2b82794c",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
