import React from "react";
import { View, Text,TouchableOpacity,Dimensions } from "react-native";
import { Divider } from "react-native-elements";
import About from "../components/restaurantDetail/About";
import MenuItems from "../components/restaurantDetail/MenuItems";
import Steps from "../components/restaurantDetail/Steps";
import ViewCart from "../components/restaurantDetail/ViewCart";
const {width,height} = Dimensions.get("screen")
import {PushOrder} from "../api/orderapi"
import { app} from "../api/api";
import {UserContext} from "../store/UserProvider"

const foods = [
  {
    title: "Lasagna",
    description: "With butter lettuce, tomato and sauce bechamel",
    price: "$13.50",
    image:
      "https://www.modernhoney.com/wp-content/uploads/2019/08/Classic-Lasagna-14-scaled.jpg",
  },
  {
    title: "Tandoori Chicken",
    description:
      "Amazing Indian dish with tenderloin chicken off the sizzles 🔥",
    price: "$19.20",
    image: "https://i.ytimg.com/vi/BKxGodX9NGg/maxresdefault.jpg",
  },
  {
    title: "Chilaquiles",
    description:
      "Chilaquiles with cheese and sauce. A delicious mexican dish 🇲🇽",
    price: "$14.50",
    image:
      "https://i2.wp.com/chilipeppermadness.com/wp-content/uploads/2020/11/Chilaquales-Recipe-Chilaquiles-Rojos-1.jpg",
  },
  {
    title: "Chicken Caesar Salad",
    description:
      "One can never go wrong with a chicken caesar salad. Healthy option with greens and proteins!",
    price: "$21.50",
    image:
      "https://images.themodernproper.com/billowy-turkey/production/posts/2019/Easy-italian-salad-recipe-10.jpg?w=1200&h=1200&q=82&fm=jpg&fit=crop&fp-x=0.5&fp-y=0.5&dm=1614096227&s=c0f63a30cef3334d97f9ecad14be51da",
  },
  {
    title: "Lasagna",
    description: "With butter lettuce, tomato and sauce bechamel",
    price: "$13.50",
    image:
      "https://thestayathomechef.com/wp-content/uploads/2017/08/Most-Amazing-Lasagna-2-e1574792735811.jpg",
  },
];

export default function RestaurantDetail({ route, navigation }) {
  const context = React.useContext(UserContext);
 const  restaurantuid= route.params.restaurantuid;
  // All the orders the user has set
  const [orders,setOrders] = React.useState([]);
  // Add to orders 
  const addOrder = (newBowl)=>{
    setOrders([...orders,newBowl]);
    context.setOrders([...orders,newBowl]);
   
  }

  // Place order handler 
  const placeOrderHandler = async ()=>{
    await PushOrder(restaurantuid,orders); 
  }
  return (
    <View>
      <About route={route} />
      <Divider width={1.8} style={{ marginVertical: 2 }} />
      {/*  */}
      <View>
        <Text>Quanity: {orders.length}</Text>
        <Text>Price: {`$${parseInt(13.95*orders.length)}`}</Text>
      </View>
      {/* Steps */}
      <Steps addOrder ={addOrder}/>
      {/* Order Button */}
      <View style={{justifyContent:"center",alignItems:"center",marginTop:30}}>
        
        <TouchableOpacity onPress={placeOrderHandler} style={{width:width/1.2,height:100,borderRadius:20,backgroundColor:"lightblue",justifyContent:"center",alignItems:"center"}}>
          <Text style={{fontSize:30,fontWeight:"bold"}}>Place Order</Text>
        </TouchableOpacity>
      </View>

      <ViewCart navigation={navigation} />
    </View>
  );
}
