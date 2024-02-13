const express = require('express')
const moviesBL = require('../BL/moviesBL')

const router = express.Router()

router.route('/').get(async (req, res) => {
    const movies = await moviesBL.getAllMovies()
    res.json(movies)
})

//Get Unwatched Movies
router.route('/unwatched').post(async (req, res)=> {
    const arr = req.body
    console.log(arr)
    const movies = await moviesBL.getUnwatchedMovies(arr)
    res.json(movies)
})

router.route('/:name').get(async (req, res) => {
    const { name } = req.params
    const movie = await moviesBL.getMovieByName(name)
    res.json(movie)
})

router.route('/movie/:id').get(async (req, res) => {
    const { id } = req.params
    const result = await moviesBL.getMovieById(id)
    res.json(result)
})

router.route('/').post(async (req,res) => {
    const obj = req.body
    const result = await moviesBL.addMovie(obj)
    res.json(result)
})

router.route('/:id').put(async(req, res) => {
    const { id } = req.params;
    const obj = req.body;
    const result = await moviesBL.updateMovie(id, obj)
    res.json(result)
})

router.route('/:id').delete(async(req, res) => {
    const { id } = req.params;
    const result = await moviesBL.deleteMovie(id)
    res.json(result)
})

module.exports = router