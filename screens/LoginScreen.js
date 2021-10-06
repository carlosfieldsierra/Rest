import React from 'react'
import { View, Text,TouchableOpacity,Button } from 'react-native'
import {UserContext} from "../store/UserProvider"

import {app} from "../api/api"
import { TextInput } from 'react-native'
const LoginScreen = (props) => {

    const {loggedIn, setLoggedIn } = React.useContext(UserContext);
    React.useEffect(()=>{
        if (loggedIn){
            props.navigation.replace("Home");
        }
    },[loggedIn])

    // Login Handler
    const loginHandler = ()=>{
      app.auth().onAuthStateChanged((user) => {
        setLoggedIn(user);
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
    }



    return (
        <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
          <TextInput  placeholder="Username"/>
          <TextInput placeholder="Password" />
          <Button
          title="Login"
          onPress={loginHandler}
          />
        </View>
    )
}

export default LoginScreen
