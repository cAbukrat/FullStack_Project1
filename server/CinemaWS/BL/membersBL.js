const subscriptionsWS = require('../DAL/subscriptionsWS')

const membersURL = ' http://localhost:8000/members'

const getAllMembers = async () => {
    const { data: members } = await subscriptionsWS.getAll(membersURL)
    return members
}

const getMemberById = async(id) => {
    const { data: member } = await subscriptionsWS.getItem(membersURL, id)
    return member
}

const addMember = async (obj) => {
    const { data: result } = await subscriptionsWS.add(membersURL, obj)
    return result
}

const updateMember = async (id, obj) => {
    const { data: result } = await subscriptionsWS.update(membersURL, id, obj)
    return result
}

const deleteMember = async (id) => {
    const { data: result } = await subscriptionsWS.deleteItem(membersURL, id)
    return result
}


module.exports = { getAllMembers, addMember, updateMember, deleteMember, getMemberById }