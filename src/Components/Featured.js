import React, { useContext } from 'react'
import { GlobalContext } from './GlobalContext'
import right from '../Assets/Chevron right.png'
import Imdb from '../Assets/Imdb.png'
import { ReactComponent as Like } from '../Assets/Heart.svg'
import CardPlaceholder from './CardPlaceholder'
import { Link, NavLink } from 'react-router-dom'
import { toast } from 'react-toastify';

const Featured = () => {
    const { loading, featured, setFeatured, setFilmType, handleDecimal, handleUtc } = useContext(GlobalContext)

    // to set expected media type i.e "tv" or "movie" 
    const handleFilmType = (type) => {
        setFilmType(type)
    }
    
    // a function to add or remove a movie from the favorite list 
    const toggleLike = (id, liked, title) => {
        let copy = featured.map((movie) => {

            return +id === movie.id ? { ...movie, liked: !movie.liked }
                : { ...movie }
        })
        !liked && toast.success(`${title} added to favorites`)
        liked && toast.success(`${title} removed from favorites`)
        setFeatured(copy)
    }

    return (
        <div className='featured'>
            <div className='featured-hd'>
                <h1>Featured Movie</h1>
                <NavLink to='/movies'><p >See more <img src={right} alt='chevron right' /></p></NavLink>
            </div>

            {loading ?
                <div className='placeholder-container' >
                    <CardPlaceholder />
                    <CardPlaceholder />
                    <CardPlaceholder />
                    <CardPlaceholder />
                </div>
                :
                <div className='movie-container'>{featured && featured.length > 0 ?
                    featured.map((movie) => (
                        <div key={movie.id} data-testid='movie-card' className='movie-card'>
                            <Link onClick={() => handleFilmType(movie.media_type)} to={`/movies/${movie.id}`} >
                            <img data-testid='movie-poster' src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt='movie poster' />
                            <p data-testid='movie-release-date'>{handleUtc(movie.release_date)}</p>
                            <h3 data-testid='movie-title'>{movie.title}</h3>
                            <div className='card-rating'>
                                <img src={Imdb} alt='Imdb logo'/>
                                <span>{handleDecimal(movie.vote_average)}</span>
                            </div>
                            </Link>
                            <div onClick={()=>toggleLike(movie.id, movie.liked, movie.title)} className='fav-icon'><Like className={movie.liked=== true ? 'like' : ''} /></div>
                        </div>
                    ))
                    :
                    <p>Featured movies not available</p>
                }
                </div>
            }
        </div>
    )
}

export default Featured