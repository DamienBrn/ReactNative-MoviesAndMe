// Components/Search.js

import React from 'react'
import {StyleSheet, View, Text,TextInput, Button, ActivityIndicator } from 'react-native'
import FilmList from './FilmList'
import { getFilmsFromApiWithSearchedText } from '../API/TMDBApi' // import { } from ... car c'est un export nommé dans TMDBApi.js


class Search extends React.Component {


    constructor(props)
    {
      super(props)
      this.searchedText=""
      this.page = 0 // Compteur pour connaître la page courante
      this.totalPages = 0 // Nombre de pages totales pour savoir si on a atteint la fin des retours de l'API TMDB
      this.state={
        films: [],
        isLoading: false // Par défaut à false car il n'y a pas de chargement tant qu'on ne lance pas de recherche
      }
      this._loadFilms = this._loadFilms.bind(this)
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

    _searchTextInputChanged(text) {
      this.searchedText=text
  }

  _loadFilms() {
    console.log(this.searchedText) // Un log pour vérifier qu'on a bien le texte du TextInput
    if (this.searchedText.length > 0) { // Seulement si le texte recherché n'est pas vide
      this.setState({ isLoading: true }) // Lancement du chargement
      
      getFilmsFromApiWithSearchedText(this.searchedText,this.page+1).then(data => {
        
          this.page=data.page
          this.totalPages = data.total_pages
          this.setState({ 
            films: [ ...this.state.films, ...data.results ],
            isLoading: false // Arrêt du chargement
          })
      })
    }
}

_searchFilms() {

  
  // Ici on va remettre à zéro les films de notre state
          this.page=0
          this.totalPages = 0
          this.setState({ 
            films: [],
          }, () => { 
            
            this._loadFilms() 
        })
}

  render() {
    
    return (
      <View style={styles.main_container}>
        <TextInput style={styles.textinput} placeholder='Titre du film' onChangeText={(text) => this._searchTextInputChanged(text)} onSubmitEditing={() => this._searchFilms()}/>
        <Button style={{ height: 50 }} title='Rechercher' onPress={() => this._searchFilms()}/>

          <FilmList 

              
              films={this.state.films}
              loadFilms={this._loadFilms}
              page={this.page}
              totalPages={this.totalPages}
              navigation = {this.props.navigation}
              isLoading={this.state.isLoading}
              
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
  textinput: {
    marginLeft: 5,
    marginRight: 5,
    height: 50,
    paddingLeft: 5
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
})




export default Search

