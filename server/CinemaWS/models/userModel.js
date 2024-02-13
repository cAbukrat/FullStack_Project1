const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userName : { type: String, unique : true},
    password : { type: String},
    isAdmin : Boolean
})

const User = mongoose.model('users', userSchema)

module.exports = User;