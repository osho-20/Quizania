import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyAkRqLIPlblz9kdP5DjVMUktQBSH5DKeso",
    authDomain: "quizania-cafe7.firebaseapp.com",
    projectId: "quizania-cafe7",
    storageBucket: "quizania-cafe7.appspot.com",
    messagingSenderId: "325788954525",
    appId: "1:325788954525:web:62d470f754d2a481500974",
    measurementId: "G-VCPRML3CLH"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const firestore = getFirestore(app);
export { app, auth, firestore };