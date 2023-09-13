import { createContext, useEffect, useState, useMemo } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const GlobalContext = createContext({
    searchParam: "",
    handleChange: () => { },
    setFilmType: () => { },
    setFeatured: () => { },
    setTopRated: () => { },
    setMovieList: () => { },
    setTrendingSeries: () => { },
    setUpcomingMovies: () => { },
    handleMenu: () => { },
    menu: false,
    loading: false,
    movieList: [],
    topRated: [],
    featured: [],
    trendingSeries: [],
    upComingMovies: [],
    filmType: "",
    matches: window.matchMedia("(max-width: 780px)").matches
})
function GlobalState({ children }) {
    const [searchParam, setSearchParam] = useState("")
    const [movieList, setMovieList] = useState([])
    const [topRated, setTopRated] = useState([])
    const [featured, setFeatured] = useState([])
    const [trendingSeries, setTrendingSeries] = useState([])
    const [loading, setLoading] = useState(false)
    const [filmType, setFilmType] = useState("")
    const [menu, setMenu] = useState(false)
    const [upComingMovies, setUpcomingMovies] = useState([])
    const [matches, setMatches] = useState(
        window.matchMedia("(max-width: 780px)").matches
    )

    //to handle input change on search bar
    const handleChange = (e) => {
        setSearchParam(e.target.value)
    }

    //function to handle menu state
    const handleMenu = () => {
        setMenu(!menu)
    }

    // to fetch top rated movies from TMDB
    useEffect(() => {
        (async () => {
            try {
                setLoading(true)
                const response = await fetch("https://api.themoviedb.org/3/movie/top_rated?api_key=9fd66d9e18c945f965d9d1a26f32c9a1")
                console.log(response)
                const result = await response.json()
                if (result) {
                    console.log(result)
                    setTopRated(result.results)
                    setLoading(false)
                }
            } catch (error) {
                toast.info(`Error ${error.code}: ${error.message}`)
            }

        })
            ()
    }, [])

    // to get the top 10 rated movies for homescreen
    useMemo(() => {
        const featuredMovies = topRated.slice(0, 10)
        let copy = featuredMovies.map((movie) => {

            return { ...movie, liked: false }
        })
        console.log(copy)
        setFeatured(copy)
        setLoading(false)
    }, [topRated])

    //to fetch the trending tv series from TMDB
    useEffect(() => {
        (async () => {
            try {
                const response = await fetch("https://api.themoviedb.org/3/trending/tv/day?api_key=9fd66d9e18c945f965d9d1a26f32c9a1")
                const result = await response.json()
                if (result) {
                    setTrendingSeries(result.results)
                }
            } catch (error) {
                toast.info(`Error ${error.code}: ${error.message}`)
            }
        })
            ()
    }, [])

    // to fetch upcoming movies from TMDB
    useEffect(() => {
        (async () => {
            try {
                const response = await fetch("https://api.themoviedb.org/3/movie/upcoming?api_key=9fd66d9e18c945f965d9d1a26f32c9a1&language=en-US&page=1")
                const result = await response.json()
                if (result) {
                    setUpcomingMovies(result.results)
                }
            } catch (error) {
                toast.info(`Error ${error.code}: ${error.message}`)
            }
        })
            ()
    }, [])

    // to fetch movies based on user input
    useEffect(() => {
        (async () => {
            try {
                setLoading(true)
                const response = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=9fd66d9e18c945f965d9d1a26f32c9a1&language=en-US&query=${searchParam}&page=1&include_adult=true`)
                const result = await response.json()

                if (result) {
                    setMovieList(result.results)
                    setLoading(false)
                }
            } catch (error) {
                toast.info(`Error ${error.code}: ${error.message}`)
            }
        })
            ()

    }, [searchParam])

    //to detect the screen width of user's browser for responsiveness
    useEffect(() => {
        window
            .matchMedia("(max-width: 780px)")
            .addEventListener('change', e => setMatches(e.matches));
    }, []);


    const contextValue = {
        searchParam,
        handleChange,
        setFilmType,
        setFeatured,
        setTopRated,
        setMovieList,
        setTrendingSeries,
        setUpcomingMovies,
        handleMenu,
        menu,
        featured,
        loading,
        movieList,
        topRated,
        trendingSeries,
        upComingMovies,
        filmType,
        matches,
    }
    return (
        <GlobalContext.Provider value={contextValue}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalState