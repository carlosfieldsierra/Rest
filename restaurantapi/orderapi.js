import React, { useState, useEffect } from "react";
import { Platform, Text, View, StyleSheet } from "react-native";
import * as Location from "expo-location";

import { UserContext } from "../store/UserProvider";

import { app } from "../api/api";
import firebase from "firebase/app";
import { collection, query, where, getDocs } from "firebase/firestore";

// get an array of restaurant objects that we are authroized for
export const GetRestaurants = async (setUid) => {
  console.log(`Resturant uid ${app.auth().currentUser.uid}`)  
  // setUid(app.auth().currentUser.uid);
  var arr = [];
  const snap = await app
  .firestore()
  .collection("restaurants")
  .where("authorized", "array-contains", app.auth().currentUser.uid)
  .get()
  .catch(error => {
    alert(error)
  })
    
  snap.forEach((doc) => {
    var temp = doc.data();
    temp.uid = doc.id;
    arr.push(temp);
  });
  return arr;
};

// subscribe to order updates for the given restaurant
// order.uid is order UID
// order.restaurant is the restaurant for that order
export const OrderSubscribe = async (restaurant,setOrders) => {
  console.log(restaurant)
  const subscriber = app
    .firestore()
    .collection("orders")
    .where("restaurant", "==", restaurant)
    .onSnapshot((snap) => {
      var arr = [];
      snap.forEach((doc) => {
        var temp = doc.data();
        temp.uid = doc.id;
        arr.push(temp);
      });
      setOrders(arr);
      
    });
  return subscriber;
};
// deletes an order given the uid
export const DeleteOrder = async (uid) => {
  console.log(uid);
    await app.firestore().collection("orders").doc(uid).delete();
  }; 

  // set the order state for a given order uid and a new state
export const SetOrderState = async (uid, st) => {
  var docSnap = await app
    .firestore()
    .collection("orders")
    .doc(uid)
    .update({ state: st });
};