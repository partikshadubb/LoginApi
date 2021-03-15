import React, { Fragment } from "react";
import { createStackNavigator } from '@react-navigation/stack';
// import Login from "../Screens/Login/Login";
import { Login,Signup } from "../Screens";
import navigationStrings from "../constants/navigationStrings";

const Stack = createStackNavigator();

function AuthStack() {

    return (
        <Fragment>
 

           
            <Stack.Screen
                component={Signup}
                options={{
                    headerShown: false
                }}
                name={navigationStrings.SIGNUP}

            />
           
           <Stack.Screen
                component={Login}
                options={{
                    headerShown: false
                }}
                name={navigationStrings.LOGIN}

            />
        </Fragment>
    )


}


export default AuthStack