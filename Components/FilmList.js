import React from 'react'
import { FlatList,StyleSheet, View, Text} from 'react-native'
import FilmItem from './FilmItem';
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome5';


class FilmList extends React.Component{


    constructor(props) {
        super(props)
        this.state = {
          films: [], 
        }
      }

      _displayDetailForFilm = (idFilm)=>{

        this.props.navigation.navigate("FilmDetail",{idFilm:idFilm})
      
      }


      _checkArray=(item)=>{
        if(this.props.favoritesFilm != undefined){
          return (item.id === this.props.favoritesFilm.id)
        }
      }
  
    
      _displayEmptyListMessage(){

        if(this.props.films.length!==0){
        return (
        <FlatList 
        extraData={this.props.favoritesFilm}
        style={styles.list}
        data={this.props.films}
        keyExtractor={(item) => item.id.toString()}
        renderItem={
          //Ne pas oublier les crochets sur {item} pour indiquer à la Flatlist que l'on rend un objet et pas une variable
            ({item})=>
            (
            <FilmItem 
            film={item}
            isFilmFavorite={(this.props.favoritesFilm.findIndex(film => film.id === item.id) !== -1) ? true : false}
            displayDetailForFilm={this._displayDetailForFilm}
            isMenuWatched={this.props.isMenuWatched}
            />  
            )}
        onEndReachedThreshold={0.5}
        onEndReached={() => 
          {
            if (this.props.films.length > 0 && this.props.page < this.props.totalPages) { 
            this.props.loadFilms()
          }
        }
      }
        />
      )}
        else if (!this.props.isLoading){
          console.log('EMPTY')
          console.log(this.props)
          return(
            <View style={styles.empty_message_container}>
              <View style={styles.empty_message}>

              <Icon name="video-slash" color="#4F8EF7" size={40}/>
  
                <Text>Oups !</Text>
                <Text>Il semblerait qu'aucun film </Text>
                <Text>ne soit disponible.</Text>
                </View>
            </View>

          )
        }
        else{
          return(
            <View>

            </View>
          )
        }
      }
      

render(){
  
    return (
      this._displayEmptyListMessage()
    )
   
}}


const styles = StyleSheet.create({

    list:{

        flex:1
    },
    empty_message_container:{

      flex:1,
      justifyContent:'center',
      alignItems:'center'
    },

    empty_message:{
      position:'absolute',
      justifyContent:'center',
      alignItems:'center'

    }


})


const mapStateToProps = (state) => {
    return {
      favoritesFilm: state.toggleFavorite.favoritesFilm,
      watchedFilms : state.toggleWatched.watchedFilms
    }
  }
  
  export default connect(mapStateToProps)(FilmList)
  
  