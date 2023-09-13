import React, { useContext } from 'react'
import { GlobalContext } from './GlobalContext'
import Imdb from '../Assets/Imdb.png'
import { ReactComponent as Like } from '../Assets/Heart.svg'
import CardPlaceholder from './CardPlaceholder'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import Menu from '../Assets/Menu.png'

const Upcoming = () => {
    const {upComingMovies, loading, setUpcomingMovies, handleMenu, matches} = useContext(GlobalContext)

    // a function to add or remove a movie from the favorite list
    const toggleLike = (id, liked, title) => {
        let copy = upComingMovies.map((movie) => {
            return +id === movie.id ? { ...movie, liked: !movie.liked }
            : { ...movie }
        })
        !liked && toast.success(`${title} added to favorites`)
        liked && toast.success(`${title} removed from favorites`)
        setUpcomingMovies(copy)
    }
  return (
    <div className='container1'>
        {matches && <div className='menu'><img onClick={handleMenu} src={Menu} alt='menu'/></div>}
        {loading ?
                <div className='placeholder-container-all' >
                    <CardPlaceholder />
                    <CardPlaceholder />
                    <CardPlaceholder />
                </div>
                :
                <div className='movie-container-all'>{upComingMovies && upComingMovies.length > 0 ?
                    upComingMovies.map((movie) => (
                        <div key={movie.id} data-testid='movie-card' className='movie-card'>
                            <Link to={`/movies/${movie.id}`} >
                            <img data-testid='movie-poster' src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt='movie poster' />
                            <p data-testid='movie-release-date'>{movie.release_date}</p>
                            <h3 data-testid='movie-title'>{movie.title}</h3>
                            <div className='card-rating'>
                                <img src={Imdb} alt='Imdb logo'/>
                                <span>{movie.vote_average}</span>
                            </div>
                            </Link>
                            <div onClick={()=>toggleLike(movie.id, movie.liked, movie.title)} className='fav-icon'><Like className={movie.liked=== true ? 'like' : ''} /></div>
                        </div>
                    ))
                    :
                    <p>Upcoming movies not available</p>
                }
                </div>
            }
    </div>
  )
}

export default Upcoming