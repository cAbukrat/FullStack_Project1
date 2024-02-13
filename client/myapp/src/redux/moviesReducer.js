const initialState = {
    movies: [],
    isEditMovie: false,
    isAddMovie: false,
    isUpdated: false,
    isAdded: false,
    movieData: {}
}

const moviesReducer = (state = initialState, { type, payload }) => {
    switch (type) {

        case 'LOADMOVIES':
            return { ...state, movies: payload }


        case 'DELETEMOVIE':
            let movies = [...state.movies]
            let index3 = movies.findIndex(x => x.movieData._id === payload)
            if (index3 >= 0) {
                movies.splice(index3, 1)
            }
            return { ...state, movies: movies, movieData: {} }
        case 'CHANGEISEDITMOVIE':
            return { ...state, isEditMovie: payload }

        case 'LOADMOVIEDATA':
            return { ...state, movieData: payload }

        case 'UPDATEMOVIE':
            let movies1 = [...state.movies]
            let index4 = movies1.findIndex(x => x.movieData._id === payload.id)
            if (index4 >= 0) {
                movies1[index4].movieData = payload.movie
            }
            return { ...state, movies: movies1, isUpdated: true, movieData: {} }

        case 'ADDMOVIE':
            const movie = { movieData: payload, subscription: [] }
            return { ...state, movies: [...state.movies, movie], isAdded: true }

        case 'CHANGEISUPDATED':
            return { ...state, isUpdated: payload }

        case 'CHANGEISADDED':
            return { ...state, isAdded: payload }

        case 'CHANGEISADDMOVIE':
            return { ...state, isAddMovie: payload }

            
        default:
            return state
    }
}

export default moviesReducer
