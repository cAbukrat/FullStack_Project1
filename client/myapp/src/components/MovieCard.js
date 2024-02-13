import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { format } from 'date-fns';
import Link from '@mui/material/Link';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

const MovieCard = ({ movie, callback }) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const permissions = useSelector(state => state.users.userPermissions)
    const [isVisibleDelete, setisVisibleDelete] = useState(false)
    const [isVisibleUpdate, setisVisibleUpdate] = useState(false)

    useEffect(() => {
        if (permissions.find(p => p == 'Delete Movies')) {
            setisVisibleDelete(true)
        }
        if (permissions.find(p => p == 'Update Movies')) {
            setisVisibleUpdate(true)
        }
    }, []);

    const deleteMovie = async (id) => {
        await axios.delete(`http://localhost:8080/movies/${id}`)
        dispatch({ type: "DELETEMOVIE", payload: id })
        callback()
    }

    const goToEdit = (movie) => {
        callback(movie)
    }


    const goToAllMembers = async (id) => {
        if (permissions.find(p => p == 'View Subscriptions')) {
            const { data } = await axios.get(`http://localhost:8080/members/${id}`)
            dispatch({ type: 'LOAD_MEMBER_DATA', payload: data })
            navigate('/home/subscriptions')
        }
    }

    return (
        <div>
            <Card key={movie.movieData?._id} elevation={6} sx={{ mt: 5, mx: 20, display: 'flex', flex: ' 1 0 auto', textAlign: 'left' }}>
            <Box sx={{width: 60 , backgroundColor:'gray'}}></Box>
                <Box sx={{display: 'flex', flexDirection: 'row', width: 200}}>
                    <CardMedia
                    component="img"
                    alt={movie.movieData?.name}
                    image={movie.movieData?.image}
                />
                </Box>
                <Box sx={{width: 60 , backgroundColor:' #d5d5d6'}}></Box>
               
                <Box sx={{ display: 'flex', flexDirection: 'column', width: 500 }}>
                    <CardContent sx={{ flex: ' 1 0 auto' }}>
                        <Typography variant="h5" color="text.secondary">
                            <strong>{movie.movieData?.name} </strong>
                        </Typography>
                        <Typography variant="h6" color="text.secondary">
                            {movie.movieData?.premiered?.slice(0, 4)}
                        </Typography>
                        <Typography variant="body3" color="text.secondary">
                            Genres : {movie.movieData?.genres?.join(', ')}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        {isVisibleUpdate && <Button onClick={() => goToEdit(movie.movieData)} size="small" color="secondary" >Edit</Button>}
                        {isVisibleDelete && <Button onClick={() => deleteMovie(movie.movieData._id)} size="small" color="secondary">Delete</Button>}
                    </CardActions>
                </Box>
                <Typography sx={{ mx: 5, width: 500 }} variant="body3" color="text.secondary">
                    <h4>Subscriptions Watched : </h4>
                    <ul>
                        {movie.subscription?.map((s, index) => {
                            return (
                                <li key={index}>
                                    <Link
                                        underline="hover"
                                        color="secondary"
                                        component="button"
                                        variant="body2"
                                        onClick={() => {
                                            goToAllMembers(s.memberId)
                                        }}
                                    >
                                        {s.name}
                                    </Link>
                                    , {format(new Date(s.date), 'dd/MM/yyyy')}
                                </li>
                            )
                        })}
                    </ul>
                </Typography>

            </Card>

        </div>
    )
}

export default React.memo(MovieCard) 