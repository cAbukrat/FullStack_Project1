const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
    name : String,
    genres : [String],
    image : String,
    premiered : Date
})

const Movie = mongoose.model('movies', movieSchema)

module.exports = Movie