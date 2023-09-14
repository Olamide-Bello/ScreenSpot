import React, { useContext } from 'react'
import { GlobalContext } from './GlobalContext'
import Imdb from '../Assets/Imdb.png'
import { ReactComponent as Like } from '../Assets/Heart.svg'
import CardPlaceholder from './CardPlaceholder'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import Menu from '../Assets/Menu.png'

const Tv = () => {
    const {trendingSeries, loading, setTrendingSeries, handleMenu, matches, handleDecimal} = useContext(GlobalContext)

    // a function to add or remove a movie from the favorite list
    const toggleLike = (id, liked, title) => {
        let copy = trendingSeries.map((movie) => {
            return +id === movie.id ? { ...movie, liked: !movie.liked }
            : { ...movie }
        })
        !liked && toast.success(`${title} added to favorites`)
        liked && toast.success(`${title} removed from favorites`)
        setTrendingSeries(copy)
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
                <div className='movie-container-all'>{trendingSeries && trendingSeries.length > 0 ?
                    trendingSeries.map((movie) => (
                        <div key={movie.id} data-testid='movie-card' className='movie-card'>
                            <Link to={`/tv/${movie.id}`} >
                            <img data-testid='movie-poster' src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt='movie poster' />
                            <p data-testid='movie-release-date'>{movie.first_air_date}</p>
                            <h3 data-testid='movie-title'>{movie.name}</h3>
                            <div className='card-rating'>
                                <img src={Imdb} alt='Imdb logo'/>
                                <span>{handleDecimal(movie.vote_average)}</span>
                            </div>
                            </Link>
                            <div onClick={()=>toggleLike(movie.id, movie.liked, movie.name)} className='fav-icon'><Like className={movie.liked=== true ? 'like' : ''} /></div>
                        </div>
                    ))
                    :
                    <p>Tv series not available</p>
                }
                </div>
            }
    </div>
  )
}

export default Tv