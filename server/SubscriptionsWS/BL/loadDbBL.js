const membersWS = require('../DAL/membersWS')
const memberModel = require('../models/memberModel')
const moviesFile = require('../DAL/moviesFile')
const movieModel = require('../models/movieModel')


const getAllMembers = async () => {
    let { data : members } = await membersWS.getAll()

    members = members.map((member) => {
       return {
        name : member.name,
        email : member.email,
        city : member.address.city
       }
    })
    return members;
}

const PushesMembersToDB =  (arr) => {
    arr.forEach(element => {
        const member = new memberModel(element)
        member.save()
    })
}

const getAllMovies = async () => {
    let { movies } = await moviesFile.getAll()

    movies = movies.map((movie) => {
       return {
        name : movie.name,
        genres :movie.genres,
        image :movie.image.medium,
        premiered : movie.premiered
       }
    })
    return movies;
}

const PushesMoviesToDB =  (arr) => {
    arr.forEach(element => {
        const movie = new movieModel(element)
        movie.save()
    })
}

module.exports = { getAllMembers ,PushesMembersToDB, getAllMovies, PushesMoviesToDB}