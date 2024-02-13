const subscriptionsWS = require('../DAL/subscriptionsWS')

const subscriptionsURL = ' http://localhost:8000/subscriptions'

const updateSubscription = async (id, obj) => {
    const { data: result } = await subscriptionsWS.update(subscriptionsURL, id, obj)
    return result
}

module.exports = { updateSubscription }