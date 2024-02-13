const axios = require('axios')

const getAll = (url) => axios.get(url)

const getItem = (url, param) => axios.get(`${url}/${param}`)

const getUnwatchedMovies = (url, arr) => axios.get(url ,{ data: arr })

const add = (url, obj) => axios.post(url,obj)

const update = (url, id, obj) => axios.put(`${url}/${id}`,obj)

const deleteItem = (url, id) => axios.delete(`${url}/${id}`)

module.exports = { getAll, add, update, deleteItem, getItem, getUnwatchedMovies}