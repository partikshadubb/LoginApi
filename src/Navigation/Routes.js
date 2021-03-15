import React,{Fragment} from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack"
import AuthStack from "./AuthStack";
import Login from "../Screens/Login/Login";
import MainStack from "./MainStack";

const Stack = createStackNavigator();




export default function ({isLogged}) {
    // console.log(isLogged,"routes")

    return (
        <NavigationContainer>
        <Stack.Navigator>
        {!isLogged && AuthStack()}
                    {MainStack()}
 
         
        </Stack.Navigator>
    </NavigationContainer>
    )

}