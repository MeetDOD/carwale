import React from 'react'
import './hero.css'
import bugati from './bugati.mp4'

const Hero = () => {
    return (
        <div className='main'>
            <div className="overlay"></div>
            <video src={bugati} autoPlay loop muted />
            <div className="content">
                <div class="text-center my-5">
                    <div class="text-animation">
                        <div class="text-wrapper">
                            <h5>Velocity Vehicals</h5>
                            <h5>Velocity Vehicals</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero
