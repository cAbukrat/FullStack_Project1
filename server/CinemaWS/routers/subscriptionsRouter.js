const express = require('express')
const subscriptionsBL = require('../BL/subscriptionsBL')

const router = express.Router()

router.route('/:id').put(async(req, res) => {
    const { id } = req.params;
    const obj = req.body;
    const result = await subscriptionsBL.updateSubscription(id, obj)
    res.json(result)
})

module.exports = router