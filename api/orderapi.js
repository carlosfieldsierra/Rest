import React, { useState, useEffect } from "react";
import { Platform, Text, View, StyleSheet } from "react-native";
import * as Location from "expo-location";

import { UserContext } from "../store/UserProvider";

import { app, GenerateUID, GetDistance } from "../api/api";
import firebase from "firebase/app";
import { collection, query, where, getDocs } from "firebase/firestore";

/**
 * 
 * {
 *  cooridnates: [3]
 * }
 * @param {*} latitude 
 * @param {*} longitude 
 */
export const QueryRestaurantsByLocation = async (latitude, longitude) => {
  var arr = [];
  const snap = await app.firestore().collection("restaurants").get();
  snap.forEach((doc) => {
    var temp = doc.data();
    temp.uid = doc.id;
    arr.push(temp);
  });
  return arr;
};
export const GetOrders = async () => {
  
  var arr = [];
  const snap = await app
    .firestore()
    .collection("orders")
    .where("purchaser", "==", app.auth().currentUser.uid)
    .get();
  snap.forEach((doc) => {
    var temp = doc.data();
    temp.uid = doc.id;
    arr.push(temp);
  });
  return arr;
};

// bowls = [bowl_1, bowl_2, ...]
// each bowl ---> ["0.0", "1.1", "0.0"]
export const PushOrder = async (restaurant, bowls) => {
  var td = {};
  var orderId = GenerateUID(7);
  for (var i = 0; i < bowls.length; i++) {
    td["Bowl " + (i + 1)] = bowls[i];
  }
  var data = {
    data: td,
    time: "",
    state: "PreOrder",
    restaurant: restaurant,
    purchaser: app.auth().currentUser.uid,
  };
  await app.firestore().collection("orders").doc(orderId).set(data);
};

export const OrderSubscribe = (setOrders) => {
  const subscriber = app
    .firestore()
    .collection("orders")
    .where("purchaser", "==", app.auth().currentUser.uid)
    .onSnapshot((documentSnapshot) => {
      var arr = [];
      documentSnapshot.forEach((doc) => {
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
  await app.firestore().collection("orders").doc(uid).delete();
}; 
