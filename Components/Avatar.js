import React from 'react'
import {TouchableOpacity, Image, View, StyleSheet} from 'react-native'
import ImagePicker from 'react-native-image-picker'
import {connect} from 'react-redux'

class Avatar extends React.Component{



 // Components/Avatar.js

constructor(props) {
    super(props)
    this.state = {
      avatar_obj: require('../Images/ic_tag_faces.png')
    }
    // this.setState est appelé dans un callback dans showImagePicker, pensez donc bien à binder la fonction _avatarClicked
    this._avatarClicked = this._avatarClicked.bind(this)
}

_avatarClicked() {
    ImagePicker.showImagePicker({}, (response) => {
      if (response.didCancel) {
        console.log('L\'utilisateur a annulé')
      }
      else if (response.error) {
        console.log('Erreur : ', response.error)
      }
      else {
        console.log('Photo : ', response.uri )
        let requireSource = { uri: response.uri }
        const action = { type: "SET_AVATAR", value: requireSource }
        this.props.dispatch(action)
      }
    })
}

render(){


    return(
        <View style={styles.main_avatar_container}>
                <TouchableOpacity style={styles.avatar_container} onPress={this._avatarClicked}>

                    <Image 
                        style={styles.avatar_image}
                        source={this.props.avatar}
                    />

                </TouchableOpacity>
        </View>
        )
    }
}


const styles = StyleSheet.create({

    main_avatar_container:{

        alignItems:'center',
        borderBottomWidth: 2,
        borderRadius: 2,
        borderColor: '#afafaf',
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 15,
        },
        shadowOpacity: 0.43,
        shadowRadius: 9.51,
        
        elevation: 1,

    },

    avatar_container:{
     width:100,
     height:100,
     justifyContent:'center',
     alignItems:'center'
    },

    avatar_image:{
        height:80,
        width:80,
        borderWidth:2,
        borderRadius:50,
        borderColor:'#afafaf',
        padding : 5


    }
})

// On mappe l'avatar aux props de notre component
const mapStateToProps = state => {
  return {
    avatar: state.setAvatar.avatar
  }
}

export default connect(mapStateToProps)(Avatar)

