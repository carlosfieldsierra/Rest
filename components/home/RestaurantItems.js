import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { AntDesign } from '@expo/vector-icons'; 

export const localRestaurants = [
  {
    name: "Rude Ramen: Beachside",
    image_url:require("../../assets/images/place1.jpg") ,
    categories: ["Cafe", "Bar"],
    price: "$$",
    reviews: 1244,
    rating: 4.5,
  },
  {
    name: "Rude Ramen: Benihana",
    image_url: require("../../assets/images/place2.jpg") ,

    categories: ["Cafe", "Bar"],
    price: "$$",
    reviews: 1244,
    rating: 3.7,
  },
  {
    name: "Rude Ramen: Foothills",
    image_url: require("../../assets/images/place3.jpg") ,
    categories: ["Indian", "Bar"],
    price: "$$",
    reviews: 700,
    rating: 4.9,
  },
];


export default function RestaurantItems({ navigation, ...props }) {
  
  const makeHeartedDic = (restaurantData)=>{
    const heartedDic = {};
    for (var i in restaurantData){
      heartedDic[i]=false;
    }
    return heartedDic;
  }
  // const intialState = makeHeartedDic(props.restaurantData);
  const [hearted,setHearted] = React.useState({
    "0": false,
    "1": false,
    "2": false,
  });
  
  const heartImage = (index)=>{
    hearted[index]=!hearted[index];
    setHearted({...hearted})
  }
  return (
    <>
      {props.restaurantData.map((restaurant, index) => (
        <TouchableOpacity
          key={index}
          activeOpacity={1}
          style={{ marginBottom: 30 }}
          onPress={() =>
            navigation.navigate("RestaurantDetail", {
              name: restaurant.name,
              image: restaurant.image_url,
              price: restaurant.price,
              reviews: restaurant.reviews,
              rating: restaurant.rating,
              categories: restaurant.categories,
              restaurantuid:restaurant.uid,
            })
          }
        >
          <View
            style={{ marginTop: 10, padding: 15, backgroundColor: "white" }}
          >
            <RestaurantImage image={restaurant.image_url}  hearted={hearted[index]}  onPress={()=>{heartImage(index)}}/>
            <RestaurantInfo name={restaurant.description} rating={restaurant.rating} distance={restaurant.distance} />
          </View>
        </TouchableOpacity>
      ))}
    </>
  );
}

const RestaurantImage = (props) => {
  return (
    <>
      <Image
        source={
          props.image
        }
        style={{ width: "100%", height: 180 }}
      />
      <TouchableOpacity onPress={props.onPress} style={{ position: "absolute", right: 20, top: 20 }}>
        {!props.hearted===true?<MaterialCommunityIcons name="heart-outline" size={25} color="#fff" />:
        <AntDesign name="heart" size={25} color="red" />
        }
      </TouchableOpacity>
    </>)
    
    };

const RestaurantInfo = (props) => (
  
  <View
    style={{
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 10,
    }}
  >
    <View>
      <Text style={{ fontSize: 15, fontWeight: "bold" }}>{props.name}</Text>
      <Text style={{ fontSize: 13, color: "gray" }}>{parseInt(props.distance)} Miles | 30-40 mins</Text>
    </View>
    <View
      style={{
        backgroundColor: "#eee",
        height: 30,
        width: 30,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 15,
      }}
    >
      <Text>{props.rating}</Text>
    </View>
  </View>
);
