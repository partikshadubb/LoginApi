import React ,{ Component } from "react";
import {View,Text,TouchableOpacity,Image,TextInput,StyleSheet } from "react-native";
import reactNativeConfig from "../../../react-native.config";
import navigationStrings from "../../constants/navigationStrings";
import fontFamily from "../../styles/fontFamily";
import {showMessage} from 'react-native-flash-message'
import validator from "../../utils/validations";
import api from '../../apis'
//import Test from "./Test";

class Login extends Component{
   constructor(props){
super(props);
this.state={
  userEmail:"",
  password:"",
}
   }
   

   onAddText(key) {
 
    return (value) => {
      this.setState({ [key]: value });
    };
  }

    isValidData = () => {
      const {userEmail,password}=this.state
    const error=validator({ email:userEmail, password:password }) 
   if (error) { 
     showMessage({
     type:"danger",
   icon:"danger",
   message:error
     })
     return false;
    } 


    api.login({ email: userEmail, password:password})
  .then((res)=>{
    
    console.log(res)
    showMessage({
      message:"Login Successfully",
      type:"success"
    })
  })
  .catch((error) => {
   
    console.log(error)
  })
  this.props.navigation.navigate('homePage')
     return true; 
   };
   
  render(){
const {userEmail,password}=this.state
    return(
      <View style={styles.flexView}>

<View
          style={styles.part1}
        >
          
          <Text style={styles.textPart1}>
            Login 
          </Text>
          <View style={styles.part2}>
            <TouchableOpacity>
              <View
                style={styles.facebookView}
              >
                <Image
                  style={styles.facebookImage}
                  source={{
                    uri:
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKKgI9pF1hBouy0Xt5sm16Or0Y7uSEFGoiEQ&usqp=CAU",
                  }}
                />
                <Text>FACEBOOK</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View
                style={styles.googleView}
              >
                <Image
                  style={styles.googleImage}
                  source={{
                    uri:
                      "https://o.remove.bg/downloads/5caff0f4-7995-4de2-b401-ad15b581e0f6/c3a26c0c8b6110d2e232e72c79c1ba68-removebg-preview.png",
                  }}
                />
                <Text>GOOGLE</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.inputView}>
            <Text style={styles.inputViewText}>-USING EMAIL-</Text>
          </View>
        
            <TextInput
              placeholder="Your Email Address"
              onChangeText={this.onAddText("userEmail")}
            
              style={styles.textInputField}
            />
          

         
            <TextInput
              placeholder="Enter Password"
              onChangeText={this.onAddText("password")}
              secureTextEntry={true}
              style={styles.textInputField}
            />
          

          <TouchableOpacity onPress={this.isValidData}>
            <View
              style={styles.loginButton}
            >
              <Text
                style={styles.textLogin}
              >
                LOGIN
              </Text>
            </View>
          </TouchableOpacity >
          <View style={styles.footerView}>
            <Text style={styles.footerViewText}>
              Create an account!
            </Text>
            <Text
              onPress={() => this.props.navigation.navigate("signup")}
              style={styles.footerViewText2}
            >
              Register
            </Text>
          </View>
        </View>

         
         
      </View>
    )
  }
}


export default Login;
const styles = StyleSheet.create({
flexView:{flex:1,marginTop:30},
part1:{
  justifyContent: "center",
  alignItems: "center",
  marginTop: 140,
},
textPart1:{ fontSize: 20, color: "grey", fontFamily: fontFamily.regular },
part2:{ flexDirection: "row", marginTop: 40 },
facebookView:{
  flexDirection: "row",
  borderWidth: 1,
  padding: 15,
  borderColor: "grey",
  borderRadius: 5,
  marginRight: 20,
  width: 130,
},
facebookImage:{ height: 20, width: 20, marginRight: 10 },
googleView:{
  flexDirection: "row",
  borderWidth: 1,
  padding: 15,
  borderColor: "grey",
  borderRadius: 5,
  width: 130,
},
googleImage:{ height: 20, width: 20, marginRight: 10 },
inputView:{ marginTop: 40 },
inputViewText:{ fontSize: 15, color: "grey" },
textInputField:{padding:10,width:300, borderWidth:1 ,marginBottom:20,marginTop:10,borderRadius:10,borderColor:"grey"},
loginButton:{
  marginTop: 20,
  height: 60,
  backgroundColor: "#e0436c",
  width: 300,
  justifyContent: "center",
  alignItems: "center",
  borderRadius: 10,
},
textLogin:{ fontSize: 17, fontWeight: "bold", color: "white" },
footerView:{ flexDirection: "row", marginTop: 10 },
footerViewText:{ color: "gray", fontSize: 15 },
footerViewText2:{
  fontSize: 16,
  fontWeight: "bold",
  color: "#e0436c",
  marginLeft: 5,
},
})