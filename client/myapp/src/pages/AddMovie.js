import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import dayjs from 'dayjs';



const AddMovie = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [date, setdate] = useState(null)
  const [movieData, setmovieData] = useState({name: '', genres:[], image: '', premiered: ""})

  useEffect(() => {
    setmovieData({ ...movieData, premiered: dayjs(date).format("YYYY-MM-DDTHH:mm:ss.SSSZ") })
}, [date])

  const addMovie =async() => {
    const {data} = await axios.post("http://localhost:8080/movies", movieData)
    const obj = {...movieData, _id: data.id}
    dispatch({type : 'ADDMOVIE', payload : obj}) 
    dispatch({type : "CHANGEISADDMOVIE", payload : false})
    navigate('/home/movies/all')
  }

  const goToAllMovies = () => {
    dispatch({ type: "CHANGEISEDITMOVIE", payload: false })
    dispatch({type : "CHANGEISADDMOVIE", payload : false})
    navigate('/home/movies/all')
  }

  return (
    <div>
      <h2 style={{ color: '#46505A' }}>Add New Movie</h2>
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

          <TextField onChange={(e) => setmovieData({ ...movieData, name: e.target.value })} label="Name" variant="filled" color="secondary" size='small' />
          <TextField onChange={(e) => setmovieData({ ...movieData, genres: (e.target.value).split(',') })} label="Genres" variant="filled" color="secondary" size='small' />
          <TextField onChange={(e) => setmovieData({ ...movieData, image: e.target.value })}  label="Image url" variant="filled" color="secondary" size='small' />
         {// <TextField onChange={(e) => setmovieData({ ...movieData, premiered: e.target.value })}  label="Premiered (yyyy/mm/dd)" variant="filled" color="secondary" size='small' />
}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateField
                                    size='small'
                                    variant="filled"
                                    color="secondary"
                                    label="Premiered"
                                    clearable
                                    slots={{ clearIcon: HighlightOffIcon }}
                                    value={date}
                                    onChange={(newValue) => setdate(newValue)} 
                                     />
                            </LocalizationProvider>

          <br />
          <Button onClick={addMovie} sx={{ mr: '10px', width: '55.5ch' }} color="secondary" variant="contained" >
            Save
          </Button>
          <Button onClick={goToAllMovies} sx={{ width: '55.5ch' }} color="secondary" variant="outlined"  >
            Cancel
          </Button>
        </Box>
      </div>
    </div>
  )
}

export default AddMovie