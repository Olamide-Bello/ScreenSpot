import React, { useContext, useState } from 'react'
import logo from '../Assets/tv.png'
import Home from '../Assets/Home.png'
import Projector from '../Assets/Movie Projector.png'
import Series from '../Assets/TV Show.png'
import Calender from '../Assets/Calendar.png'
import LogoutIcon from '../Assets/Logout.png'
import { NavLink, useParams } from 'react-router-dom'
import { GlobalContext } from './GlobalContext'
import Exit from '../Assets/Exit.png'

const SideBar = () => {
    const {id} = useParams()
    const {filmType, handleMenu, matches} = useContext(GlobalContext)
    const [logged, setLogged] = useState(true)

    //to handle a user logged state
    const handleLogout= () => {
        setLogged(!logged)
    }

    return (
        <div className='sidebar'>
            {matches && <div className='exit'><img onClick={handleMenu} src={Exit} alt='exit icon'/></div>}
            <div className='logo-hd'>
                <img src={logo} alt='logo' />
                <p>ScreenSpot</p>
            </div>
            <ul>
                <li onClick={handleMenu}><NavLink to='/home'><img src={Home} alt='home' /><span>Home</span></NavLink></li>
                <li onClick={handleMenu}><NavLink to={id?`/movies/${id}`: '/movies'}><img src={Projector} alt='movie projector' /><span>Movies</span></NavLink></li>
                <li onClick={handleMenu}><NavLink to={id && filmType=== 'Tv' ?`/tv/${id}`: '/tv'}><img src={Series} alt='tv' /><span>TV Series</span></NavLink></li>
                <li onClick={handleMenu}><NavLink to="/upcoming"><img src={Calender} alt='calender' /><span>Upcoming</span></NavLink></li>
            </ul>
            <div className='logout'>
                <img onClick={handleLogout} src={LogoutIcon} alt='logout icon' />
                {logged?<span onClick={handleLogout}>Log out</span>:<span onClick={handleLogout}>Sign In</span>}
            </div>

        </div>
    )
}

export default SideBar