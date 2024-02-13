const jsonfile = require('jsonfile');

const file = './data/movies.json'

const getAll = () => {
  return jsonfile.readFile(file);
};

module.exports = { getAll }