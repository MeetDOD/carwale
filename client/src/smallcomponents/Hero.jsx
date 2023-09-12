import React from 'react'
import './hero.css'
import bugati from './bugati.mp4'

const Hero = () => {
    return (
        <div className='main'>
            <div className="overlay"></div>
            <video src={bugati} autoPlay loop muted />
            <div className="content">
                <h1>Welcome</h1>
                <p>To my site.</p>
            </div>
        </div>
    )
}

export default Hero
