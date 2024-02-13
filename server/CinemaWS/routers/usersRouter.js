const express = require('express')
const usersBL = require('../BL/usersBL')

const router = express.Router()

//Get All Users
router.route('/').get(async (req, res) => {
    const users = await usersBL.getAllUsers();
    res.json(users);
})

//Get Name By ID
router.route('/:id').get(async (req, res) => {
   const { id } = req.params
   const user = await usersBL.getName(id);
   res.json(user);
})

//Get User Permissions
router.route('/permissions/:id').get(async (req, res) => {
   const { id } = req.params
   const permissions = await usersBL.getUserPermissions(id);
   res.json(permissions);
})

//Add User
router.route('/').post(async (req, res) => {
   const obj = req.body;
   const result = await usersBL.addUser(obj)
   res.json(result)
})

//Update User
router.route('/:id').put(async(req, res) => {
   const { id } = req.params
   const obj = req.body
   const result = await usersBL.updateUser(id, obj)
   res.json(result)
})

//Delete User
router.route('/:id').delete(async(req, res) => {
    const { id } = req.params
    const result = await usersBL.deleteUser(id)
    res.json(result)
 })

module.exports = router