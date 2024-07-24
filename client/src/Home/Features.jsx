import React from 'react'
import '../styles/features.css'
import secure from '../images/secure.gif'
import rotate from '../images/views.gif'
import fast from '../images/money.gif'

const Features = () => {
    return (
        <div>
            <section id="features" className="features_wrapper">
                <div className="container">
                    <div className="row">
                        <div className="col-12 text-center mb-5">
                            <p className="features_subtitle">Feature-Packed Driving</p>
                            <h2 className="features_title">Our automated features</h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-4 col-sm-6 mb-5">
                            <div className="ft-1 text-center header-img-section">
                                <img src={secure} width={195} />
                                <h3 className='mt-2' style={{ color: 'white' }}>Secure Payment</h3>
                                <p className="features_text" style={{ color: 'white' }}>We take your security seriously, and that's why we've implemented state-of-the-art secure payment systems. Your financial information is safeguarded with the latest encryption technology, ensuring your transactions are always safe and secure.</p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-6 mb-5">
                            <div className="ft-2 text-center header-img-section">
                                <img src={rotate} width={195} />
                                <h3 className='mt-2' style={{ color: 'white' }}>360 Visualization</h3>
                                <p className="features_text" style={{ color: 'white' }}>Get ready to explore every angle, every detail, and every curve of your dream car from the comfort of your screen. Our cutting-edge technology brings the showroom to you, allowing you to virtually step inside the driver's seat and truly immerse yourself.</p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-6 mb-5">
                            <div className="ft-3 text-center header-img-section">
                                <img src={fast} width={195} />
                                <h3 className='mt-2' style={{ color: 'white' }}>Fast and Secure</h3>
                                <p className="features_text" style={{ color: 'white' }}>Our platform offers a seamless, lightning-fast, and secure interaction that redefines the car buying experience. With our cutting-edge technology, you can effortlessly browse, compare, and connect with sellers or dealers, all in real-time.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Features
