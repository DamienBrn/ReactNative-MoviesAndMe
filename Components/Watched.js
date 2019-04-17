import React from 'react'
import {View, StyleSheet, ActivityIndicator} from 'react-native'
import { connect } from 'react-redux'
import FilmList from './FilmList'


class Watched extends React.Component{


    constructor(props)
    {
      super(props)
      this.isMenuWatched=true 
      this.state={
        films: [],
        isLoading: false 
      }
    }
  
    _displayLoading() {
      if (this.state.isLoading) {
        return (
          <View style={styles.loading_container}>
            <ActivityIndicator size='large' />
          </View>
        )
      }
    }
  
    render(){

        return(

            <View style={styles.main_container}>

            <FilmList 
                films={this.props.watchedFilms}
                navigation = {this.props.navigation}

                isMenuWatched ={this.isMenuWatched}
                
                />
  
  
        {this._displayLoading()}
        </View>

        )
    }
}

const styles=StyleSheet.create({

    main_container: {
        flex: 1
      },
      loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
      }
    
    })


const mapStateToProps = (state) => {
    return {
      watchedFilms: state.toggleWatched.watchedFilms
    }
  }
  
  export default connect(mapStateToProps)(Watched)
  