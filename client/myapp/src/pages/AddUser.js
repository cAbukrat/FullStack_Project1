import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import CheckboxPermissions from '../components/CheckboxPermissions';
import Button from '@mui/material/Button';


const AddUser = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [userData, setuserData] = useState({ userName: "", fName: "", lName: "", createdDate: "", sessionTimeOut: 0, permissions: [] })

    useEffect(() => {
        const currentDate = new Date();
        const year = currentDate.getFullYear().toString(); // מחזיר את השנה בתור מחרוזת
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // מחזיר את החודש בתור מחרוזת (צריך להוסיף 1, מכיוון שהחודשים מסופרים מ-0 עד 11)
        const day = currentDate.getDate().toString().padStart(2, '0'); // מחזיר את היום בתור מחרוזת
        const formattedDate = `${day}/${month}/${year}`
        setuserData({ ...userData, createdDate: formattedDate/*, permissions: selectedPermissions */});
    }, []);

    const getPermissions = (permissions) => {
        setuserData({ ...userData, permissions: permissions })
    }

    const saveUser = async () => {
        const { data } =  await axios.post("http://localhost:8080/users", userData)
        const obj = {id: data.id, userName: userData.userName, name : userData.fName +" "+userData.lName, createdDate: userData.createdDate, sessionTimeOut: userData.sessionTimeOut, permissions: userData.permissions }
        dispatch({ type: 'ADDUSER', payload: obj })
        dispatch({ type: 'CHANGEISADDUSER', payload: false })
    }

    const goToAllUsers = () => {
        dispatch({ type: 'CHANGEISEDIT', payload: false })
        dispatch({ type: "CHANGEISADDUSER", payload: false })
        navigate('/home/manageUsers')
    }

    return (
        <div>
            <h2 style={{ color: '#46505A' }}>Add new User</h2>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, display: 'flex' }, p: 2, border: '2px solid gray', borderRadius: 2, textAlign: 'left', width: 450, color: '#46505A', mb: 5
                    }}>
                    <TextField onChange={(e) => setuserData({ ...userData, fName: e.target.value })} label="First Name" variant="filled" color="secondary" size='small' />
                    <TextField onChange={(e) => setuserData({ ...userData, lName: e.target.value })} label="Last Name" variant="filled" color="secondary" size='small' />
                    <TextField onChange={(e) => setuserData({ ...userData, userName: e.target.value })} label="User Name" variant="filled" color="secondary" size='small' />
                    <TextField onChange={(e) => setuserData({ ...userData, sessionTimeOut: e.target.value })} label="Session time out (Minutes):" variant="filled" color="secondary" size='small' /><br />
                    <CheckboxPermissions callback={getPermissions} />
                    <br />
                    <Button onClick={saveUser} sx={{ mr: '10px', width: '55.5ch' }} color="secondary" variant="contained" >
                        Save
                    </Button>
                    <Button onClick={goToAllUsers} sx={{ width: '55.5ch' }} color="secondary" variant="outlined"  >
                        Cancel
                    </Button>
                </Box>
            </div>
        </div>
    )
}

export default React.memo(AddUser) 