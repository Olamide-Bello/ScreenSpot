import React, { useContext } from 'react'
import { Stack } from 'react-bootstrap'
import SideBar from '../Components/SideBar'
import Movies from '../Components/Movies'
import { GlobalContext } from '../Components/GlobalContext'

const More = () => {
    const {menu, matches} = useContext(GlobalContext)
  return (
    <Stack direction='horizontal'>
        {menu && <SideBar/>}
        {!matches && <SideBar/>}
        <Movies/>
    </Stack>
  )
}

export default More