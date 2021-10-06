import React from 'react'
import { View, Text,ScrollView, TouchableOpacity} from 'react-native'
import { set } from 'react-native-reanimated'
import {OrderSubscribe,DeleteOrder,GetOrders} from "../api/orderapi"
import BottomTabs from '../components/home/BottomTabs'
import {UserContext} from "../store/UserProvider"


const OrderBox = ({order,deleteOrderHandler})=>{
    const handleCancel = ()=>{
        deleteOrderHandler(order.uid);
    }
   
    

    
    return (
           <View  style={{width:"80%",height:100,backgroundColor:"gray",margin:10,justifyContent:"center",alignItems:"center"}}>
                <Text > Order recived at: {order.time===""?"2:12pm":order.time}  </Text>
                <View style={{flexDirection:'row',}}>
                    <View style={{borderRadius:10,backgroundColor:"#ffff",padding:10,marginRight:5}}>
                        <Text >State:{order.state}</Text>
                    </View>
                    <TouchableOpacity style={{borderRadius:10,backgroundColor:"red",padding:10}}>
                        <Text onPress={  handleCancel} style={{color:"white"}}>Cancel Order</Text>
                    </TouchableOpacity>

                </View>
            
            </View>
   
    )
}

const OrdersScreen = () => {
    const {orders,setOrders} = React.useContext(UserContext);
    const deleteOrderHandler =  (uid)=>{
        async function handleDelete(){

            await DeleteOrder(uid);
        }
        handleDelete();
    }
    // Get orders when its first loaded
    React.useEffect(()=>{
        const fetchOrders  = async ()=>{
            const orders = await GetOrders();
            setOrders(orders);
        }
        fetchOrders();
    },[])
    // Subscribe to changes in orders
    React.useEffect(() => {
        async function subToOrders(){
            await OrderSubscribe(newOrders => {
                setOrders(newOrders);
            })
        }
        subToOrders();
            
    },[])

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
                            return < OrderBox deleteOrderHandler={deleteOrderHandler} key={order.uid+`${Math.random()*19}`} order={order}/>
                        })
                    }
                </View>

            </ScrollView>
        
        </View>
    )
}

export default OrdersScreen
