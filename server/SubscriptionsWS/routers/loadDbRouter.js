const express = require('express')
const loadDbBL = require('../BL/loadDbBL')

const router = express.Router();
//let fullDB = false
let fullDB = true

router.route('/').get(async (req, res) => {
    if (!fullDB) {
        const members = await loadDbBL.getAllMembers()
        loadDbBL.PushesMembersToDB(members)
        const movies = await loadDbBL.getAllMovies()
        loadDbBL.PushesMoviesToDB(movies)
        fullDB = true
        res.json('created!')
    }
    else {
        res.json('db is full!')
    }
})

module.exports = router;