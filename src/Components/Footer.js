import React from 'react'
import facebook from '../Assets/facebook.png'
import insta from '../Assets/instagram.png'
import twitter from '../Assets/twitter.png'
import youtube from '../Assets/youtube.png'

const Footer = () => {
    return (
        <div className='footer'>
            <div className='socials'>
                <img src={facebook} alt='facebook logo' />
                <img src={insta} alt='instagram logo' />
                <img src={twitter} alt='twitter logo' />
                <img src={youtube} alt='youtube logo' />
            </div>
            <div className='policy'>
                <span>Conditions of Use</span>
                <span>Privacy and Policy</span>
                <span>Press Room</span>
            </div>
            <p>&copy;2023 ScreenSpot by Olamide Bello</p>
        </div>
    )
}

export default Footer