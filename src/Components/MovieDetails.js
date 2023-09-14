import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom';
import YouTube from "react-youtube";
import Star from '../Assets/Star.png'
import { toast } from 'react-toastify';
import { GlobalContext } from './GlobalContext';
import Menu from '../Assets/Menu.png'

const MovieDetails = () => {
    const { id } = useParams()
    const [movieDetail, setMovieDetails] = useState({})
    const [movieTrailerKey, setMovieTrailerKey] = useState("")
    const [prodYear, setProdYear] = useState("")
    const [releaseDate, setReleaseDate] = useState("")
    const { matches, handleMenu } = useContext(GlobalContext)

    // to get a movie detail by id
    useEffect(() => {
        (async () => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=9fd66d9e18c945f965d9d1a26f32c9a1&append_to_response=videos`)
                const result = await response.json()
                if (result.id) {
                    setMovieDetails(result)
                    const dateFormat = new Date(result.release_date)
                    const utcDate = dateFormat.toUTCString()
                    const year = dateFormat.getFullYear()
                    setReleaseDate(utcDate)
                    setProdYear(year)
                }
                if (result.videos) {
                    const officialTrailer = result.videos.results.find(
                        video => video.name.includes("Official Trailer") || video.name.includes("Trailer")
                    )
                    setMovieTrailerKey(officialTrailer.key)

                }
                if(response.status === 404 ) {
                    throw Error('Content not found') 
                } 
            } catch (error) {
                toast.error(`${error.name}: ${error.message}. Check your internet connection and try again`)
            }

        })
            ()
    }, [id])


    return (
        <div className='movie-detail'>
            {matches && <div className='menu'><img onClick={handleMenu} src={Menu} alt='menu' /></div>}
            <div className="iframe">
                <YouTube videoId={movieTrailerKey} iframeClassName="frame" />
            </div>
            <div className='detail-bd'>
                <div className='detail-lt'>
                    <span data-testid='movie-title'>{movieDetail?.title}</span>{!matches &&<span>|</span>}
                    <span className='prod-year'>{prodYear}</span><span>|</span>
                    {movieDetail.genres?.map((each, index) => { return <span className='genre' key={index}>{each.name}</span> })}
                </div>
                <div className='card-rating'>
                    <img src={Star} alt='star' />
                    <span className='vote'>{movieDetail?.vote_average}</span>
                </div>
            </div>
            <div className='detail'>
                <div>
                    <p data-testid="movie-overview">{movieDetail?.overview}</p>
                    <p><span>Release Date : </span><span className='alt-color' data-testid='movie-release-date'>{releaseDate}</span></p>
                    <p><span>Runtime : </span><span data-testid='movie-runtime' className='alt-color'>{movieDetail?.runtime}</span><span className='alt-color'> minutes</span></p>
                    <p><span>Language :</span> {movieDetail.spoken_languages?.map((language, index) => <span className='alt-color' key={index}>{index ? ', ' : ''}{language.name}</span>)}</p>
                </div>
                {!matches && <img src={`https://image.tmdb.org/t/p/original${movieDetail?.poster_path}`} alt='movie poster' />}
            </div>
        </div>
    )
}

export default MovieDetails