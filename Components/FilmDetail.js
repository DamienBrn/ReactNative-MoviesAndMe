

import React from 'react'
import { StyleSheet, View, Text, ActivityIndicator, ScrollView, Image, TouchableOpacity, Share, Platform, Button} from 'react-native'
import { getFilmDetailFromApi,getImageFromApi } from '../API/TMDBApi' 
import moment from 'moment'
import numeral from 'numeral'
import EnlargeShrink from '../Animations/EnlargeShrink'
import { connect } from 'react-redux'



class FilmDetail extends React.Component

{

    constructor(props) {
        super(props)
        this.state = {
          film: undefined, // Pour l'instant on n'a pas les infos du film, on initialise donc le film à undefined.
          isLoading: true // A l'ouverture de la vue, on affiche le chargement, le temps de récupérer le détail du film
        }
        this._shareFilm = this._shareFilm.bind(this)
      }

      static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state
        // On accède à la fonction shareFilm et au film via les paramètres qu'on a ajouté à la navigation
        if (params.film != undefined && Platform.OS === 'ios') {
          return {
              // On a besoin d'afficher une image, il faut donc passe par une Touchable une fois de plus
              headerRight: <TouchableOpacity
                              style={styles.share_touchable_headerrightbutton}
                              onPress={() => params.shareFilm()}>
                              <Image
                                style={styles.share_image}
                                source={require('../Images/ic_share.png')} />
                            </TouchableOpacity>
          }
        }
    }

      // Fonction pour faire passer la fonction _shareFilm et le film aux paramètres de la navigation. Ainsi on aura accès à ces données au moment de définir le headerRight
  _updateNavigationParams() {
    this.props.navigation.setParams({
      shareFilm: this._shareFilm,
      film: this.state.film
    })
  }
  
  componentDidUpdate(){
    console.log('FilmDetail Updated')
  }
  // Dès que le film est chargé, on met à jour les paramètres de la navigation (avec la fonction _updateNavigationParams) pour afficher le bouton de partage
  componentDidMount() {
    
    this._loadFilmDetail()

    /*
    const favoriteFilmIndex = this.props.favoritesFilm.findIndex(item => item.id === this.props.navigation.state.params.idFilm)
    if (favoriteFilmIndex !== -1) { 
      this.setState({
        film: this.props.favoritesFilm[favoriteFilmIndex]
      }, () => { this._updateNavigationParams() })
    }
  
    this.setState({ isLoading: true })

    getFilmDetailFromApi(this.props.navigation.state.params.idFilm).then(data => {
      this.setState({
        film: data,
        isLoading: false
      }, () => { this._updateNavigationParams() })
    })*/

  
  }

      _shareFilm(){
        const{film} = this.state
        Share.share({title : film.title, message:film.overview})

      }

      _displayFloatingActionButton() {
        const { film } = this.state
        if (film != undefined && Platform.OS === 'android') { // Uniquement sur Android et lorsque le film est chargé
          return (
            <TouchableOpacity
              style={styles.share_touchable_floatingactionbutton}
              onPress={() => this._shareFilm()}>
              <Image
                style={styles.share_image}
                source={require('../Images/ic_share.png')} />
            </TouchableOpacity>
          )
        }
    }


    _displayFixedWatchedButton(){
      
      var button_text='Marquer comme vu'
      
      if (this.props.watchedFilms.findIndex(this._checkArray)!== -1) {
      
        button_text='Non vu'
      
      }
    
        return (
          <View style={styles.watched_button}>
              <Button onPress={()=>this._toggleWatched()} title={button_text} />
          </View>
          
        
          )
      

    }

    //------------------------------------------------------------------------------

    _toggleWatched() {
      const action = { type: "TOGGLE_WATCHED", value: this.state.film }
      this.props.dispatch(action)
  }
    
      _toggleFavorite() {
        const action = { type: "TOGGLE_FAVORITE", value: this.state.film }
        this.props.dispatch(action)
    }

//tk--------------------------------TEST----------------------------------------

    _checkArray=(item)=>{
      if(this.state != undefined){
        return (item.id === this.state.film.id)
      }
    }

