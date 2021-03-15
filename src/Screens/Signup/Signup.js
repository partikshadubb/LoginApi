import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
  PermissionsAndroid
  
} from 'react-native';
import imagePath from '../../constants/imagePath';
import navigationStrings from '../../constants/navigationStrings';
//import Test from "./Test"
import {showMessage} from 'react-native-flash-message'
import validator from '../../utils/validations';

import { date, month, year } from 'is_js';
import DateTimePicker from 'react-native-modal-datetime-picker';
import api from '../../apis';
import Loader from '../../Components/Loader';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { getUserData } from '../../utils/utils';
import * as ImagePicker from 'react-native-image-picker';
import colors from '../../styles/colors';



class Signup extends Component {
constructor(props){
  super(props);
  this.state={
    username:"",
    date:"",
    email:"",
    password:"",
    confirmPassword:"",
    isDateTimePickerVisible: false,
    isLoading: false,
    resourcePath:"https://o.remove.bg/downloads/afd3627e-3d78-434c-95bb-d5c0cd1f9897/profile-icon-vector-paradise-pink-600w-779538430-removebg-preview.png"
  }

}
onAddText(key) {
 
  return (value) => {
    this.setState({ [key]: value });
  };
}

 isValidData = () => {
  const {username,email,password,confirmPassword}=this.state
  
  const error=validator({ name:username,email:email, password:password,confirmPassword:confirmPassword }) 
 if (error) { 
   showMessage({
   type:"danger",
 icon:"danger",
 message:error
   })
   return false;
  }
  this.setState({isLoading: true})
  api.signUp({name: username, email: email, languageCode: "EN", signupType: "APP",password:password})
  .then((res)=>{
    this.setState({isLoading: false})
    console.log(res)
    showMessage({
      message:"Signup Successfully",
      type:"success"
    })
  })
  .catch((error) => {
    this.setState({isLoading: false})
    console.log(error)
  })
  this.props.navigation.navigate('homePage')

return true;
 };
 showDateTimePicker = () => {
  this.setState({ isDateTimePickerVisible: true });
};

hideDateTimePicker = () => {
  this.setState({ isDateTimePickerVisible: false });
};

handleDatePicked = (pickDate) => {
  console.log("A date has been picked: ",pickDate.getDate());
  let DateOfBirth = pickDate.getDate()
  let Month = pickDate.getMonth()
  console.log(Month)
  let Year = pickDate.getFullYear()
  let Date = DateOfBirth + "/" + Month + "/" + Year
  this.setState({date:Date}, ()=>{
    console.log(this.state)
  })
  // 3 var dob, m, y
  // dob = date.get, .getm, getFullYear
  // wntetredDAte = dob + "/" + m 
  this.hideDateTimePicker();
};

profileImageFromGallery = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      {
        title: ' Photo App Camera Permission',
        message:
          ' Photo App needs access to your camera ' +
          'so you can take awesome pictures.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the camera');
      ImagePicker.launchImageLibrary(
        {
          mediaType: 'photo',
          includeBase64: false,
          maxHeight: 200,
          maxWidth: 200,
          saveToPhotos: true,
        },
        (response) => {
          const imageData = new FormData();
          imageData.append('image',{
            uri: response.uri,
            type: response.type,
            name: response.fileName,
          });
          // this.setState({isLoading:true})
          api.uploadImage(imageData).then((res)=>{
            this.setState({resourcePath: response.uri});
            console.log(res)
          })
          .catch((error)=>{
            console.log(error)
          })
          console.log(response);
         
        },
      );
     
    }
     else {
      console.log('Camera permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};

  render() {
    const {navigation} = this.props;
    const{date, isLoading,resourcePath}= this.state
    return (
      
      <View style={styles.flexView}>
        <View style={styles.navSignup}>
          <Image
            style={styles.arrowImage}
            source={imagePath.leftArrow}
          />
          <Text style={styles.signupText}>Sign Up</Text>
        </View>
        <KeyboardAwareScrollView>
          
        <View style={styles.imageView}>
          <TouchableOpacity onPress={this.profileImageFromGallery}>
          <Image style={styles.profileImage} source={{uri:resourcePath}} />
          </TouchableOpacity>
        </View>

        <View style={styles.textFieldView}>
          <TextInput
            placeholder="Full Name"
            // value={userName}
            onChangeText={this.onAddText("username")}
            style={styles.textField}
          
          />

          <TextInput
            placeholder="Your Email Address"
            //value={userEmail}
            onChangeText={this.onAddText("email")}
            style={styles.textField2}
          />
         <View style={styles.dateView}>
         <TextInput
            placeholder="Date of birth"
             value={date}
          />
          <TouchableOpacity
            onPress={this.showDateTimePicker}
          >
            <Image style={styles.calenderimage}
            source={imagePath.calenderImage}/>
          </TouchableOpacity>
          </View>

          <TextInput
            placeholder="Set Password"
            // value={password}
            onChangeText={this.onAddText("password")}
            secureTextEntry={true}
            style={styles.textField2}
          />

          <TextInput
            placeholder="Confirm Password"
            // value={confirmPassword}
            onChangeText={this.onAddText("confirmPassword")}
            secureTextEntry={true}
            style={styles.textField2}
          />

         
          <View style={styles.footerView}>
            <Text style={styles.footerText1}>Already Registered? </Text>
            <Text
              onPress={() => this.props.navigation.navigate("login")}
              style={styles.footerText2}>
              Login
            </Text>
            <TouchableOpacity  onPress={() =>this.isValidData() }>
            <View style={styles.signupButtonView}>
              <Image style={{height:20,width:20}}
              source={imagePath.rightArrow} />
            </View>
          </TouchableOpacity>
          </View>
        </View>
<View style={styles.lastView}>
  <Text style={{color:"grey"}}>
    By Signing up you agree to our
  </Text>
  <Text style={styles.termsText}>Terms and Conditions</Text>
</View>
        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this.handleDatePicked}
          onCancel={this.hideDateTimePicker}
        />
        <Loader isLoading={isLoading} />
        </KeyboardAwareScrollView>
      </View>
      
    );
  }
}

