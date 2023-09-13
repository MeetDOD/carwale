import React from 'react'
import './features.css'

const Features = () => {
    return (
        <div>
            <div class="container-fluid mb-5">
                <div class="text-center mt-5 mb-3">
                    <h1 class="heading">Our<span className='text-warning'>Services</span></h1>
                </div>
                <div class="row">
                    <div class="col-md-4">
                        <div class="box">
                            <div class="our-services backups">
                                <div class="icon"> <img src="https://i.imgur.com/vdH9LKi.png" /> </div>
                                <h4>360 visualization</h4>
                                <p>Comprehensive view from all angles, Enhanced panoramic view </p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="box">
                            <div class="our-services speedup">
                                <div class="icon"> <img src="https://i.imgur.com/KMbnpFF.png" /> </div>
                                <h4>Speedup</h4>
                                <p>Powerful engine for exhilarating speed and acceleration capability</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="box">
                            <div class="our-services privacy">
                                <div class="icon"> <img src="https://i.imgur.com/AgyneKA.png" /> </div>
                                <h4>Privacy</h4>
                                <p>Encryption ensures safe and confidential online payment transactions</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Features
