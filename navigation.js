import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./screens/Home";
import RestaurantDetail from "./screens/RestaurantDetail";
import { Provider as ReduxProvider } from "react-redux";
import configureStore from "./redux/store";
import OrderCompleted from "./screens/OrderCompleted";
import LocApi, {GetDistance} from "./api/locapi";
// data
import { UserContext, UserProvider } from "./store/UserProvider";
import LoginScreen from "./screens/LoginScreen";
import OrdersScreen from "./screens/OrdersScreen"
const store = configureStore();

export default function RootNavigation() {
  const Stack = createStackNavigator();

  const screenOptions = {
    headerShown: false,
  };

  return (
    <ReduxProvider store={store}>
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="loginScreen" screenOptions={screenOptions}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="RestaurantDetail" component={RestaurantDetail} />
          <Stack.Screen name="OrderCompleted" component={OrderCompleted} />
          <Stack.Screen name="loginScreen" component={LoginScreen}/>
          <Stack.Screen name="orderscreen" component={OrdersScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
        <LocApi/>
      </UserProvider>
      </ReduxProvider>
  );
}
