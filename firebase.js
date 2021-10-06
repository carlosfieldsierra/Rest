import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBk7sHiW7lXZzWTstDEXyEncdCDJjqa2FY",
  authDomain: "ruderestaurant-e21bf.firebaseapp.com",
  projectId: "ruderestaurant-e21bf",
  storageBucket: "ruderestaurant-e21bf.appspot.com",
  messagingSenderId: "948919900781",
  appId: "1:948919900781:web:0ea059757b3a5f8d74bd64",
  measurementId: "G-5B15FM4BP9"
};

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

export default firebase;
