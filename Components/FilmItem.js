import React from 'react'
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native'
import { getImageFromApi} from '../API/TMDBApi'
import FadeIn from '../Animations/FadeIn'
import moment from 'moment'




class FilmItem extends React.Component{


    constructor(props)
    {
        super(props)
        this.state={
            content:this.props.film.original_title
        }
    }


    _displayFavoriteImage(){
        
        var sourceImage = ''
        if (this.props.isFilmFavorite) {
          sourceImage = require('../Images/ic_favorite.png')
  
          return (
            <Image
              style={styles.favoriteImg}
              source={sourceImage}
            />
          )
        }
    }
    

//-----------------------------------------CHOOSE WHICH ITEM TO SHOW---------------------------------------------------------------

    _displayFilmItem(){
        const {film} = this.props
        return(
            <FadeIn>
                <TouchableOpacity style={styles.main_container} onPress={() => this.props.displayDetailForFilm(film.id)}>

                <Image style={styles.imageFilm} source={{uri: getImageFromApi(film.poster_path)}}/>

                    <View style={styles.content}>
                        
                            <View style={styles.header}>
                                {this._displayFavoriteImage()}
                                <Text style={styles.title_text}>{film.title}</Text>
                                <Text style={styles.vote}>{film.vote_average}</Text>
                            </View>
                            

                            <View style={styles.description}>
                                <Text style={styles.description_text} numberOfLines={6}>{film.overview}</Text>
                            </View>

                            <View style={styles.date_container}>
                                <Text style={styles.date_text}>Sortie le {moment(new Date(film.release_date)).format('DD/MM/YYYY')}</Text>
                            </View>
                    </View>

                </TouchableOpacity>
            </FadeIn>
        )

    }


    _onLongPressShowDate(){
        
        const {film} = this.props

        this.state.content==film.original_title ?  this.setState({ content: moment(new Date(film.release_date)).format('DD/MM/YYYY')} ) : this.setState({ content: film.original_title })
    }


    _displayFilmItemWatched(){
        const {film} = this.props
        
        return(
            <FadeIn>
            <TouchableOpacity style={styles.main_container} onPress={() => this.props.displayDetailForFilm(film.id)} onLongPress={()=>this._onLongPressShowDate()}>

            <Image style={styles.imageFilmWatched} source={{uri: getImageFromApi(film.poster_path)}}/>

                        <View style={styles.header_watched}>
                            <Text style={styles.title_text_watched}>{this.state.content}</Text>
                        </View>

            </TouchableOpacity>
        </FadeIn>

        )
    }

    //Check if current menu is "Watched"
    _displayChooseFilmitem(){
        return(this.props.isMenuWatched ? this._displayFilmItemWatched() : this._displayFilmItem())
    }

//--------------------------------------------------------------------------------------------------------

    render(){
      return(
            <View>
                {this._displayChooseFilmitem()}
            </View>

      )
        
    }
}


const styles = StyleSheet.create(
{

    main_container:{
        
        flex:1,
        flexDirection:"row",
        marginBottom:10
        
    },
    title_text:{
        flexWrap:'wrap',
        fontWeight: 'bold',
        fontSize: 20,
        flex: 1,
        paddingRight:5
    },

    content:{
        height:180,
        flexDirection:'column',
        flex:1,
        justifyContent:'space-between',
        
        margin:5
    },

    description:{
        
        flex:7

    },

    description_text:{
        fontStyle: 'italic',
        color: '#666666'
    },

    vote:{
        fontWeight: 'bold',
        fontSize: 26,
        color: '#000'
    },

    imageFilm:{
        height:180,
        width:120,
        margin:5
    },

    header:{
        flexDirection:'row',
        flex:3
    },
    date_container:{
        padding:5,
        flex:1
        
    },

    date_text:{
        fontSize:14,
        textAlign:'right'
    },

    favoriteImg:{
        width:20,
        height:20

    },
    imageFilmWatched:{
        height:100,
        width:100,
        borderRadius:50,
        margin:5
    },
    header_watched:{
        justifyContent:'center'

    }


})


  
  export default FilmItem
  
  