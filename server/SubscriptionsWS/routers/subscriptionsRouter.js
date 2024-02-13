const express = require('express')
const subscriptionBL = require('../BL/subscriptionBL')

const router = express.Router();

//Update subscription movies
router.route('/:id').put(async (req, res) => {
    const { id } = req.params;
    const obj = req.body;
    const result = await subscriptionBL.subscriptionToNewMovie(id, obj)
    res.json(result)
})


module.exports = router;