import React, { useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';
import { format } from 'date-fns';
import axios from 'axios';

const EditMovie = () => {

  const { movie } = useOutletContext();
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [movieData, setmovieData] = useState({_id: movie._id, name: movie.name, genres: movie.genres, image: movie.image, premiered: movie.premiered })

  const updateMovie = async () => {
    const { data } = await axios.put(`http://localhost:8080/movies/${movieData._id}`, movieData)
    if(data === 'Updated!'){
      dispatch({ type: "UPDATEMOVIE", payload: { id: movieData._id, movie: movieData } })
      dispatch({ type: "CHANGEISEDITMOVIE", payload: false })
      dispatch({type : "CHANGEISADDMOVIE", payload : false})
      navigate('/home/movies/all')
    }
    else{
      console.log(data)
    }

  }

  const goToAllMovies = () => {
    dispatch({ type: "CHANGEISEDITMOVIE", payload: false })
    dispatch({type : "CHANGEISADDMOVIE", payload : false})
    dispatch({type: 'LOADMOVIEDATA', payload: {}})
    navigate('/home/movies/all')
  }


  return (
    <div>
      <h2 style={{ color: '#46505A' }}>Edit movie : {movie.name}</h2>
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

          <TextField onChange={(e) => setmovieData({ ...movieData, name: e.target.value })} defaultValue={movie.name} focused label="Name" variant="filled" color="secondary" size='small' />
          <TextField onChange={(e) => setmovieData({ ...movieData, genres: (e.target.value).split(',') })} defaultValue={movie.genres?.join(',')} focused label="Genres" variant="filled" color="secondary" size='small' />
          <TextField onChange={(e) => setmovieData({ ...movieData, image: e.target.value })} defaultValue={movie.image} focused label="Image url" variant="filled" color="secondary" size='small' />
          <TextField onChange={(e) => setmovieData({ ...movieData, premiered: e.target.value })} defaultValue={format(new Date(movie.premiered), 'dd/MM/yyyy')} focused label="Premiered" variant="filled" color="secondary" size='small' />

          <br />
          <Button onClick={updateMovie} sx={{ mr: '10px', width: '55.5ch' }} color="secondary" variant="contained" >
            Update
          </Button>
          <Button onClick={goToAllMovies} sx={{ width: '55.5ch' }} color="secondary" variant="outlined"  >
            Cancel
          </Button>
        </Box>
      </div>
    </div>

  )
}

export default EditMovie