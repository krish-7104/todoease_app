import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDSqR2qC7BMGK6e1XXpgiHWxI_dWsNq50c",
  authDomain: "todoease.firebaseapp.com",
  projectId: "todoease",
  storageBucket: "todoease.appspot.com",
  messagingSenderId: "178401601604",
  appId: "1:178401601604:web:dc397fb2f25367c0d2b411",
};

let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export { db, auth };
