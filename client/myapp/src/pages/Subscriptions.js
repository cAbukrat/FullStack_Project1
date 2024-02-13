import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { Outlet } from 'react-router-dom';



const Subscriptions = () => {

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

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const isEdit = useSelector(state => state.subscriptions.isEditMember)
  const member = useSelector(state => state.subscriptions.memberData)
  const permissions = useSelector(state => state.users.userPermissions)
  const [isVisibleAdd, setisVisibleAdd] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const { data: members } = await axios.get("http://localhost:8080/members")
      dispatch({ type: "LOAD_MEMBERS", payload: members })
    }
    fetchData()
    dispatch({ type: 'CHANGEISHOME', payload: false })
    dispatch({ type: "CHANGE_ISEDIT", payload: false })
    navigate('all')
  }, [])

  useEffect(() => {
    if (permissions.find(p => p == 'Create Subscriptions')) {
      setisVisibleAdd(true)
    }
  }, [permissions]);

  const goToAll = () => {
    dispatch({ type: 'LOAD_MEMBER_DATA', payload: {} })
    dispatch({ type: "CHANGE_ISADD", payload: false })
    navigate('all')
  }

  const goToAdd = () => {
    dispatch({ type: "CHANGE_ISADD", payload: true })

    navigate('add')
  }
  return (
    <div className='allPages' >
      <h1>Subscriptions</h1>
      {
        !isEdit && <>
          <BootstrapButton onClick={goToAll} variant="contained" disableRipple>
            All Members
          </BootstrapButton>

          {isVisibleAdd &&
            <BootstrapButton onClick={goToAdd} variant="contained" disableRipple>
              Add Member
            </BootstrapButton>}
        </>
      }

      <Outlet context={{ member }} />
    </div>
  )
}

export default Subscriptions