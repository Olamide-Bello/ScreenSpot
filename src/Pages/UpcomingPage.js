import React, { useContext } from 'react'
import { Stack } from 'react-bootstrap'
import SideBar from '../Components/SideBar'
import Upcoming from '../Components/Upcoming'
import { GlobalContext } from '../Components/GlobalContext'

const UpcomingPage = () => {
    const {menu, matches} = useContext(GlobalContext)
  return (
    <Stack direction='horizontal'>
        {menu && <SideBar/>}
        {!matches && <SideBar/>}
        <Upcoming/>
    </Stack>
  )
}

export default UpcomingPage