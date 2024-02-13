import React, { useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';


const Login = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [userName, setuserName] = useState("")
    const [password, setpassword] = useState("")
    const [error, seterror] = useState(null)

    const handleLogin = async () => {
        seterror(null)
        const { data } = await axios.post("http://localhost:8080/auth/login", { "userName": userName, "password": password })
        if (data.status === "OK") {
            sessionStorage.setItem("token", data.token)
            navigate('/home')
            const expiresIn = new Date(Date.now() + 60 * 60 * 1000); // 1 hour in milliseconds
            dispatch({ type: 'LOAD_EXPIRESIN', payload: expiresIn })
        }
        seterror(data.massage)
    }

    return (
        <div>
            <div className='halfPage'>
                <div className='backgroundImage' >
                    <h1>Movies - <br />Subscriptions Web Site</h1>
                </div>
                <div className='content'>
                    <Box
                        sx={{
                            width: 400,
                            maxWidth: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <h1>Login</h1><br /><br />
                        <TextField
                            fullWidth label="Username"
                            size="small"
                            onChange={e => setuserName(e.target.value)}
                        /><br /><br />
                        <TextField
                            fullWidth label="Password"
                            size="small"
                            type='password'
                            onChange={e => setpassword(e.target.value)}
                        /><br />
                        <small>{error && <div className='error'>{error}</div>}</small><br />
                        <Button
                            fullWidth
                            variant="contained"
                            onClick={handleLogin}
                        >Login</Button>
                        <p>
                            New User?  <Link href="./register" underline="hover">
                                {'Create Acount'}
                            </Link>
                        </p>


                    </Box>

                </div>
            </div>

        </div>
    )
}

export default Login