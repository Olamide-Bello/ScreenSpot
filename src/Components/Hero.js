import React, { useContext, useState, useEffect } from 'react'
import { GlobalContext } from './GlobalContext'
import logo from '../Assets/tv.png'
import lens from '../Assets/Search.png'
import Menu from '../Assets/Menu.png'
import Imdb from '../Assets/Imdb.png'
import Tomato from '../Assets/RottenTomatoes.png'
import Play from '../Assets/Play.png'
import { toast } from 'react-toastify';

const Hero = () => {
    const { handleChange, matches } = useContext(GlobalContext)
    const [spotlight, setSpotlight] = useState({})
    const [logged, setLogged] = useState(false)

    //to handle user logged state
    const handleLogout = () => {
        setLogged(!logged)
    }

    //to fetch movie detail for the hero section
    useEffect(() => {
        (async () => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/movie/335977?api_key=9fd66d9e18c945f965d9d1a26f32c9a1&append_to_response=videos`)
                const result = await response.json()
                if (result.id) {
                    setSpotlight(result)
                }
            } catch (error) {
                toast.info(`Error ${error.code}: ${error.message}`)
            }

        })
            ()
    }, [])


    return (
        <div className='hero' style={{ background: `url(https://image.tmdb.org/t/p/original${spotlight?.backdrop_path}) no-repeat center center/cover` }}>
            <div className='hero-hd'>
                <div className='logo-hd'>
                    <img src={logo} alt='logo' />
                    <p>ScreenSpot</p>
                </div>
                {!matches && <div className='search-bar'>
                    <input type='search' id='search' placeholder='What do you want to watch?' name='search' onChange={handleChange} />
                    <img src={lens} alt='search' />
                </div>}
                <div className='user-nav'>
                    {logged ? <p onClick={handleLogout}>Log Out</p> : <p onClick={handleLogout}>Sign in</p>}
                    <img src={Menu} alt='menu' />
                </div>
            </div>
            {matches && <div className='search-bar'>
                <input type='search' id='search' placeholder='What do you want to watch?' name='search' onChange={handleChange} />
                <img src={lens} alt='search' />
            </div>}
            <div className='hero-bd'>
                <h1>{spotlight?.title}</h1>
                <div className='ratings'>
                    <div>
                        <img src={Imdb} alt='Imdb logo' />
                        <span>{spotlight?.vote_average}</span>
                    </div>
                    <div>
                        <img src={Tomato} alt='Rotten Tomato logo' />
                        <span>{spotlight?.popularity}</span>
                    </div>
                </div>
                <p>{spotlight?.overview}</p>
                <a href={`/movies/${spotlight?.id}`}><button className='play-btn'><img src={Play} alt='play' />  WATCH TRAILER</button></a>
            </div>


        </div>
    )
}

export default Hero