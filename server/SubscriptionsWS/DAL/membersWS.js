const axios = require('axios')

const url = 'http://jsonplaceholder.typicode.com/users'

const getAll = () => axios.get(url)

module.exports = { getAll }