const express = require('express')
const membersBL = require('../BL/membersBL')

const router = express.Router();

//Get All Members
router.route('/').get(async (req, res)=> {
    const members = await membersBL.getAllMembers()
    res.json(members)
})

//Get Member By Id
router.route('/:id').get(async (req, res) => {
    const { id } = req.params;
    const member = await membersBL.getMemberById(id)
    res.json(member)
})

//Add a Member
router.route('/').post(async(req, res) => {
    const obj = req.body;
    const result = await membersBL.addMember(obj)
    res.json(result)
})

//Update a Member
router.route('/:id').put(async (req, res) => {
    const { id } = req.params;
    const obj = req.body;
    const result = await membersBL.updateMember(id, obj)
    res.json(result)
})

//Delete a Member
router.route('/:id').delete(async (req, res) => {
    const { id } = req.params;
    const result = await membersBL.deleteMember(id)
    res.json(result)
})

module.exports = router;