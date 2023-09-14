import React, { useContext } from 'react'
import Hero from '../Components/Hero'
import Featured from '../Components/Featured'
import { GlobalContext } from '../Components/GlobalContext'
import SearchResult from '../Components/SearchResult'
import Footer from '../Components/Footer'

const Homepage = () => {
  const { searchParam } = useContext(GlobalContext)
  
  return (
    <>
      <Hero />
      { searchParam.trim().length === 0 ?
        <Featured /> :
        <SearchResult />
      }
      <Footer/>
    </>
  )
}

export default Homepage