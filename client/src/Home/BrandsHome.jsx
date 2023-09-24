import React, { useEffect, useState } from 'react'
import '../styles/brands.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { FaCarSide } from 'react-icons/fa'

const Brandshome = () => {
    const [brand, setBrand] = useState([])

    const getAllBrand = async () => {
        try {
            const { data } = await axios.get('https://velocity-vehicles-backend-production.up.railway.app/api/brand/getAll-brand')
            if (data.success) {
                setBrand(data.brand.reverse())
            }
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getAllBrand();
    })
    return (
        <div>
            <section id="brands" className="brand_wrapper">
                <div className="container">
                    <div className="row">
                        <div className="col-12 text-center mb-5">
                            <p className="brand_subtitle">Explore an array of exciting new Brands !</p>
                            <h2 className="brand_title">Latest Brands showcase</h2>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        {brand?.slice(0, 8).map(c => (
                            <div className="col-lg-3 col-md-4 col-sm-6 mb-4 showcase_card">
                                <Link to={`/brand/${c.slug}`}>
                                    <img
                                        decoding="async"
                                        src={`https://velocity-vehicles-backend-production.up.railway.app/${c.brandPictures}`}
                                        className="mb-4 img-fluid"
                                        style={{ maxWidth: '100%', maxHeight: '190px', objectFit: 'contain' }}
                                    />
                                </Link>
                            </div>
                        ))}
                    </div>
                    <div className="col-12 text-center">
                        <Link to='/brands' className='btn btn-lg text-white' style={{ backgroundColor: 'blueviolet' }}>
                            View More <FaCarSide size={25} />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Brandshome
