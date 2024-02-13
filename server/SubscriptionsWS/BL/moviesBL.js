const movieModel = require('../models/movieModel')
const subscriptionBL = require('./subscriptionBL')

const getAllMovies = async () => {
    const movies = await movieModel.find({})
    const moviesArr = []
    await Promise.all(
        movies.map(async (m) => {
            const obj = {}
            obj.movieData = m
            obj.subscription = await subscriptionBL.getSubscriptionsByMovie(m._id)
            moviesArr.push(obj)
        })
    )
    return moviesArr
}

const getMovieById = async (id) => {
    const movie = await movieModel.findById(id)
    return movie.name
}
const getMovieByName = async (name) => {
    const movie = await movieModel.find({ "name": name })
    if (movie.length > 0) {
        const obj = {}
        obj.movieData = movie[0]
        obj.subscription = await subscriptionBL.getSubscriptionsByMovie(movie[0]._id)
        return obj
    }
    return 'Movie not found!'
}

const addMovie = async (obj) => {
    const movie = new movieModel(obj)
    await movie.save()
    return {id : movie._id, massage: 'Created!'}
}

const updateMovie = async (id, obj) => {
    await movieModel.findByIdAndUpdate(id, obj)
    return 'Updated!'
}

const deleteMovie = async (id) => {
    await movieModel.findByIdAndDelete(id)
    await subscriptionBL.deleteMovie(id)
    return 'Deleted!'
}

const getUnwatchedMovies = async(arr) => {
    let movies = await movieModel.find({})
    if(arr[0]){
        arr.forEach(movie => {
            filteredMovies = movies.filter(m => m._id != movie.movieId )
            movies = filteredMovies
        })
    }
    const moviesNames = movies.map(m => m.name)
    return moviesNames
}

module.exports = {
    getAllMovies,
    getMovieByName,
    getMovieById,
    addMovie,
    updateMovie,
    deleteMovie,
    getUnwatchedMovies
}
