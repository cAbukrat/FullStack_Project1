import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/system/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import AlertComp from '../components/AlertComp';




const AllUsers = ({ callback }) => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const usersData = useSelector(state => state.users.users)
  const isUpdated = useSelector(state => state.users.isUpdated)
  const isAdded = useSelector(state => state.users.isAdded)
  const [deleted, setdeleted] = useState(false)

  useEffect(() => {
    setdeleted(false)
  }, [])
  

  const goToEdit = (user) => {
    dispatch({ type: "CHANGEISEDIT", payload: true })
    navigate('edit')
    callback(user)
  }

  const deleteUser = async (id) => {
    const { data } = await axios.delete(`http://localhost:8080/users/${id}`)
    dispatch({ type: "DELETEUSER", payload: id })
    setdeleted(true)
  }


  return (
    <div>
      
      {deleted && <AlertComp type='deleted' />}
      {isUpdated && <AlertComp type='updated' comp ='users' />}
      {isAdded && <AlertComp type='addad' comp ='users'/>}

      {
        usersData.map((user, index) => {
          return (
            <Card key={index} elevation={6} sx={{ position: 'relative', mt: 5, mx: 20, display: 'flex', flex: ' 1 0 auto', textAlign: 'left' }}>
              <Box sx={{ flex: ' 1 0 auto', p: 2 }}>
                <CardContent sx={{ flex: ' 1 0 auto', width: 550 }}>
                  <Typography variant="body3" color="text.secondary">
                    <strong>Name :</strong> {user.name}<br />
                    <strong>User Name :</strong> {user.userName}<br />
                    <strong>Session time out (Minutes):</strong> {user.sessionTimeOut}<br />
                    <strong>Created date :</strong> {user.createdDate}<br />
                    <strong>Permissions :</strong> {user.permissions.join(', ')}
                  </Typography>
                </CardContent>

                <CardActions >
                  <Button onClick={() => goToEdit(user)} size="small" color="secondary" >Edit</Button>
                  <Button onClick={() => deleteUser(user.id)} size="small" color="secondary">Delete</Button>
                </CardActions>
              </Box>
            </Card>
          )
        })
      }
      <div style={{height:40}}></div>
    </div>
  )
}

export default React.memo(AllUsers) 