// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA2CY6crZWrliSa5MfAoeanlYr-heQTA3g",
    authDomain: "spense-6a809.firebaseapp.com",
    projectId: "spense-6a809",
    storageBucket: "spense-6a809.appspot.com",
    messagingSenderId: "887145018902",
    appId: "1:887145018902:web:c8b18cf3a5a56613d8e737"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();

export default db;