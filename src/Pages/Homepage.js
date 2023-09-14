import React, { useContext } from 'react'
import Hero from '../Components/Hero'
import Featured from '../Components/Featured'
import { GlobalContext } from '../Components/GlobalContext'
import SearchResult from '../Components/SearchResult'
import Footer from '../Components/Footer'

const Homepage = () => {
  const { movieList } = useContext(GlobalContext)
  return (
    <>
      <Hero />
      {movieList && movieList.length > 0 ?
        <SearchResult /> :
        <Featured />
      }
      <Footer/>
    </>
  )
}

export default Homepage