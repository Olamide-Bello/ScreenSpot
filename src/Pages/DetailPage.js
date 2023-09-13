import React, { useContext } from 'react'
import { Stack } from 'react-bootstrap'
import SideBar from '../Components/SideBar'
import MovieDetails from '../Components/MovieDetails'
import { GlobalContext } from '../Components/GlobalContext'

const DetailPage = () => {
    const {menu, matches} = useContext(GlobalContext)
  return (
    <Stack direction='horizontal'>
        {menu && <SideBar/>}
        {!matches && <SideBar/>}
        <MovieDetails/>
    </Stack>
  )
}

export default DetailPage