import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCIpXsWoIGWwUf8iicN8RKYlQbk36Dv_gs",
    authDomain: "login-451a6.firebaseapp.com",
    projectId: "login-451a6",
    storageBucket: "login-451a6.appspot.com",
    messagingSenderId: "105865665629",
    appId: "1:105865665629:web:2ebc299792227baf1e41b4",
    measurementId: "G-TMG7YHR42K"
};

firebase.initializeApp(firebaseConfig);

const apiKey = firebaseConfig.apiKey;
const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();

export{auth, apiKey, firestore, storage};