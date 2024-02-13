import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from 'react-redux'
import Avatar from '@mui/material/Avatar';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import CardMedia from '@mui/material/CardMedia';




const MainAppBar = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const permissions = useSelector(state => state.users.userPermissions)
    const token = sessionStorage.getItem("token")
    const [name, setname] = useState('')
    const [isAdmin, setisAdmin] = useState(false)
    const [isVisibleMovies, setisVisibleMovies] = useState(false)
    const [isVisibleSubscriptions, setisVisibleSubscriptions] = useState(false)


    useEffect(() => {
        const fetchData = async () => {
            const decodedToken = jwtDecode(token);
            const userId = decodedToken.id;
            const { data } = await axios.get(`http://localhost:8080/users/${userId}`)
            setname(data.name)
            setisAdmin(data.isAdmin)
            const { data: userPermissions } = await axios.get(`http://localhost:8080/users/permissions/${userId}`)
            dispatch({type: 'LOAD_PERMISSIONS', payload: userPermissions})
        }
        fetchData()
    }, []);
    

    useEffect(() => {
        if (permissions.length > 0) {
            if (permissions.find(p => p == 'View Movies')) {
                setisVisibleMovies(true)
            }
            if (permissions.find(p => p == 'View Subscriptions')) {
                setisVisibleSubscriptions(true)
            }
        }
    }, [permissions]);

    const handleLogout = () => {
        sessionStorage.removeItem("token")
        navigate('/')
    }

    const goToMovies = () => {
        dispatch({ type: 'LOADMOVIEDATA', payload: {} })
        dispatch({ type: "CHANGEISADDMOVIE", payload: false })
        dispatch({ type: 'CHANGEISADDED', payload: false })
        dispatch({ type: 'CHANGEISUPDATED', payload: false })
        navigate('movies/all')
    }

    const goToSubscriptions = () => {
        dispatch({ type: 'LOAD_MEMBER_DATA', payload: {} })
        dispatch({ type: "CHANGE_ISADD", payload: false })
        dispatch({ type: 'CHANGE_IS_ADDED', payload: false })
        dispatch({ type: 'CHANGE_IS_UPDATED', payload: false })
        navigate('subscriptions/all')
    }

    const goToManageUsers = () => {
        dispatch({ type: "CHANGEISEDIT", payload: false })
        dispatch({ type: 'CHANGEISADDUSER', payload: false })
        dispatch({ type: 'CHANGE_ISADDED', payload: false })
        dispatch({ type: 'CHANGE_ISUPDATED', payload: false })
        navigate('manageUsers')
    }
    return (
        <div>
            <AppBar sx={{ backgroundColor: "#9e3b8f"}}>
                <Toolbar>
                <Box sx={{width: 400}}>
                    <CardMedia
                    component="img"
                    alt='logo'
                    image={require('../images/logoAppBar.png')}
                />
                </Box>
                    <Box sx={{ flexGrow: 1 }}>

                    </Box>
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        {isVisibleMovies && 
                        <Button className='button' sx={{ color: '#fff' }} onClick={goToMovies}>
                            Movies
                        </Button> }

                        {isVisibleSubscriptions &&
                        <Button className='button' sx={{ color: '#fff' }} onClick={goToSubscriptions}>
                            Subscriptions
                        </Button>}

                        {isAdmin && 
                        <Button className='button' sx={{ color: '#fff' }} onClick={goToManageUsers}>
                            Users Management
                        </Button>}

                        <Button className='button' sx={{ color: '#fff' }} onClick={handleLogout}>
                            Logout
                        </Button>

                    </Box>
                    <Tooltip title={name}>
                        <Avatar alt={name} src="/broken-image.jpg" />
                    </Tooltip>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default MainAppBar