//--------------------------------TEST----------------------------------------

      _displayFavoriteImage() {
        var shouldEnlarge = false
        var sourceImage = require('../Images/ic_favorite_border.png')
        if (this.props.favoritesFilm.findIndex(this._checkArray)!== -1) {
          console.log('Film dans nos favoris') 
          sourceImage = require('../Images/ic_favorite.png')
          shouldEnlarge=true


        }
        return (
          <EnlargeShrink shouldEnlarge={shouldEnlarge}>
          <Image
            style={styles.favorite_image}
            source={sourceImage}
          />
          </EnlargeShrink>
        )
    }

    _displayLoading() {
        if (this.state.isLoading) {
          return (
            <View style={styles.loading_container}>
              <ActivityIndicator size='large' />
              {/* Le component ActivityIndicator possède une propriété size pour définir la taille du visuel de chargement : small ou large. Par défaut size vaut small, on met donc large pour que le chargement soit bien visible */}
            </View>
          )
        }
      }

      _loadFilmDetail(){
        
        getFilmDetailFromApi(this.props.navigation.state.params.idFilm).then(data =>
            {
                this.setState({ 
                    film: data,
                    isLoading: false // Arrêt du chargement
                  })

            })
      }
      _displayFilm() {
        const { film } = this.state
        if (film != undefined) {
          return (
            <View style={styles.main_container}>
            <ScrollView style={styles.scrollview_container}>

                <Image style={styles.imageFilm} source={{uri: getImageFromApi(film.backdrop_path)}}/>
                {this._displayFixedWatchedButton()}
                <Text style={styles.titleFilm}>{film.title}</Text>


                
                <View style={styles.favorite_container_container}>

                  <TouchableOpacity
                    style={styles.favorite_container}
                    onPress={() => this._toggleFavorite()}>
                    {this._displayFavoriteImage()}
                  </TouchableOpacity>
                </View>

                <Text style={styles.descriptionFilm}>{film.overview}</Text>

            <View style={styles.infosFilm}>
                <Text >Sortie le : {moment(new Date(film.release_date)).format('DD/MM/YYYY')}</Text>
                <Text >Note : {film.vote_average} / 10</Text>
                <Text >Nombres de votes : {film.vote_count}</Text>
                <Text>Budget : {numeral(film.budget).format('0,0[.]00 $')}</Text>
                <Text >Genre(s) : {film.genres.map((genre,k) => <Text key={k}>{genre.name} / </Text> )}</Text>
                <Text >Companie(s) : {film.production_companies.map((company,k) => <Text key={k}>{company.name} / </Text> )}</Text>
            </View>
            
            </ScrollView>
            
              
            </View>
          )
        }
      }
      render() {
        
        return (
          <View style={styles.main_container}>
            {this._displayLoading()}
            {this._displayFilm()}
            {this._displayFloatingActionButton()}
            
          </View>
        )
      }
    }
    
    const styles = StyleSheet.create({
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
      },
      scrollview_container: {
        flex: 1
      },
      imageFilm:{
        height:180,
        
    },
    titleFilm:{

        fontSize:30,
        fontWeight:'bold',
        textAlign:'center',
        marginTop:20,


    },

    descriptionFilm:{
        marginTop:20,
        textAlign:'auto',
        color:'#969696'

    },

    infosFilm:{
        marginTop:20

    },

    favorite_container_container: {
      alignItems: 'center', // Alignement des components enfants sur l'axe secondaire, X ici
      justifyContent:'center'

  },

    favorite_container: {
      alignItems: 'center', // Alignement des components enfants sur l'axe secondaire, X ici
      width:60

      
  },

  favorite_image:{
    flex: 1,
    width: null,
    height: null
},
share_touchable_floatingactionbutton: {
  position: 'absolute',
  width: 60,
  height: 60,
  right: 30,
  bottom: 40,
  borderRadius: 30,
  backgroundColor: '#e91e63',
  justifyContent: 'center',
  alignItems: 'center'
},
share_image: {
  width: 30,
  height: 30
},
share_touchable_headerrightbutton: {
  marginRight: 8
},

watched_button:{

  position:'relative',
  bottom:0,
  width:'100%'

}



    })
    
    const mapStateToProps = (state) => {
      return {
        favoritesFilm: state.toggleFavorite.favoritesFilm,
        watchedFilms : state.toggleWatched.watchedFilms
      }
    }

    export default connect(mapStateToProps)(FilmDetail)

