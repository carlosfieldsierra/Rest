import React from 'react'
import { TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native';
import { View, Text,ScrollView } from 'react-native'
import { or } from 'react-native-reanimated';
import {GetRestaurants,OrderSubscribe,DeleteOrder,SetOrderState} from "./restaurantapi/orderapi"
import {app} from "./api/api"
import * as Clipboard from 'expo-clipboard';

const OrderBox = ({order})=>{
    const [stateInput,setStateInput] = React.useState("");
    const handleCancel = ()=>{
        async function deletTheOrder(){

            await DeleteOrder(order.uid);
        }
        deletTheOrder();
    }

    const newOrderStateHandler = ()=>{

        SetOrderState(order.uid,stateInput);
    }
    

    
    return (
           <View  style={{width:"80%",height:150,backgroundColor:"gray",margin:10,justifyContent:"center",alignItems:"center"}}>
                <Text > Order recived at: {order.time===""?"2:12pm":order.time}  </Text>
                <View style={{flexDirection:'row',}}>
                    <View style={{borderRadius:10,backgroundColor:"#ffff",padding:10,marginRight:5}}>
                        <Text >State:{order.state}</Text>
                    </View>
                    <TouchableOpacity style={{borderRadius:10,backgroundColor:"red",padding:10}}>
                        <Text onPress={  handleCancel} style={{color:"white"}}>Cancel Order</Text>
                    </TouchableOpacity>

                </View>
                <View style={{marginTop:20,flexDirection:'row',justifyContent:"center",alignItems:"center"}}>
                    <TextInput value={stateInput} onChangeText={val=>setStateInput(val)} style={{color:"white",width:200,padding:10,backgroundColor:"black",fontSize:20}} placeholderTextColor="white"  placeholder="Enter state of order"/>
                    <TouchableOpacity  onPress={newOrderStateHandler} style={{marginLeft:10,borderRadius:10,backgroundColor:"red",padding:10}}>
                        <Text>Submit</Text>
                    </TouchableOpacity>
                </View>
            </View>
   
    )
}



const App = () => {
    const [loggedIn,setLoggedIn] = React.useState(false);
    const [myData,setMyData] = React.useState({});
    const [orders,setOrders] = React.useState([])
    const [uid,setUid] =React.useState("");
    const copyToClipboard = () => {
        Clipboard.setString(uid);
    }


    React.useEffect(()=>{
        if (loggedIn){
            const uidS = myData.uid;
            // setUid(uid);
            async function fetchOrders(){
                await OrderSubscribe(uidS,setOrders);
            } 
            fetchOrders();
    }


    },[loggedIn])
    
    const loginHandler = async ()=>{
        // gets my resturant
        const resturantt = await GetRestaurants(setUid);
        if (resturantt.length!==0){

            setMyData(resturantt[0]);
        
            setLoggedIn(true);
        }
    }
    React.useEffect(()=>{

        app.auth().onAuthStateChanged((user) => {
            setUid(user.uid);
        });
  
      app
        .auth()
        .signInAnonymously()
        .then(() => {
          //setLoggedIn(true);
        })
        .catch((error) => {
          console.error(error);
        });

    },[])
      
  
  
    
    if (!loggedIn){
        return (
            <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                <Text style={{fontWeight:"bold",fontSize:40,marginBottom:100}}>Restaurant Login</Text>
                <TouchableOpacity onPress={loginHandler} style={{backgroundColor:"gray",padding:20,borderRadius:100}}>
                    <Text style={{fontSize:50}}>LOGIN</Text>
                    
                </TouchableOpacity>
                <TouchableOpacity onPress={copyToClipboard}>
                    <Text style={{marginTop:20}}>YOUR UID IS: {uid}</Text>

                </TouchableOpacity>

            </View>
        )
    }
    if (orders.length===0){
        return (<View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
            <Text style={{fontSize:50}}>No Placed Orders</Text>
        </View>
        )
    }
  
    return (
        <View style={{flex:1}}>
            
            <View style={{flex:.3,justifyContent:"center",alignItems:"center"}}>
                <Text style={{fontWeight:"bold",fontSize:100,color:"black"}}>Orders</Text>
            </View>

            <ScrollView style={{flex:1,flexDirection:"column"}}>
                <View style={{flex:1,justifyContent:"space-around",alignItems:"center"}}>
                    {
                        orders.map(order=>{
                            return <OrderBox   key={order.uid+`${Math.random()*19}`} order={order}/>
                        })
                    }
                </View>

            </ScrollView>
        
        </View>
    )
}

export default App
