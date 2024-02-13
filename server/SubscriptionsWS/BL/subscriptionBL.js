const subscriptionModel = require('../models/subscriptionModel')
const memberModel = require('../models/memberModel')

//Movies watched
const getSubscriptionByMemberId = (memberId) => {
    return subscriptionModel.find({ "memberId": memberId })
}

//Subscribe to new movie
const subscriptionToNewMovie = async (memberId, movie) => {
    const subscription = await subscriptionModel.find({ "memberId": memberId })
    if(subscription.length != 0){
        const movies = subscription[0].movies
        movies.push(movie)
        const id = subscription[0]._id
        subscription[0].movies = movies
        await subscriptionModel.findByIdAndUpdate(id, subscription[0])
        return subscription[0]
    }
    else{
        const obj = {memberId, movies: [movie]}
        const subscription = new subscriptionModel(obj)
        await subscription.save()
        return subscription
    }
    
}

//Subscriptions watched
const getSubscriptionsByMovie = async(movieId) => {
   const subscriptions =  await subscriptionModel.find({movies: {  $elemMatch: { movieId:  movieId } }})
   const arr = []
   await Promise.all(
    subscriptions.map(async(sub) => {
        const obj = {}
        obj.memberId = sub.memberId
        obj.name = await getMemberNameById(sub.memberId)
        let movies = sub.movies.filter(m => m.movieId == movieId)
        obj.date = movies[0].date
        arr.push(obj)
    })) 
   return arr
}

//Get name for subscriptionBL
const getMemberNameById = async(id) => {
    const member = await memberModel.findById(id)
    return member.name
}

//Delete movie in subscription
const deleteMovie = async (id) => {
    await subscriptionModel.updateMany(
        { "movies.movieId":  id},
        { $pull: { movies: { movieId: id } } }
      )
}

//Delete subscription
const deleteSubscription = async(memberId) => {
    const subscription= await subscriptionModel.find({ "memberId": memberId })
    const id = subscription[0]?._id
    return subscriptionModel.findByIdAndDelete(id)
}


module.exports = {
    getSubscriptionByMemberId,
    subscriptionToNewMovie,
    getSubscriptionsByMovie,
    deleteSubscription,
    deleteMovie
}
