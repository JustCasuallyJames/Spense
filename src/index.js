import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC71Yj2cu-br9eAJ0e4G71sXCMaz3GkY8I",
    authDomain: "xpense-400b7.firebaseapp.com",
    projectId: "xpense-400b7",
    storageBucket: "xpense-400b7.appspot.com",
    messagingSenderId: "654131006558",
    appId: "1:654131006558:web:7411e494e6c238a922f8cf"
};

initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

