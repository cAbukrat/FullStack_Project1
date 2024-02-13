import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import MainAppBar from '../components/MainAppBar'
import { useDispatch } from 'react-redux'

const Home = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const token = sessionStorage.getItem("token") || null
    const [name, setname] = useState(false)


    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios.get("http://localhost:8080/auth/verify", { headers: { 'x-access-token': token } })
            if (data !== 'OK') {
                navigate('/')
            }
            else {
                dispatch({ type: 'LOAD_PERMISSIONS', payload: [] })
                setname(true)
            }
        }
        fetchData()
    }, []);


    return (
        <div className='homePage'  >
            {name && <MainAppBar />}
            <div>
                <Outlet />
            </div>
        </div>
    )
}

export default Home