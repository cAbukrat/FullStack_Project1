import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { format } from 'date-fns';
import Link from '@mui/material/Link';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import dayjs from 'dayjs';

const MemberCard = ({ member, callback }) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const cardMemberData = useSelector(state => state.subscriptions.cardMemberData)
    const permissions = useSelector(state => state.users.userPermissions)


    const [isVisibleDelete, setisVisibleDelete] = useState(false)
    const [isVisibleUpdate, setisVisibleUpdate] = useState(false)

    const [date, setdate] = useState(null)
    const [movie, setmovie] = useState({ movieId: '', date: '' })
    const [selectedMovie, setselectedMovie] = useState('')
    const [open, setopen] = useState(false)
    const [subsWithMoviesNames, setsubsWithMoviesNames] = useState([]);
    const [unwatchedMovies, setunwatchedMovies] = useState([])


    useEffect(() => {
        setsubsWithMoviesNames([])
        setunwatchedMovies([])
        const getMovieName = async (movieId) => {
            const { data: name } = await axios.get(`http://localhost:8080/movies/movie/${movieId}`)
            return name;
        };
        const fetchData = async () => {
            if (member.subscription?.length > 0) {
                const arr = []
                member.subscription[0].movies.forEach(async (movie) => {
                    const movieName = await getMovieName(movie.movieId);
                    const obj = { name: movieName, date: movie.date }
                    arr.push(obj)
                })
                setsubsWithMoviesNames(arr)
            }
        }
        setunwatchedMovies(member.unwatchedMovies)
        fetchData()
    }, []);

    useEffect(() => {
        if (permissions.find(p => p == 'Delete Subscriptions')) {
            setisVisibleDelete(true)
        }
        if (permissions.find(p => p == 'Update Subscriptions')) {
            setisVisibleUpdate(true)
        }
    }, []);


    useEffect(() => {
        setmovie({ ...movie, date: dayjs(date).format("YYYY-MM-DDTHH:mm:ss.SSSZ") })
    }, [date]);

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios.get(`http://localhost:8080/movies/${selectedMovie}`)
            const id = data.movieData?._id
            setmovie({ ...movie, movieId: id })
        }
        fetchData()
    }, [selectedMovie]);


    const deleteMember = async (id) => {
        await axios.delete(`http://localhost:8080/members/${id}`)
        dispatch({ type: "DELETE_MEMBER", payload: id })
        callback()
    }

    const goToEdit = (member) => {
        callback(member)
    }

    const goToAllMovies = async (name) => {
        if (permissions.find(p => p == 'View Movies')) {
            const { data } = await axios.get(`http://localhost:8080/movies/${name}`)
            dispatch({ type: 'LOADMOVIEDATA', payload: data })
            navigate('/home/movies')
        }
    }

    const updateSubWithMovieNames = async () => {
        const arr = []
        const unwatched = unwatchedMovies
        cardMemberData.subscription[0].movies.forEach(async (movie) => {
            const movieName = await getMovieName(movie.movieId);
            const obj = { name: movieName, date: movie.date }
            arr.push(obj)
            const index = unwatched.findIndex(m => m === movieName)
            if (index > 0) {
                unwatched.splice(index, 1)
            }
        })
        setsubsWithMoviesNames(arr)
        setunwatchedMovies(unwatched)
    }

    const getMovieName = async (movieId) => {
        const { data: name } = await axios.get(`http://localhost:8080/movies/movie/${movieId}`)
        return name;
    };

    const subscribe = async () => {
        if (movie.movieId && movie.date) {
            const { data } = await axios.put(`http://localhost:8080/subscriptions/${member.memberData._id}`, movie)
            dispatch({ type: 'LOAD_CARD_MEMBER_DATA', payload: data })
            await updateSubWithMovieNames()
            setdate(null)
            setselectedMovie('')
            setmovie({ movieId: '', date: '' })
        }
    }

    return (
        <div>
            <Card key={member.memberData._id} elevation={6} sx={{ mt: 5, mx: 20, display: 'flex', flex: ' 1 0 auto', textAlign: 'left' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', width: 500 }}>
                    <CardContent sx={{ flex: ' 1 0 auto' }}>
                        <Typography variant="h5" color="text.secondary">
                            <strong>{member.memberData.name} </strong>
                        </Typography>
                        <Typography variant="body3" color="text.secondary">
                            <strong>Email : </strong>{member.memberData.email}
                        </Typography><br />
                        <Typography variant="body3" color="text.secondary">
                            <strong>City : </strong>{member.memberData.city}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        {isVisibleUpdate && <Button onClick={() => goToEdit(member.memberData)} size="small" color="secondary" >Edit</Button>}
                        {isVisibleDelete && <Button onClick={() => deleteMember(member.memberData._id)} size="small" color="secondary">Delete</Button>}


                    </CardActions>
                </Box>

                <Box sx={{ mx: 5, width: 500 }} variant="body3" color="text.secondary">
                    <CardContent sx={{ flex: ' 1 0 auto' }}>
                        <Typography variant="h6" color="text.secondary">
                            Movies Watched :
                        </Typography>


                        <Typography sx={{ mx: 5, width: 500 }} variant="body3" color="text.secondary">
                            {<ul>
                                {subsWithMoviesNames.map((m, index) => {
                                    return (
                                        <li key={index}>
                                            <Link
                                                underline="hover"
                                                color="secondary"
                                                component="button"
                                                variant="body2"
                                                onClick={() => {
                                                    goToAllMovies(m.name)
                                                }}
                                            >
                                                {m.name}
                                            </Link>
                                            , {format(new Date(m.date), 'dd/MM/yyyy')}
                                        </li>
                                    )
                                })}
                            </ul>}
                        </Typography>
                    </CardContent>
                </Box>
                <Button onClick={() => { setopen(!open) }} size="small" color="secondary" variant="outlined" style={{ textTransform: 'none', fontSize: '16px', width: 120, minWidth: 90 }}>Subscribe to new movie</Button>
                {
                    open &&
                    <Box sx={{ mx: 5, width: 400 }}>
                        <CardContent sx={{ flex: ' 1 0 auto', color: "text.secondary" }}>
                            <Typography variant="h6" >
                                Add a new movie
                            </Typography><br />
                            <FormControl color="secondary" variant="standard" sx={{ minWidth: 200 }}>
                                <InputLabel >Movie</InputLabel>
                                <Select
                                    value={selectedMovie}
                                    onChange={(e) => { setselectedMovie(e.target.value) }}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {unwatchedMovies?.map((m, index) => {
                                        return <MenuItem key={index} value={m}>{m}</MenuItem>
                                    })}

                                </Select>
                            </FormControl>
                            <br /><br />
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateField
                                    sx={{ minWidth: 200 }}
                                    size='small'
                                    variant="standard"
                                    color="secondary"
                                    label="Date"
                                    clearable
                                    slots={{ clearIcon: HighlightOffIcon }}
                                    value={date}
                                    onChange={(newValue) => setdate(newValue)}
                                />
                            </LocalizationProvider>
                        </CardContent>
                        <CardActions>
                            <Button onClick={subscribe} size="small" color="secondary" >Subscribe</Button>
                        </CardActions>
                    </Box>
                }
            </Card>
        </div>
    )
}

export default React.memo(MemberCard) 