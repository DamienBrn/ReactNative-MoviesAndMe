// Store/Reducers/watchedReducer.js

const initialState = { watchedFilms: [] }

function toggleWatched(state = initialState, action) {
  let nextState
  switch (action.type) {
    case 'TOGGLE_WATCHED':
      const WatchedFilmIndex = state.watchedFilms.findIndex(item => item.id === action.value.id)
      if (WatchedFilmIndex !== -1) {
        // Le film est déjà dans les vus, on le supprime de la liste
        nextState = {
          ...state,
          watchedFilms: state.watchedFilms.filter( (item, index) => index !== WatchedFilmIndex)
        }
      }
      else {
        // Le film n'est pas dans les films favoris, on l'ajoute à la liste
        nextState = {
          ...state,
          watchedFilms: [...state.watchedFilms, action.value]
        }
      }
      return nextState || state
  default:
    return state
  }
}

export default toggleWatched