const mongoose = require('mongoose')

const memberSchema = new mongoose.Schema({
    name : String,
    email : String,
    city : String
})

const Member = mongoose.model('members', memberSchema)

module.exports = Member