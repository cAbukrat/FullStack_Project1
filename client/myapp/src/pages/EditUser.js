import React, { useState, useCallback } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import CheckboxPermissions from '../components/CheckboxPermissions';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';
import axios from 'axios'


const EditUser = () => {

  const user = useOutletContext();
  const [userData, setuserData] = useState({ id: user.id, userName: user.userName, fName: user.name.split(" ")[0], lName: user.name.split(" ")[1], createdDate: user.createdDate, sessionTimeOut: user.sessionTimeOut, permissions: user.permissions })
  const navigate = useNavigate()
  const dispatch = useDispatch()

  

  const goToAllUsers = ()=>{
    dispatch({type : "CHANGEISEDIT", payload : false})
    navigate('/home/manageUsers')
  }

  const updateUser = async()=> {
    await axios.put(`http://localhost:8080/users/${userData.id}`, userData)
    const obj = { id: userData.id, userName: userData.userName, name : userData.fName +" "+userData.lName, createdDate: userData.createdDate, sessionTimeOut: userData.sessionTimeOut, permissions: userData.permissions }
    dispatch({ type: 'UPDATE_USER', payload: obj })
    dispatch({ type: 'CHANGEISEDIT', payload: false })
    navigate('/home/manageUsers')
  }
  
  const getPermissions = (permissions) => {
    setuserData({...userData,permissions :permissions})
  }

  return (
    <div>
      <h2 style={{ color: '#46505A' }}>Edit User : {user.name}</h2>
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
          <TextField defaultValue={user.name.split(" ")[0]} focused onChange={(e) => setuserData({ ...userData, fName: e.target.value })} label="First Name" variant="filled" color="secondary" size='small' />
          <TextField defaultValue={user.name.split(" ")[1]} focused onChange={(e) => setuserData({ ...userData, lName: e.target.value })} label="Last Name" variant="filled" color="secondary" size='small' />
          <TextField defaultValue={user.userName} focused onChange={(e) => setuserData({ ...userData, userName: e.target.value })} label="User Name" variant="filled" color="secondary" size='small' />
          <TextField defaultValue={user.sessionTimeOut} focused onChange={(e) => setuserData({ ...userData, sessionTimeOut: e.target.value })} label="Session time out (Minutes)" variant="filled" color="secondary" size='small' />
          <TextField InputProps={{readOnly: true}} defaultValue={user.createdDate} focused  label="Created Date" variant="filled" color="secondary" size='small' /><br />
          <CheckboxPermissions userPermissions = {user.permissions} callback={getPermissions} />
          <br />
          <Button onClick={updateUser} sx={{ mr: '10px', width: '55.5ch' }} color="secondary" variant="contained" >
            Update
          </Button>
          <Button onClick={goToAllUsers}  sx={{ width: '55.5ch' }} color="secondary" variant="outlined"  >
            Cancel
          </Button>
        </Box>
      </div>
    </div>
  )
}

export default EditUser