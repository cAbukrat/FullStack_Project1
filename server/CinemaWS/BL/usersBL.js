const usersFile = require('../DAL/usersFile')
const permissionsFile = require('../DAL/permissionsFile')
const userModel = require('../models/userModel')

//Get All Users
const getAllUsers = async () => {
    const userData = [];

    // Get all data from json files
    const { users } = await usersFile.getAllUsers();
    const { permissions } = await permissionsFile.getAllPermissions();

    //Get all data from db
    const usersDB = await userModel.find({});

    usersDB.forEach((user) => {
        const obj = {
            id: user._id,
            userName: user.userName
        }
        const userFile = users.find((user) => user.id == obj.id)
        const name = (userFile?.fName + ' ' + userFile?.lName)
        obj.name = name
        obj.sessionTimeOut = userFile?.sessionTimeOut
        obj.createdDate = userFile?.createdDate

        const permissionFile = permissions.find((per) => per.id == obj.id)
        obj.permissions = permissionFile?.permissions

        userData.push(obj)
    })
    return userData
}
//Get - get user permissions
const getUserPermissions = async(id) => {
    const { permissions } = await permissionsFile.getAllPermissions();
    const userPermissions = permissions.find((permission) => permission.id === id)
    return userPermissions.permissions
  }

//Get - get name by id
const getName = async(id) => {
    const { users } = await usersFile.getAllUsers();
    const userFile = users.find((user) => user.id == id)
    const name = (userFile?.fName + ' ' + userFile?.lName)
    const userDB = await userModel.find({_id: id});
    const isAdmin = userDB[0].isAdmin? userDB[0].isAdmin : false
    const obj = {name: name, isAdmin:  isAdmin}
    return obj
}
//Post - add user
const addUser = async (obj) => {

    //add to db
    const userDB = { userName: obj.userName }
    const user = new userModel(userDB)
    await user.save()
    const userData = await userModel.find({ userName: obj.userName });
    const userId = userData[0]._id

    //add to usersFile
    const userFile = {
        id: userId,
        fName: obj.fName,
        lName: obj.lName,
        createdDate: obj.createdDate,
        sessionTimeOut: obj.sessionTimeOut
    }
    const { users } = await usersFile.getAllUsers();
    users.push(userFile)
    const data = { users };
    await usersFile.setUsers(data);

    //add to permissionsFile
    const permissionFile = {
        id: userId,
        permissions: obj.permissions
    }
    const { permissions } = await permissionsFile.getAllPermissions();
    permissions.push(permissionFile)
    const data2 = { permissions };
    await permissionsFile.addPermission(data2);

    return ({id: userId, massage :'Done!'})
}

//Put - update user
const updateUser = async (id, obj) => {

    //Update db
    const password = userModel.findById(id).password
    const userDB = { id: id, userName: obj.userName, password: password }
    await userModel.findByIdAndUpdate(id, userDB);

    //Update usersFile
    const userFile = {
        id: id,
        fName: obj.fName,
        lName: obj.lName,
        createdDate: obj.createdDate,
        sessionTimeOut: obj.sessionTimeOut
    }
    const { users } = await usersFile.getAllUsers();
    const index = users.findIndex((user) => user.id == id)
    if (index !== -1) {
        users[index] = userFile
        const data = { users };
        await usersFile.setUsers(data);
    }

    //Update permissionsFile
    const permissionFile = {
        id: id,
        permissions: obj.permissions
    }
    const { permissions } = await permissionsFile.getAllPermissions();
    const index2 = permissions.findIndex((per) => per.id == id)

    if (index2 !== -1) {
        permissions[index] = permissionFile
        const data2 = { permissions };
        await permissionsFile.addPermission(data2);
        return ('Updated!')
    }
    return 'Wrong ID'
}

//Delete - delete user
const deleteUser = async (id) => {

    //Delete in db
    await userModel.findByIdAndDelete(id);

    //Delete in usersFile
    const { users } = await usersFile.getAllUsers();
    const index = users.findIndex((user) => user.id == id)
    if (index !== -1) {
        users.splice(index, 1)
        const data = { users };
        await usersFile.setUsers(data);
    }

    //Delete in permissionsFile
    const { permissions } = await permissionsFile.getAllPermissions();
    const index2 = permissions.findIndex((per) => per.id == id)
    if (index2 !== -1) {
        permissions.splice(index, 1)
        const data2 = { permissions }
        await permissionsFile.addPermission(data2);
        return ('Deleted!')
    }
    return 'Wrong ID'
}

module.exports = { getAllUsers, getName, getUserPermissions, addUser, updateUser, deleteUser }

