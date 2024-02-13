const jsonfile = require('jsonfile')

const file = './data/permissions.json'

//Read from a json file
const getAllPermissions = () => {
    return jsonfile.readFile(file)
}

//Write to a json file
const addPermission = async (obj) => {
   await jsonfile.writeFile(file, obj)
   return 'Done!'
}


module.exports = { getAllPermissions, addPermission }