import firebase from "firebase";
var firebaseConfig = {
  apiKey: "AIzaSyBI1cWy7N2fjvIflAxETPU9ffTiLh1Wb88",
  authDomain: "todo-app-using-firebase-53db5.firebaseapp.com",
  projectId: "todo-app-using-firebase-53db5",
  storageBucket: "todo-app-using-firebase-53db5.appspot.com",
  messagingSenderId: "42431044531",
  appId: "1:42431044531:web:8b2ad7d557aa9a5d24c9c6",
  measurementId: "G-J9KNRH32Q7",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;
export const auth = firebase.auth();
export const db = firebase.firestore;
