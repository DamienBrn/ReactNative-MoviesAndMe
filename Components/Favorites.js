// Components/Favorites.js

import React from 'react'
import {StyleSheet, View, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import FilmList from './FilmList'
import Avatar from './Avatar'

class Favorites extends React.Component {


  constructor(props)
  {
    super(props)
    this.page = 0 // Compteur pour connaître la page courante
    this.totalPages = 0 // Nombre de pages totales pour savoir si on a atteint la fin des retours de l'API TMDB
    this.state={
      films: [],
      isLoading: false // Par défaut à false car il n'y a pas de chargement tant qu'on ne lance pas de recherche
    }
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

  render() {

    return (

      <View style={styles.main_container}>

          <Avatar/>

          <FilmList 
              films={this.props.favoritesFilm}
              navigation = {this.props.navigation}
              />


      {this._displayLoading()}
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
  }

})

const mapStateToProps = (state) => {
  return {
    favoritesFilm: state.toggleFavorite.favoritesFilm
  }
}

export default connect(mapStateToProps)(Favorites)
