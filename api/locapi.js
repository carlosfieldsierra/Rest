import React, { useState, useEffect } from "react";
import { Platform, Text, View, StyleSheet } from "react-native";
import * as Location from "expo-location";

import { UserContext } from "../store/UserProvider";

// calculates distance in miles given lat, lon, lat2, lon2
export const GetDistance = (coord1, coord2, unit) => {
  var lat1 = coord1.latitude;
  var lon1 = coord1.longitude;
  var lat2 = coord2.latitude;
  var lon2 = coord2.longitude;
  if (lat1 == lat2 && lon1 == lon2) {
    return 0;
  } else {
    var radlat1 = (Math.PI * lat1) / 180;
    var radlat2 = (Math.PI * lat2) / 180;
    var theta = lon1 - lon2;
    var radtheta = (Math.PI * theta) / 180;
    var dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    if (unit == "K") {
      dist = dist * 1.609344;
    }
    if (unit == "N") {
      dist = dist * 0.8684;
    }
    return dist;
  }
};

// context.location = coordinates {latitude, longituyde}
export default LocApi = (props) => {
  const { location, setLocation } = React.useContext(UserContext); // read only
  React.useEffect(() => {
    
    async function func() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    }
    func();
  }, [])
  return null;
};
