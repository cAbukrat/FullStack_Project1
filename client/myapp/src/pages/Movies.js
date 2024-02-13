import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import { Outlet } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Paper from '@mui/material/Paper';
import CloseIcon from '@mui/icons-material/Close';
import Collapse from '@mui/material/Collapse';
import MovieCard from '../components/MovieCard';

const Movies = () => {

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
  const isEdit = useSelector(state => state.movies.isEditMovie)
  const isAdd = useSelector(state => state.movies.isAddMovie)
  const movie = useSelector(state => state.movies.movieData)
  const permissions = useSelector(state => state.users.userPermissions)

  const [isVisibleAdd, setisVisibleAdd] = useState(false)

  const [isFind, setisFind] = useState(false)
  const [open, setopen] = useState(false)
  const [filterMovie, setfilterMovie] = useState('')
  const [deleted, setdeleted] = useState(false)


  const getMovie = async () => {
    const { data } = await axios.get(`http://localhost:8080/movies/${filterMovie}`)
    if (data === 'Movie not found!') {
      setopen(true)
      setisFind(false)
    }
    else {
      dispatch({ type: 'LOADMOVIEDATA', payload: data })
      setisFind(true)
      setopen(false)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const { data: movies } = await axios.get("http://localhost:8080/movies")
      dispatch({ type: "LOADMOVIES", payload: movies })
    }
    fetchData()
    setisFind(false)
    setdeleted(false)
    dispatch({ type: "CHANGEISEDITMOVIE", payload: false })
    navigate('all')
  }, [])

  useEffect(() => {
    if (permissions.find(p => p == 'Create Movies')) {
      setisVisibleAdd(true)
    }
  }, [permissions]);

  const goToAllWithAlert = (movie) => {
    if (movie) {
      dispatch({ type: "CHANGEISEDITMOVIE", payload: true })
      setisFind(false)
      dispatch({ type: 'LOADMOVIEDATA', payload: movie })
      navigate('edit')
    }
    else {
      setdeleted(true)
      goToAll()
    }
  }

  const goToAll = () => {
    dispatch({ type: "CHANGEISADDMOVIE", payload: false })
    dispatch({ type: 'LOADMOVIEDATA', payload: {} })
    setisFind(false)
    navigate('all')
  }

  const goToAdd = () => {
    dispatch({ type: "CHANGEISADDMOVIE", payload: true })
    setisFind(false)
    setdeleted(false)
    navigate('add')
  }

  return (
    <div className='allPages'>
      <h1>Movies</h1>
      {!isEdit && <>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <BootstrapButton onClick={goToAll} variant="contained" disableRipple>
            All Movies
          </BootstrapButton>

          {isVisibleAdd &&
            <BootstrapButton onClick={goToAdd} variant="contained" disableRipple>
              Add Movie
            </BootstrapButton>}

          {!isAdd &&
            <Paper elevation={6} sx={{ ml: 2, p: '2px 4px', display: 'flex', alignItems: 'center', width: 250 }} >
              <InputBase onChange={(e) => setfilterMovie(e.target.value)} sx={{ ml: 1, flex: 1 }} placeholder="Find Movie" inputProps={{ 'aria-label': 'find movie' }} />
              <IconButton onClick={getMovie} type="button" sx={{ p: '10px' }} aria-label="search" color="secondary">
                <SearchIcon />
              </IconButton>
            </Paper>
          }
        </div>


        {!isAdd && <>
          {isFind && Object.keys(movie).length !== 0 && <MovieCard movie={movie} callback={goToAllWithAlert} />}
          <Collapse in={open}>
            <Alert
              severity="error"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setopen(false);
                  }} >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mx: 20, mt: 5 }}
            >
              Movie not found!
            </Alert>
          </Collapse>
        </>}
      </>}
      {!isFind && <Outlet context={{ deleted, movie }} />}
    </div>
  )
}

export default Movies