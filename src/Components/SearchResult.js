import React, { useContext } from 'react'
import { GlobalContext } from './GlobalContext'
import Imdb from '../Assets/Imdb.png'
import { ReactComponent as Like } from '../Assets/Heart.svg'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import { Spinner } from 'react-bootstrap'

const SearchResult = () => {
    const { movieList, setMovieList, loading, setFilmType, handleDecimal } = useContext(GlobalContext)

    // to set expected media type i.e "tv" or "movie" 
    const handleFilmType = (type) => {
        setFilmType(type)
    }

    // a function to add or remove a movie from the favorite list 
    const toggleLike = (id, liked, title) => {
        let copy = movieList.map((movie) => {

            return +id === movie.id ? { ...movie, liked: !movie.liked }
                : { ...movie }
        })
        !liked && toast.success(`${title} added to favorites`)
        liked && toast.success(`${title} removed from favorites`)
        setMovieList(copy)
    }
    return (
        <>
            {
                loading ?
                    <Spinner animation="border" role="status" />
                    :
                    <div className='featured'>
                        <p>Search Result</p>
                        <div className='movie-container'>{movieList && movieList.length > 0 ?
                            movieList.map((movie) => (
                                <div key={movie.id} data-testid='movie-card' className='movie-card'>
                                    <Link onClick={() => handleFilmType(movie.media_type)} to={movie.media_type === "tv" ? `/tv/${movie.id}` : `/movies/${movie.id}`} >
                                        <img data-testid='movie-poster' src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt='movie poster' />
                                        <p data-testid='movie-release-date'>{movie.release_date || movie.first_air_date}</p>
                                        <h3 data-testid='movie-title'>{movie.title || movie.name}</h3>
                                        <div className='card-rating'>
                                            <img src={Imdb} alt='Imdb logo' />
                                            <span>{handleDecimal(movie.vote_average)}</span>
                                        </div>
                                    </Link>
                                    <div onClick={() => toggleLike(movie.id, movie.liked, movie.title)} className='fav-icon'><Like className={movie.liked === true ? 'like' : ''} /></div>
                                </div>
                            ))
                            :
                            <p>No match found!</p>
                        }
                        </div>

                    </div>
            }
        </>
    )
}

export default SearchResult