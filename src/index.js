// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyC71Yj2cu-br9eAJ0e4G71sXCMaz3GkY8I",
    authDomain: "xpense-400b7.firebaseapp.com",
    projectId: "xpense-400b7",
    storageBucket: "xpense-400b7.appspot.com",
    messagingSenderId: "654131006558",
    appId: "1:654131006558:web:7411 e494e6c238a922f8cf"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore();


ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);
export default db;