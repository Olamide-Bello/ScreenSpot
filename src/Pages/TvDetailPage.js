import React, { useContext } from 'react'
import { Stack } from 'react-bootstrap'
import SideBar from '../Components/SideBar'
import TvDetails from '../Components/TvDetails'
import { GlobalContext } from '../Components/GlobalContext'

const TvDetailPage = () => {
    const {menu, matches} = useContext(GlobalContext)
  return (
    <Stack direction='horizontal'>
        {menu && <SideBar/>}
        {!matches && <SideBar/>}
        <TvDetails/>
    </Stack>
  )
}

export default TvDetailPage