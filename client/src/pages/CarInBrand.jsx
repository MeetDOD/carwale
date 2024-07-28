import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import '../styles/brands.css'
import { useCart } from '../context/cart';
import { Link } from 'react-router-dom';
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { AiOutlineEye } from 'react-icons/ai'
import { MdAirlineSeatReclineExtra } from 'react-icons/md'
import { BsFuelPumpFill } from 'react-icons/bs'
import { TbStars } from 'react-icons/tb'
import { PiCurrencyInrFill } from 'react-icons/pi'
import toast from 'react-hot-toast';
import { ColorRing } from 'react-loader-spinner';

const CarInBrand = () => {

    const params = useParams();
    const [brand, setBrand] = useState({ name: '', brandPictures: '' })
    const [cart, setcart] = useCart()
    const [loading, setLoading] = useState(true);

    const getCar = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/brand/getBrandBtId-brand/${params.slug}`);
            setBrand(data.brand);
            setLoading(false);
        } catch (err) {
            console.log(err);
            setLoading(true);
        }
    };

    const notify = () => toast.success('Added to Cart Successfully')

    useEffect(() => {
        getCar()
        window.scrollTo(0, 0)
    }, [])
    return (
        <div >
            <section id="brands" className="brand_wrapper">
                <div className="container">
                    <div className="row">
                        <div className="col-12 text-center mb-2">
                            <p className="brand_subtitle">Brand Collection !</p>
                            <h2 className="brand_title">{brand.name} Car showcase</h2>
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
                        <div className="row justify-content-center">
                            <div className="col-lg-3 col-md-4 col-sm-6 showcase_card">
                                <img
                                    decoding="async"
                                    src={brand.brandPictures}
                                    className="mb-4 img-fluid"
                                    style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'contain' }}
                                />
                            </div>
                        </div>
                    }
                </div>
            </section>
            {/* Cars in this Brand Start */}
            <div className="container">
                <div className="row" style={{ marginBottom: '100px', marginTop: '-40px' }}>
                    <div className="col-12 text-center mb-5">
                        <h2 className="brand_title">Available {brand.name} Cars in Stock</h2>
                    </div>
                    {Array.isArray(brand.carInvoleInThisBrand) ? (
                        brand.carInvoleInThisBrand.map((p) => (
                            <div className="col-md-12 col-lg-3 mb-3 mb-lg-0 my-3">
                                <div className="card">
                                    <div className="d-flex justify-content-between p-3">
                                        <p className="lead mb-0">{brand.name}</p>
                                        <div
                                            className=" rounded-circle d-flex align-items-center justify-content-center shadow-1-strong"
                                            style={{ width: '35px', height: '35px' }}>
                                            <p className="text-white mb-0 small">
                                                <img src={brand.brandPictures} alt={brand.name} style={{ maxWidth: '100%', maxHeight: '150px', objectFit: 'contain' }} />
                                            </p>
                                        </div>
                                    </div>
                                    <Link to={`/car/${p.slug}`} className='text-center'>
                                        <img src={p.productPictures[4]} alt={p.name} style={{ maxWidth: '100%', maxHeight: '120px', objectFit: 'contain' }} className='border rounded' />
                                    </Link>
                                    <div className="card-body">
                                        <h4 className="text-center mb-4">{p.name}</h4>
                                        <div className="d-flex justify-content-between">
                                            <h6><PiCurrencyInrFill /> : {p.price}</h6>
                                            <h6 ><BsFuelPumpFill /> : {p.fuelType}</h6>
                                        </div>
                                        <div className="d-flex justify-content-between my-2">
                                            <h6 ><TbStars /> : {p.safetyrating}</h6>
                                            <h6 ><MdAirlineSeatReclineExtra /> : {p.seater} Seater</h6>
                                        </div>
                                        <div className='text-center'>
                                            <Link className='btn my-2  ' style={{ backgroundColor: 'blueviolet', color: 'white' }} to={`/car/${p.slug}`}><AiOutlineEye size={20} className='pb-1' /> View</Link>
                                            <button className='btn btn-outline-primary my-2 mx-3 ' onClick={() => { setcart([...cart, p]); localStorage.setItem('cart', JSON.stringify([...cart, p])); notify() }} ><AiOutlineShoppingCart size={20} className='pb-1' /> Add To Cart</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="h-100 d-flex align-items-center justify-content-center">
                            <ColorRing
                                visible={true}
                                colors={['#000435', 'rgb(14 165 233)', 'rgb(243 244 246)', '#000435', 'rgb(14 165 233)']}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default CarInBrand
