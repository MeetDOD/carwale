import React, { useEffect, useState } from 'react'
import { useCart } from '../context/cart';
import { Link } from 'react-router-dom';
import '../styles/brands.css'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { AiOutlineEye } from 'react-icons/ai'
import { MdAirlineSeatReclineExtra } from 'react-icons/md'
import { BsFuelPumpFill } from 'react-icons/bs'
import { TbStars } from 'react-icons/tb'
import { PiCurrencyInrFill } from 'react-icons/pi'
import toast from 'react-hot-toast';
import { AiFillCar } from 'react-icons/ai'
import { ColorRing } from 'react-loader-spinner'

const CarsHome = () => {
    const [cars, setcars] = useState([]);
    const [cart, setcart] = useCart()
    const [loading, setLoading] = useState(true);

    const getAllcars = async () => {
        try {
            const data = await fetch(`${process.env.REACT_APP_API_URL}/api/car/getAll-car`, {
                method: "GET",
                headers: { "Content-type": "application/json" }
            })
            const data_ = await data.json()
            setcars(data_.cars.reverse())
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(true);
        }
    };

    const notify = () => toast.success('Added to Cart Successfully')

    useEffect(() => {
        getAllcars();
    }, []);

    return (
        <>
            <div className="brand_wrapper" id='cars'>
                <div className="col-12 text-center">
                    <p className="brand_subtitle">Explore an array of exciting new Cars !</p>
                    <h2 className="brand_title">Latest Cars showcase</h2>
                </div>
            </div>
            {loading ?
                <div className="h-100 d-flex align-items-center justify-content-center">
                    <ColorRing
                        visible={true}
                        colors={['#000435', 'rgb(14 165 233)', 'rgb(243 244 246)', '#000435', 'rgb(14 165 233)']}
                    />
                </div>
                :
                <div className="container">
                    <div className="row" style={{ marginTop: '-40px' }}>
                        {cars.slice(0, 8).map((p) => (
                            <div className="col-md-12 col-lg-3 mb-3 mb-lg-0 my-3">
                                <div className="card">
                                    <div className="d-flex justify-content-between p-3">
                                        <p className="lead mb-0 respBrand">{p.brand.name}</p>
                                        <div
                                            className=" rounded-circle d-flex align-items-center justify-content-center shadow-1-strong"
                                            style={{ width: '35px', height: '35px' }}>
                                            <Link to={`/brand/${p.brand.slug}`} className="text-white mb-0 small">
                                                <img src={p.brand.brandPictures} alt={p.brand.name} style={{ maxWidth: '100%', maxHeight: '150px', objectFit: 'contain' }} />
                                            </Link>
                                        </div>
                                    </div>
                                    <Link to={`/car/${p.slug}`} className='text-center'>
                                        <img src={p.productPictures} alt={p.name} style={{ maxWidth: '100%', maxHeight: '130px', objectFit: 'contain' }} className='border rounded' />
                                    </Link>
                                    <div className="card-body ">
                                        <h4 className="text-center mb-4 respName">{p.name}</h4>
                                        <div className="d-flex justify-content-between">
                                            <h6 className='respBrand'><PiCurrencyInrFill /> : {p.price} Lakhs</h6>
                                            <h6 className='respBrand'><BsFuelPumpFill /> : {p.fuelType}</h6>
                                        </div>
                                        <div className="d-flex justify-content-between my-2">
                                            <h6 className='respBrand'><TbStars /> : {p.safetyrating}</h6>
                                            <h6 className='respBrand'><MdAirlineSeatReclineExtra /> : {p.seater} Seater</h6>
                                        </div>
                                        <div className='text-center'>
                                            <Link className='btn my-2  ' style={{ backgroundColor: 'blueviolet', color: 'white' }} to={`/car/${p.slug}`}><AiOutlineEye size={20} className='pb-1' /> View</Link>
                                            <button className='btn btn-outline-primary my-2 mx-3 ' onClick={() => { setcart([...cart, p]); localStorage.setItem('cart', JSON.stringify([...cart, p])); notify() }} ><AiOutlineShoppingCart size={20} className='pb-1' /> Add To Cart</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="col-12 text-center my-5">
                        <Link to='/cars' className='btn btn-lg text-white' style={{ backgroundColor: 'blueviolet' }}>
                            View More <AiFillCar size={25} />
                        </Link>
                    </div>
                </div>
            }
        </>
    )
}

export default CarsHome