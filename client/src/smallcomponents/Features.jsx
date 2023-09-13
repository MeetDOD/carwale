import React from 'react'
import './features.css'

const Features = () => {
    return (
        <div>
            <div class="container-fluid mb-5">
                <div class="text-center my-5">
                    <h1 class="heading">Our Services</h1>
                </div>
                <div class="row">
                    <div class="col-md-4">
                        <div class="box">
                            <div class="our-services settings">
                                <div class="icon"> <img src="https://i.imgur.com/6NKPrhO.png" /> </div>
                                <h4>Settings</h4>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="box">
                            <div class="our-services speedup">
                                <div class="icon"> <img src="https://i.imgur.com/KMbnpFF.png" /> </div>
                                <h4>Speedup</h4>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="box">
                            <div class="our-services privacy">
                                <div class="icon"> <img src="https://i.imgur.com/AgyneKA.png" /> </div>
                                <h4>Privacy</h4>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Features
