import React, { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import AddUser from './AddUser';
import AllUsers from './AllUsers';
import { Outlet } from 'react-router-dom';

const ManageUsers = () => {

  const dispatch = useDispatch()
  const isEdit = useSelector(state => state.users.isEdit)
  const isAdd = useSelector(state => state.users.isAddUser)
  const [user, setuser] = useState({})


  const goToEdit = useCallback((user) => {
    setuser(user)
  })

  useEffect(() => {
    const fetchData = async () => {
      const { data: users } = await axios.get("http://localhost:8080/users")
      dispatch({ type: "LOAD", payload: users })
    }
    fetchData()
  }, [])


  const BootstrapButton = styled(Button)({
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 16,
    padding: '6px 12px',
    margin: '5px',
    border: '1px solid',
    backgroundColor: 'rgb(108, 107, 107)',
    borderColor: 'rgb(92, 91, 91)',
    '&:hover': {
      backgroundColor: 'rgb(108, 107, 107)',
      borderColor: 'rgb(108, 107, 107)',
      boxShadow: '0 0 0 0.2rem rgb(100, 95, 100)'
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#9e3b8f',
      borderColor: '#9e3b8f',
    },
    '&:focus': {
      boxShadow: '0 0 0 0.2rem rgb(221, 95, 221)',
      backgroundColor: '#9e3b8f',
    },
  });


  return (
    <div className='allPages'>
      <h1>Users</h1>
      {
        !isEdit && <>
          <BootstrapButton onClick={() => { dispatch({ type: 'CHANGEISADDUSER', payload: false }) }} variant="contained" disableRipple>
            All Users
          </BootstrapButton>

          <BootstrapButton onClick={() => { dispatch({ type: 'CHANGEISADDUSER', payload: true }) }} variant="contained" disableRipple>
            Add User
          </BootstrapButton>

          {isAdd && <AddUser />}
          {!isAdd && <AllUsers callback={goToEdit} />}
        </>
      }
      <Outlet context={user} />
    </div>
  )
}

export default ManageUsers