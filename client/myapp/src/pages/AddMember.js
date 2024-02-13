import React, { useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddMember = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [memberData, setmemberData] = useState({ name: '', email: '', city: ''})

  const addMember = async() => {
    const {data} = await axios.post("http://localhost:8080/members", memberData)
    const obj = {...memberData, _id: data.id}
    const {data :unwatchedMovies} = await axios.post("http://localhost:8080/movies/unwatched", [] )
    dispatch({type : 'ADD_MEMBER', payload : {obj, unwatchedMovies}}) 
    dispatch({type : "CHANGE_ISADD", payload : false})
    navigate('/home/subscriptions/all')
  }

  const goToAllMembers = () => {
    dispatch({ type: "CHANGE_ISEDIT", payload: false })
    dispatch({type : "CHANGE_ISADD", payload : false})
    navigate('/home/subscriptions/all')
  }

  return (
    <div>
      <h2 style={{ color: '#46505A' }}>Add New Member</h2>
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

          <TextField onChange={(e) => setmemberData({ ...memberData, name: e.target.value })} label="Name" variant="filled" color="secondary" size='small' />
          <TextField onChange={(e) => setmemberData({ ...memberData, email: e.target.value})} label="Email" variant="filled" color="secondary" size='small' />
          <TextField onChange={(e) => setmemberData({ ...memberData, city: e.target.value })}  label="City" variant="filled" color="secondary" size='small' />

          <br />
          <Button onClick={addMember} sx={{ mr: '10px', width: '55.5ch' }} color="secondary" variant="contained" >
            Save
          </Button>
          <Button onClick={goToAllMembers} sx={{ width: '55.5ch' }} color="secondary" variant="outlined"  >
            Cancel
          </Button>
        </Box>
      </div>
    </div>
  )
}

export default AddMember