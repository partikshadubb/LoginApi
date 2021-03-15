import React ,{ Component, Fragment } from "react";
import {View,Text } from "react-native";
import Routes from "./src/Navigation/Routes";
import FlashMessage from 'react-native-flash-message'
import { getUserData } from "./src/utils/utils";



class App extends Component{
constructor(props){
  super(props);
  this.state={
    isLogged:false
  }
}
componentDidMount()
{
  getUserData().then((res)=>
  {
   if(res)
   {
     this.setState({isLogged:true})
   }
  })
}
  render(){
    console.log(this.state.isLogged,"app")

const {isLogged}=this.state
    return(
      <Fragment>
      <Routes isLogged={isLogged}/>
      <FlashMessage position="top"/>
      </Fragment>
    )
    
  }
}


export default App;