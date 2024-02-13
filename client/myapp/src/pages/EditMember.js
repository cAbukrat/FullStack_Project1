import React, { useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditMember = () => {
  const member = useSelector(state => state.subscriptions.memberData)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [memberData, setmemberData] = useState({_id: member._id, name: member.name, email: member.email, city: member.city })

  const updateMember = async () => {
    const { data } = await axios.put(`http://localhost:8080/members/${memberData._id}`, memberData)
    if(data === 'Updated!'){
      dispatch({ type: "UPDATE_MEMBER", payload: { id: memberData._id, member: memberData } })
      dispatch({ type: "CHANGE_ISEDIT", payload: false })
      dispatch({type : 'CHANGE_ISADD', payload : false})
      navigate('/home/subscriptions/all')
    }
  }

  const goToAllMembers = () => {
    dispatch({ type: "CHANGE_ISEDIT", payload: false })
    dispatch({type : 'CHANGE_ISADD', payload : false})
    dispatch({type: 'LOAD_MEMBER_DATA', payload: {}})
    navigate('/home/subscriptions/all')
  }
  return (
    <div>
      <h2 style={{ color: '#46505A' }}>Edit Member : {member.name}</h2>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, display: 'flex' },
            p: 2,
            border: '2px solid gray',
            borderRadius: 2,
            textAlign: 'left',
            width: 450,
            color: '#46505A',
            mb: 5
          }}>

          <TextField onChange={(e) => setmemberData({ ...memberData, name: e.target.value })} defaultValue={member.name} focused label="Name" variant="filled" color="secondary" size='small' />
          <TextField onChange={(e) => setmemberData({ ...memberData, email: e.target.value })} defaultValue={member.email} focused label="Email" variant="filled" color="secondary" size='small' />
          <TextField onChange={(e) => setmemberData({ ...memberData, city: e.target.value })} defaultValue={member.city} focused label="City" variant="filled" color="secondary" size='small' />

          <br />
          <Button onClick={updateMember} sx={{ mr: '10px', width: '55.5ch' }} color="secondary" variant="contained" >
            Update
          </Button>
          <Button onClick={goToAllMembers} sx={{ width: '55.5ch' }} color="secondary" variant="outlined"  >
            Cancel
          </Button>
        </Box>
      </div>
    </div>
  )
}

export default EditMember