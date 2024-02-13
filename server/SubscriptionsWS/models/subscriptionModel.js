const mongoose = require('mongoose')

const subscriptionSchema = new mongoose.Schema({
    memberId : String,
    movies : [{movieId : String, date : Date}]
})

const Subscription = mongoose.model('subscriptions',subscriptionSchema)

module.exports = Subscription