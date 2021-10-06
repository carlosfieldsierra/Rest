import React, { useEffect, useLayoutEffect, useState } from "react";
import { View, Text, SafeAreaView, ScrollView } from "react-native";
import { Divider } from "react-native-elements";
import BottomTabs from "../components/home/BottomTabs";
import Categories from "../components/home/Categories";
import HeaderTabs from "../components/home/HeaderTabs"
import {QueryRestaurantsByLocation, OrderSubscribe, PushOrder} from "../api/orderapi"
import {GetDistance} from '../api/locapi'
import { UserContext } from "../store/UserProvider";


import RestaurantItems, {
  localRestaurants,
} from "../components/home/RestaurantItems";
import SearchBar from "../components/home/SearchBar";
import OrdersScreen from "./OrdersScreen";

const YELP_API_KEY =
  "bdRJutLhFAQJ36t7b89CWjHFBU4OKzjt9wvZzcY-nkgmvTqlNMjZWV1eG7iBQ9R74SyfxRg9LWnBAkZY06BtAZAe4d2dfX-2vuX8a1l5V7foctHfX9UKEyoM5ts3YXYx";

export default function Home({ navigation }) {

  // listen to order changes and call 'setOrders'

  const {location, setOrders} = React.useContext(UserContext);
  const [restaurantData, setRestaurantData] = useState(localRestaurants);

  // Subscribe to order changes
  React.useEffect(() => {
    async function subToOrders(){
      await OrderSubscribe(newOrders => {
          setOrders(newOrders);
       
      });
    }
    subToOrders();
  }, [])
  //  Set resturant data
  React.useEffect(()=>{
    async function getResturtantData() {
      if (location) {
        var arr = await QueryRestaurantsByLocation(location.coords.latitude, location.coords.longitude);
        const newArr = arr.map((obj,idx)=>{
          if (idx==0){

            obj.image_url=require(`../assets/images/place1.jpg`);
          } else if (idx==1){
            obj.image_url=require(`../assets/images/place2.jpg`);
          } else {
            obj.image_url=require(`../assets/images/place3.jpg`);
          }
          obj.price= "$$";
          obj.categories =["Cafe", "Bar"],
          obj.reviews=1244;
          obj.rating= 4.5;
          obj.distance =GetDistance(obj.coordinates,location.coords);
          return obj;
        })
        setRestaurantData(newArr);
      }
    }
    getResturtantData();
  },[location])









  const [city, setCity] = useState("San Francisco");
  const [activeTab, setActiveTab] = useState("Delivery");

  const getRestaurantsFromYelp = () => {
    const yelpUrl = `https://api.yelp.com/v3/businesses/search?term=restaurants&location=${city}`;

    const apiOptions = {
      headers: {
        Authorization: `Bearer ${YELP_API_KEY}`,
      },
    };

    return fetch(yelpUrl, apiOptions)
      .then((res) => res.json())
      .then((json) =>
        setRestaurantData(
          json.businesses.filter((business) =>
            business.transactions.includes(activeTab.toLowerCase())
          )
        )
      );
  };

  

  useEffect(() => {
    getRestaurantsFromYelp();
  }, [city, activeTab]);

  const [orderScreen,setOrderScreen] = React.useState(false);
  return (
    <SafeAreaView style={{ backgroundColor: "#eee", flex: 1 }}>
      <View style={{ backgroundColor: "white", padding: 15 }}>
        <HeaderTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <SearchBar cityHandler={setCity} />
      </View>
      {orderScreen!==true?<ScrollView showsVerticalScrollIndicator={false}>
        <Categories />
        <RestaurantItems
          restaurantData={restaurantData}
          navigation={navigation}
        />
      </ScrollView>:<OrdersScreen/>}
      <Divider width={1} />
      <BottomTabs  onPressHome={()=>setOrderScreen(false)} onPressOrders={()=>setOrderScreen(true)}/>
    </SafeAreaView>
  );
}
