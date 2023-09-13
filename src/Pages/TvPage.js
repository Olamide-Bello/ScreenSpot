import React, { useContext } from 'react'
import { Stack } from 'react-bootstrap'
import SideBar from '../Components/SideBar'
import Tv from '../Components/Tv'
import { GlobalContext } from '../Components/GlobalContext'

const TvPage = () => {
    const {menu, matches} = useContext(GlobalContext)
  return (
    <Stack direction='horizontal'>
        {menu && <SideBar/>}
        {!matches && <SideBar/>}
        <Tv/>
    </Stack>
  )
}

export default TvPage