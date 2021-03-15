import axios from 'axios'
import React,{Component} from 'react'
import {View,Text,StyleSheet, TouchableOpacity,FlatList,Image,ActivityIndicator} from 'react-native'
import Loader from '../../Components/Loader'
import navigationStrings from '../../constants/navigationStrings'
import { clearUserData } from '../../utils/utils'

export default class HomePage extends Component{
  constructor(props)
  {
      super(props);
      this.state={
          data:[],
          isLoading: false,
          pageImages:6
      }
  }
  

  componentDidMount(){
      
      this.apicall()
  }



  
  apicall()
  {
   
      const {isLoading}=this.state
      if(!isLoading){
        this.setState({isLoading:true})
      }
   
    axios.request(`https://dog.ceo/api/breed/hound/images/random/${this.state.pageImages}`)
            
            .then(resJson => {
                this.setState({isLoading: false})
                this.setState({ data: resJson.data.message });
                console.log(resJson.data,"hllo")
                // this.setState({ refreshing: false });
            }).catch(() =>{
                this.setState({isLoading: true})
                (e => console.log(e));
            })
  }
  renderItem = (data) =>


<View
        style={Styles.cardView}
      >
<View
              style={Styles.cardImageView}
            >
              <View>
                <Image style={Styles.cardImage} source={{ uri: data.item  }} />
              </View>
              <View style={Styles.cardTextView}>
              <Text
                style={Styles.cardText}
              >
                Cute dogs
              </Text>
              </View>
              </View>
              </View>

endReached=()=>{
//    alert("endReached")

    const {pageImages}=this.state

    this.setState({
        pageImages:pageImages+2
    },()=>{
      
        this.apicall()
    })
}

 


footerItems=()=>{
    const {isLoading}=this.state
    return(
        <View style={Styles.footer}>
        {isLoading ? (
          <ActivityIndicator size={'large'}
            color="red"
            style={{margin: 15}} />
        ) : null}
      </View>
    )
}

    render()
    { 
        const {navigation}=this.props
        return(
            <View style={{flex:1,}}>
           


           <View
          style={{
            flexDirection: "row",
            position: "relative",
            flexWrap: "wrap",
            justifyContent: "space-between",
            backgroundColor: "white",
            alignItems: "center",
            height: 60,
            paddingTop: 5,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginLeft: 10,
            }}
          >
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("login")}
            >
              <Image
                style={{ height: 25, width: 25 }}
                source={{
                  uri:
                    "https://o.remove.bg/downloads/407dcca4-c4a6-48fb-8700-f21ef9e50596/kisspng-computer-icons-hamburger-button-menu-new-menu-5b34724be5a1f0.5796308115301637879406-removebg-preview.png",
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                style={{ height: 30, width: 50 }}
                source={{
                  uri:
                    "https://o.remove.bg/downloads/07411f6e-60b1-4710-ae9f-88c3e1cd2538/1611996262_ynt-removebg-preview.png",
                }}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              marginRight: 15,
              alignItems: "center",
            }}
          >
            <TouchableOpacity>
              <Image
                style={{ height: 20, width: 20, marginRight: 15 }}
                source={{
                  uri:
                    "https://o.remove.bg/downloads/dc6f76d6-7742-4748-899d-888d429c59ee/871-8719667_download-png-transparent-background-search-icon-removebg-preview.png",
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                style={{ height: 21, width: 20, marginRight: 15 }}
                source={{
                  uri:
                    "https://o.remove.bg/downloads/af51ea7a-8061-468d-be3d-306b4e38c7fd/img_316859-removebg-preview.png",
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                style={{ height: 20, width: 22, marginRight: 15 }}
                source={{
                  uri:
                    "https://o.remove.bg/downloads/12b45c3f-e4b1-4054-b38e-4d22908e4102/images-removebg-preview.png",
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>this.props.navigation.navigate('Cart', {itemList:addCartArray })}>
              <Image
                style={{ height: 20, width: 20 }}
                source={{
                  uri:
                    "https://o.remove.bg/downloads/2a835397-97f1-437f-8df6-cfa6da886457/images-removebg-preview.png",
                }}
              />
            </TouchableOpacity>
          </View>
        </View>


            
            <FlatList
            numColumns={2}
        data={this.state.data}
        renderItem={item => this.renderItem(item)}
        onEndReached={this.endReached}
        ListFooterComponent={this.footerItems}
        // keyExtractor={item => item.id.toString()}
         />
        
            </View>
        )
    }

}
const Styles=StyleSheet.create({
    container:
    {
        justifyContent:"center",
        alignItems:"center",
        flex:1
    },
    cardView:{
        flex: 1,
        backgroundColor: "white",
        borderRadius: 10,
        margin: 5,
        borderWidth: 1,
        padding: 5,
        borderColor: "#ddd",
      },
      cardImageView:{
        backgroundColor: "white",
        borderRadius: 10,
        justifyContent: "center",
        
      },
      cardImage:{ height: 190 },
cardTextView:{alignItems:"center"},
cardText:{
    fontSize: 13,
    fontWeight: "bold",
    marginTop: 5,
    marginBottom: 5,
   
  },
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
})