import firebase from "firebase/app";
require("firebase/auth");
import "firebase/firestore";
import { DataContext } from "../store/UserProvider";

import React, { useEffect } from "react";

// config
const firebaseConfig = {
  apiKey: "AIzaSyBk7sHiW7lXZzWTstDEXyEncdCDJjqa2FY",
  authDomain: "ruderestaurant-e21bf.firebaseapp.com",
  projectId: "ruderestaurant-e21bf",
  storageBucket: "ruderestaurant-e21bf.appspot.com",
  messagingSenderId: "948919900781",
  appId: "1:948919900781:web:0ea059757b3a5f8d74bd64",
  measurementId: "G-5B15FM4BP9",
};

// initilize app
// this is hoisted
export let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

// supported types:
//  silent login
//  username and password
module.exports.LoginType = {
  Silent: 0,
  UsernamePassword: 1,
};

export const GenerateUID = () => {
  var result = "";
  var characters = "0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < charactersLength; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

// for LoginType.UsernamePassword, data is data.username and data.password
// TODO: something on error
export const Login = (type, data = undefined) => {
  // force silent for null type
  if (type == null || type == undefined) type = module.exports.LoginType.Silent;
  // login silent if type is silent, if data is undefined, or if data.username or data.password is undefined
  if (
    type == module.exports.LoginType.Silent ||
    (type == module.exports.LoginType.UsernamePassword &&
      (data == undefined
        ? true
        : data.username == undefined || data.password == undefined))
  ) {
    firebase
      .auth()
      .signInAnonymously()
      .then(() => {})
      .catch((error) => {
        console.error(error);
      });
  } else {
    // login username pass

    firebase
      .auth()
      .createUserWithEmailAndPassword(data.username, data.password)
      .then(() => {})
      .catch((error) => {
        console.error(error);
      });
  }
};

// TODO do something
export const Logout = () => {
  firebase.auth().signOut();
};

export const db = app.firestore();
