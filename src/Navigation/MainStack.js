import React, { Fragment } from "react";
import { createStackNavigator } from '@react-navigation/stack';
// import Login from "../Screens/Login/Login";
import { Login,Signup } from "../Screens";
import navigationStrings from "../constants/navigationStrings";
import HomePage from "../Screens/Home/HomePage";

const Stack = createStackNavigator();


function MainStack() {

    return (
        <Fragment>
            
            <Stack.Screen
                component={HomePage}
                options={{
                    headerShown: false
                }}
                name={navigationStrings.HOME_PAGE}

            

            />
        </Fragment>
    )


}


export default MainStack