const jsonfile = require('jsonfile')

const file = './data/users.json'

//Read from a json file
const getAllUsers = () => {
    return jsonfile.readFile(file)
}

//Write to a json file
const setUsers = async (obj) => {
    await jsonfile.writeFile(file, obj)
    return 'Done!'
}

module.exports = {getAllUsers, setUsers}