import React, { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import MovieCard from '../components/MovieCard';
import { useOutletContext, useNavigate } from 'react-router-dom'
import AlertComp from '../components/AlertComp';


const AllMovies = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const moviesData = useSelector(state => state.movies.movies)
    const isUpdated = useSelector(state => state.movies.isUpdated)
    const isAdded = useSelector(state => state.movies.isAdded)
    const { movie } = useOutletContext();

    const { deleted } = useOutletContext()
    const [deletedMovie, setdeletedMovie] = useState(deleted)

    useEffect(() => {
        setdeletedMovie(deleted)
    }, [deleted])

    const deletedMovieOrGoToEdit = useCallback(
        (movie) => {
            if (movie) {
                dispatch({ type: "CHANGEISEDITMOVIE", payload: true })
                dispatch({ type: 'LOADMOVIEDATA', payload: movie })
                navigate('/home/movies/edit')
            }
            else {
                setdeletedMovie(true)
            }
        }
    )



    return (
        <div >
            {deletedMovie && <AlertComp type='deleted' />}
            {isUpdated && <AlertComp type='updated' />}
            {isAdded && <AlertComp type='addad' />}


            {Object.keys(movie).length === 0 &&
                moviesData.map((movie, index) => {
                    return (
                        <MovieCard key={index} movie={movie} callback={deletedMovieOrGoToEdit} />
                    )
                })
            }
            {
                Object.keys(movie).length !== 0 && <MovieCard movie={movie} callback={deletedMovieOrGoToEdit} />
            }
            <div style={{ height: 40 }}></div>
        </div>
    )
}

export default React.memo(AllMovies) 