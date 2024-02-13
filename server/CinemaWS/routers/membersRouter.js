const express = require('express')
const membersBL = require('../BL/membersBL')

const router = express.Router()

router.route('/').get(async (req, res) => {
    const members = await membersBL.getAllMembers()
    res.json(members)
})

router.route('/:id').get(async (req, res) => {
    const { id } = req.params;
    const member = await membersBL.getMemberById(id)
    res.json(member)
})

router.route('/').post(async (req,res) => {
    const obj = req.body
    const result = await membersBL.addMember(obj)
    res.json(result)
})

router.route('/:id').put(async(req, res) => {
    const { id } = req.params;
    const obj = req.body;
    const result = await membersBL.updateMember(id, obj)
    res.json(result)
})

router.route('/:id').delete(async(req, res) => {
    const { id } = req.params;
    const result = await membersBL.deleteMember(id)
    res.json(result)
})

module.exports = router