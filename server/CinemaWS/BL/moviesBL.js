const subscriptionsWS = require('../DAL/subscriptionsWS')

const moviesURL = ' http://localhost:8000/movies'

const getAllMovies = async () => {
    const {data : movies} = await subscriptionsWS.getAll(moviesURL)
    return movies
}

const getUnwatchedMovies = async (arr) => {
    const  { data }  = await subscriptionsWS.getUnwatchedMovies(`${moviesURL}/unwatched`, arr)
    return data
}

const getMovieByName = async (name) => {
    const {data : movie} = await subscriptionsWS.getItem(moviesURL, name)
    return movie
}

const getMovieById = async (id) => {
    const {data : movieName } = await subscriptionsWS.getItem(`${moviesURL}/movie`, id)
    return movieName
}
const addMovie = async (obj) => {
   const {data :result} = await subscriptionsWS.add(moviesURL, obj)
   return result
}

const updateMovie = async(id, obj) => {
   const {data: result} = await subscriptionsWS.update(moviesURL, id, obj)
   return result
}

const deleteMovie = async(id) => {
    const {data: result} = await subscriptionsWS.deleteItem(moviesURL, id)
    return result
 }


module.exports = { getAllMovies, addMovie, updateMovie, deleteMovie, getMovieByName, getMovieById, getUnwatchedMovies}