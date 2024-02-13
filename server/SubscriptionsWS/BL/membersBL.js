const memberModel = require('../models/memberModel')
const subscriptionBL = require('./subscriptionBL')
const moviesBL = require('./moviesBL')


const getAllMembers = async() => {
    const members = await memberModel.find({})
    const membersArr = []
    await Promise.all(
        members.map(async(m) => {
            const obj = {}
            obj.memberData = m
            obj.subscription = await subscriptionBL.getSubscriptionByMemberId(m._id)
            const movies = obj.subscription[0]? obj.subscription[0].movies : []
            obj.unwatchedMovies = await moviesBL.getUnwatchedMovies(movies)
            membersArr.push(obj)
          })
    )  
    return membersArr
}

//Get member by memberId
const getMemberById = async(id) => {
    const member = await memberModel.findById(id)
    const obj = {}
    obj.memberData = member
    obj.subscription = await subscriptionBL.getSubscriptionByMemberId(member._id)
    const movies = obj.subscription[0]? obj.subscription[0].movies : []
    obj.unwatchedMovies = await moviesBL.getUnwatchedMovies(movies)
    return obj
}



const addMember = async (obj) => {
   const member = new memberModel(obj)
   await member.save()
   return {id : member._id, massage: 'Created!'}
}

const updateMember = async (id, obj) => {
    await memberModel.findByIdAndUpdate(id, obj)
    return 'Updated!'
}

const deleteMember = async (id) => {
    await memberModel.findByIdAndDelete(id)
    await subscriptionBL.deleteSubscription(id)
    return 'Deleted!'
}

module.exports = {
    getAllMembers,
    getMemberById,
    addMember,
    updateMember,
    deleteMember,
}
