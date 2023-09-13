import React from 'react'
import './hero.css'
import bugati from './bugati.mp4'

const Hero = () => {
    return (
        <div className='main'>
            <div className="overlay"></div>
            <video src={bugati} autoPlay loop muted />
            <div className="content">
                <h1 class="text-warning text-center" style={{ fontWeight: 'bold', fontSize: '3rem' }}>
                    Where Car Dreams Become Reality
                </h1>
                <h2 class="text-center" style={{ fontWeight: 'bold' }}>
                    Endless <span className='text-warning'>Possibilities</span>, Limitless <span className='text-warning'>Satisfaction</span>
                </h2>
            </div>
        </div >
    )
}

export default Hero
