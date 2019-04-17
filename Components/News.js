import React from 'react'
import FilmList from './FilmList';
import {View, StyleSheet, ActivityIndicator} from 'react-native'
import { getFilmNewsFromApi} from '../API/TMDBApi'





class News extends React.Component{


constructor(props){

    super(props)
    this.page = 0 
    this.totalPages = 0
    this.state={
        films:[],
        isLoading: false
    }
    this._loadFilmNews = this._loadFilmNews.bind(this)
}



    componentDidMount(){

        this._loadFilmNews()
        

    }

    _loadFilmNews() {
        this.setState({isLoading:true})
          getFilmNewsFromApi(this.page+1).then(data => {
            this.page=data.page
            this.totalPages = data.total_pages
              this.setState({ 
                films: [ ...this.state.films, ...data.results ],
                isLoading:false
              })
              //console.log('Nb pages : '+this.totalPages)
              //console.log('Page : : '+this.page)
          })
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
        

    render(){

        return (

           <View  style={styles.main_container}>
                <FilmList 
                isLoading={this.state.isLoading}
                films={this.state.films}
                loadFilms={this._loadFilmNews}
                page={this.page}
                totalPages={this.totalPages}
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
      top: 100,
      bottom: 0,
      alignItems: 'center',
      justifyContent: 'center'
    }
  })
  


export default News