
import firebase from 'firebase/app';
import 'firebase/firestore';
import "firebase/storage";

var firebaseConfig = {
    apiKey: "AIzaSyCv2ZpIqp6F1ZUbe85y_BXN5FI_DJrfYNM",
    authDomain: "articles-app-ee9b6.firebaseapp.com",
    projectId: "articles-app-ee9b6",
    storageBucket: "articles-app-ee9b6.appspot.com",
    messagingSenderId: "378513339837",
    appId: "1:378513339837:web:2818aee6e540c857c04ed4",
    measurementId: "G-GSYQZRDGBB"
};
// Initialize Firebase
firebase.initializeApp( firebaseConfig );
//firebase.analytics();
const storage = firebase.storage();

export { storage, firebase };
// export default firebase;