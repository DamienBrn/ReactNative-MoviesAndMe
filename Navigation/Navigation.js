

import React from 'react'
import { createStackNavigator, createAppContainer, createBottomTabNavigator} from 'react-navigation'
import {StyleSheet,Image} from 'react-native'
import Search from '../Components/search'
import FilmDetail from '../Components/FilmDetail'
import Favorites from '../Components/Favorites'
import News from '../Components/News'
import Watched from '../Components/Watched'

const SearchStackNavigator = createStackNavigator({


  Search: 
  { // Ici j'ai appelé la vue "Search" mais on peut mettre ce que l'on veut. C'est le nom qu'on utilisera pour appeler cette vue
    screen: Search,
    navigationOptions: 
    {
      title: 'Rechercher'
    }
  },

  FilmDetail:
  {
    screen:FilmDetail
  }

})

const FavoritesStackNavigator= createStackNavigator({

  Favoris:{
    screen:Favorites,
    navigationOptions:{
      title:'Favoris'
    }
  },
  
  FilmDetail:
  {
    screen:FilmDetail
  }

})


const NewsStackNavigator = createStackNavigator({

  News:{
    screen:News,
    navigationOptions:{
      title:'News'
    }

  },

  FilmDetail:
  {
    screen:FilmDetail
  }


})

const WatchedStackNavigator = createStackNavigator({

Watched:{
  screen:Watched,
  navigationOptions:{
    title:'Mes films vus'
  }
},

FilmDetail:
{
  screen:FilmDetail
}

})


const MoviesTabNavigator = createBottomTabNavigator({
  Search: {
    screen: SearchStackNavigator,
    navigationOptions:{
      tabBarIcon :()=>{
        return(
        <Image source={require('../Images/ic_search.png')} style={styles.icon}/>
        )
      }
      
    }
  },
  Favorites: {
    screen: FavoritesStackNavigator,
    navigationOptions:{
      tabBarIcon :()=>{
        return(
        <Image source={require('../Images/ic_favorite.png')} style={styles.icon}/>
        )
      }
      
    }
  },
  News : {
    screen:NewsStackNavigator,
    navigationOptions:{
      tabBarIcon:()=>{
        return (<Image source={require('../Images/ic_fiber_new.png')} style={styles.icon} />
        )
      }    
    }

  },

  Watched :{
    screen:WatchedStackNavigator,
    navigationOptions:{
      tabBarIcon:()=>{
        return(<Image source={require('../Images/ic_watched.png')} style={styles.icon}/>
        )
      
    }
  }
 }
},

{
  tabBarOptions:{
    showIcon:true,
    showLabel:false,
    activeBackgroundColor: '#DDDDDD', 
    inactiveBackgroundColor: '#FFFFFF' 
    
  }

}

)


const styles = StyleSheet.create({

  icon:{

    width:30,
    height:30
  }



})


const App = createAppContainer(MoviesTabNavigator)

export default App