export default Signup;
const styles = StyleSheet.create({
  flexView: {flex: 1},
  navSignup: {
    backgroundColor: 'white',
    height: 50,
    alignItems: 'center',
    paddingHorizontal: 10,
    flexDirection: 'row',
  },
  arrowImage: {
    height: 30,
    width: 30,
  },
  signupText: {
    marginLeft: 110,
    fontWeight: 'bold',
    fontSize: 18,
  },
  imageView: {
    height: 150,
      // backgroundColor:"white",
    justifyContent: 'center',
    alignItems: 'center',
  },

  profileImage: {height: 100,
     width: 100, borderRadius: 50,backgroundColor:"white",},

  textFieldView: {justifyContent: 'center', alignItems: 'center'},

  textField: {
    borderRadius: 10,
    borderColor: '#ddd',
    width: 320,
    padding: 10,
    marginTop: 10,
    marginBottom: 15,
    borderWidth: 1,
    backgroundColor: 'white',
  },
  textField2: {
    borderRadius: 10,
    borderColor: '#ddd',
    width: 320,
    padding: 10,
    borderWidth: 1,
    marginBottom: 15,
    backgroundColor: 'white',
  },
  signupButtonView: {
    
    height: 60,
    backgroundColor: colors.themeMain,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  dateOfBirthText:{
color:"#959c97",
padding:3
  },
  dateView:{flexDirection:"row",borderRadius: 10,
  borderColor: '#ddd',
  width: 320,
  alignItems:"center",
  justifyContent:"space-between",
  paddingHorizontal:5,
  borderWidth: 1,
  marginBottom: 15,
  backgroundColor: 'white',height:50},
calenderimage:{height:20,width:20,marginRight:20},
  buttonText: {fontSize: 17, 
    fontWeight: 'bold',
     color: 'white'},
  footerView: {flexDirection: 'row',
   
   alignItems:"center",
marginHorizontal:10,
},
  footerText1: {color: 'gray', fontSize: 15},
  footerText2: {fontSize: 16,
     fontWeight: 'bold',
      color: colors.themeMain,marginRight:50},
lastView:{justifyContent:"center",alignItems:"center",marginTop:50},
termsText:{color:colors.themeMain,fontSize:13},

    });
