import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import {initializeFirestore} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAcINpYaXd9Dzx9Kiv5-yJRWWyOr3R-Uoo",
    authDomain: "login-97204.firebaseapp.com",
    projectId: "login-97204",
    storageBucket: "login-97204.appspot.com",
    messagingSenderId: "71636655935",
    appId: "1:71636655935:web:56dbc489c6a07c685a3d8a"
};
var app;
if (!firebase.apps.length){
    app = firebase.initializeApp(firebaseConfig);
}
const db = initializeFirestore(app, {
    experimentalForceLongPolling: true,
});

export { firebase, db };