import React from 'react'
import { View, Text,Dimensions,ScrollView ,TouchableOpacity} from 'react-native'
const {width,hieght} = Dimensions.get("screen")
import { Octicons } from '@expo/vector-icons'; 

const Steps = (props) => {
    // Current order being made
    const [order,setOrder] = React.useState({
        "0":"",
        "1":"",
        "2":"",
    });
    const [clickedOn,setClickedOn] = React.useState({
        "0":"",
        "1":"",
        "2":"",
    });

    
   
    // Handles all the logic
    // For adding orders
    const addOrderBtnHandler = ()=>{
        props.addOrder([order["0"],order["1"],order["2"]]);
    }
    
    return (
        <View>
            <ScrollView showsVerticalScrollIndicator={false} style={{flexDirection:"column",hieght:hieght}}>
                    <View style={{flex:1,hieght:hieght}}>

                        <Step clickedOn={clickedOn} setClickedOn={setClickedOn} order={order} setOrder={setOrder} idx={0} name="Broth" choices={["Pork","Beef","Chicken"]} width={width} hieght={hieght}/>
                        <Step clickedOn={clickedOn} setClickedOn={setClickedOn}  order={order} setOrder={setOrder} idx={1} name="Toppings" choices={["Green onion","Bamboo shoots","Habenero"]} width={width} hieght={hieght}/>
                        <Step  clickedOn={clickedOn} setClickedOn={setClickedOn}  order={order} setOrder={setOrder} idx={2} name="Spicy Level" choices={["mild","medium","high"]} width={width} hieght={hieght}/>
                    </View>

            </ScrollView>
            <View style={{width:"100%",justifyContent:'center',alignItems:"center"}}>

                <TouchableOpacity onPress={addOrderBtnHandler} style={{backgroundColor:"red",borderRadius:20,padding:10}} >
                    <Text style={{fontSize:20,fontWeight:"bold"}}>Add Ramen Bowl Rudly</Text>
                </TouchableOpacity>
            </View>
            
        </View>
    )
}

const Step = ({ clickedOn,setClickedOn ,order,setOrder,idx,width,hieght,name,choices})=>{
    function makeSelection(i){
        const newClickedOn = {
            "0":false,
            "1":false,
            "2":false,
        }
        newClickedOn[idx.toString()]=true;
        setClickedOn(newClickedOn);
        const newOrder = {
            "0":"",
            "1":"",
            "2":"",
        }
        for (var j in order){
            newOrder[j.toString()]=order[j.toString()];
        }
        newOrder[idx.toString()]=`${idx}.${i}`
        setOrder(newOrder);
        console.log(newOrder)
    }

    return (
        <View style={{width:width,backgroundColor:"#D3D3D3",paddingLeft:10,marginBottom:10,flexDirection:"row"}} >
            <View style={{flex:1}}>
                {/* Header */}
                <View style={{flex:1}}>
                    <Text style={{marginLeft:10,fontSize:30,color:"black", fontWeight:"bold"}}>{name}</Text>
                </View>
                {/* Choices */}
                <View style={{flex:1}}>
                    {
                        choices.map((choice,i) =>{
                            return (
                                    <View key={Math.random()*10} style={{flex:1,flexDirection:"row",alignItems:"center",justifyContent:"flex-end"}}>
                                        <Text style={{fontWeight:"bold",fontSize:18,marginRight:10}}>{choice}</Text>
                                        <TouchableOpacity  onPress={()=>makeSelection(i)}>
                                            {order[idx.toString()]===`${idx}.${i}`?<Octicons name="primitive-dot" size={30} color="black" />:<Octicons name="primitive-dot" size={30} color="white" />}
                                        </TouchableOpacity>
                                    </View>
                                    
                            )
                        })
                    }

                </View>

            </View>
            <View style={{width:"50%"}}>

            </View>


        </View>
    )
}

export default Steps
