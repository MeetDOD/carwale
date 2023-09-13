import React from 'react'
import ab from './about.png'
import { AiOutlineArrowRight } from 'react-icons/ai'

const Aboutus = () => {
    return (
        <div>
            <div class="text-center mt-5 pt-5">
                <h1 class="heading">About<span className='text-warning'>Us</span></h1>
            </div>
            <div class="container-xxl py-5">
                <div class="container">
                    <div class="row g-5">
                        <div class="col-lg-6">
                            <div class="position-relative h-100">
                                <img class="img-fluid position-absolute w-100 h-100" src={ab} style={{ borderRadius: '10px' }} />
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <h1 class="mb-4 text-warning">Welcome to Velocity Vehicals</h1>
                            <p class="mb-4"><span className='text-warning'>At Velocity Vehicals</span>, we are passionate about helping you find the perfect vehicle that suits your needs and budget. With years of experience in the automotive industry, our team is dedicated to providing you with a seamless and enjoyable car buying experience.</p>
                            <p class="mb-4">Our mission is to simplify the car buying process and empower you to make informed decisions. We understand that buying a car is a significant investment, and we are here to guide you every step of the way.</p>
                            <div class="row gy-2 gx-4 mb-4">
                                <div class="col-sm-6 text-warning">
                                    <p class="mb-0"><AiOutlineArrowRight size={20} /> Extensive Inventory</p>
                                </div>
                                <div class="col-sm-6 text-warning">
                                    <p class="mb-0"><AiOutlineArrowRight size={20} /> Trusted dealerships </p>
                                </div>
                                <div class="col-sm-6 text-warning">
                                    <p class="mb-0"><AiOutlineArrowRight size={20} /> Transparent Pricing</p>
                                </div>
                                <div class="col-sm-6 text-warning">
                                    <p class="mb-0"><AiOutlineArrowRight size={20} /> Financing Options</p>
                                </div>
                                <div class="col-sm-6 text-warning">
                                    <p class="mb-0"><AiOutlineArrowRight size={20} /> Exceptional Customer Service</p>
                                </div>
                                <div class="col-sm-6 text-warning">
                                    <p class="mb-0"><AiOutlineArrowRight size={20} />  Research tools</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Aboutus
