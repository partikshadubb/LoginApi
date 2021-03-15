import React from 'react';
import {ActivityIndicator,View}from 'react-native';

export default function Loader({isLoading}){

    if(isLoading){
        return(
        <View style={{position:'absolute',top:0,right:0,left:0,bottom:0,
        justifyContent:"center",
        alignItems:"center",backgroundColor:"rgba(0,0,0,0.4)"}}>
        <ActivityIndicator color="red"  size="large"/>
        </View>
        )
    }

    return(null);
}