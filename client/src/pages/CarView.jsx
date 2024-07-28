import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ReactImageTurntable } from 'react-image-turntable';
import { Tb360View } from 'react-icons/tb'
import '../styles/carview.css'
import { BsFuelPumpFill } from 'react-icons/bs'
import { TbEngine, TbStars } from 'react-icons/tb'
import { AiOutlineNodeIndex, AiOutlineColumnWidth } from 'react-icons/ai'
import { MdCompareArrows, MdOutlinePropaneTank, MdAirlineSeatReclineExtra } from 'react-icons/md'
import { GiBackwardTime } from 'react-icons/gi'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { useCart } from '../context/cart';
import toast from 'react-hot-toast';
import { AiOutlineEye } from 'react-icons/ai'
import { PiCurrencyInrFill } from 'react-icons/pi'
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import { LuGalleryHorizontal } from 'react-icons/lu'
import { ColorRing } from 'react-loader-spinner'

const CarView = () => {
    const params = useParams();
    const [car, setCar] = useState({ name: '', description: '', productPictures: [], price: '', brand: '', fuelTank: '', fuelType: '', mileage: '', safetyrating: '', warranty: '', seater: '', size: '', });
    const [cart, setcart] = useCart()
    const [relatedCar, setRelatedCar] = useState([]);
    const [loading, setLoading] = useState(true);

    const getCar = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/car/getCarById-car/${params.slug}`);
            setCar(data.car);
            getRelatedCar(data?.car._id, data?.car.brand._id);
            setLoading(false);
        } catch (err) {
            console.log(err);
            setLoading(true);
        }
    };

    const getRelatedCar = async (cid, bid) => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/car/related-car/${cid}/${bid}`)
            setRelatedCar(data?.cars)
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        if (params?.slug) {
            getCar();
            getRelatedCar()
        } else {
            console.log('error')
        }
        window.scrollTo(0, 0)
    }, [params?.slug]);

    const notify = () => toast.success('Added To Cart Successfully');

    const updatedAt = new Date(car.updatedAt).toLocaleString();

    const galleryImages = car.productPictures.map(picture => ({
        original: picture,
        thumbnail: picture
    }));

    return (
        <div className='container marginStyle'>
            {loading ?
                <div className="h-100 d-flex align-items-center justify-content-center">
                    <ColorRing
                        visible={true}
                        colors={['#000435', 'rgb(14 165 233)', 'rgb(243 244 246)', '#000435', 'rgb(14 165 233)']}
                    />
                </div>
                :
                <div className="row">
                    <div className="col-md-6 text-center">
                        <ReactImageTurntable
                            images={car.productPictures}
                            className='border border-4 rounded'
                            style={{ cursor: '-webkit-grab' }}
                        />
                        <Tb360View size={50} className='' /><br />
                        <div>
                            <ImageGallery
                                items={galleryImages}
                                originalHeight={10}
                                lazyLoad={true}
                                showNav={false}
                                showFullscreenButton={false}
                            />
                        </div>
                        <LuGalleryHorizontal size={40} className='my-3' /><br />
                    </div>
                    <div className="col-md-6">
                        <div className='centerMob'>
                            <Link to={`/brand/${car.brand.name}`}>
                                <img
                                    decoding="async"
                                    src={car.brand.brandPictures}
                                    className="img-fluid"
                                    style={{ maxWidth: '100%', maxHeight: '40px', objectFit: 'contain' }}
                                />
                                <span className='badge mb-3 m-2' style={{ backgroundColor: 'blueviolet' }}>{car.brand.name}</span>
                            </Link>
                            <h3 className="mb-3 mt-2">{car.name}</h3>
                        </div>
                        <h4>{car.name} Description : </h4><h6 className='lh-base ' style={{ textAlign: 'justify' }}>{car.description}</h6>
                        <h4>Rs. {car.price} Lakhs</h4>
                        <h4>Released At : {updatedAt}</h4>
                        <button style={{ backgroundColor: 'blueviolet' }} className='btn text-white my-1' onClick={() => { setcart([...cart, car]); localStorage.setItem('cart', JSON.stringify([...cart, car])); notify() }} ><AiOutlineShoppingCart size={20} className='pb-1' /> Add To Cart</button>
                        <Link className='btn btn-outline-primary mx-2' to='/cart'><AiOutlineEye size={20} className='pb-1' /> View Cart</Link>
                        <table className="table table-bordered my-4">
                            <thead>
                                <tr>
                                    <td scope="row" className='p-3'>
                                        <p className='text-secondary '><BsFuelPumpFill size={25} /> FuelType</p>
                                        <h5>{car.fuelType}</h5>
                                    </td>
                                    <td scope="row" className='p-3'>
                                        <p className='text-secondary '><TbEngine size={25} /> Mileage</p>
                                        <h5>{car.mileage}</h5>
                                    </td><td scope="row" className='p-3'>
                                        <p className='text-secondary '><TbStars size={25} /> Safety Rating</p>
                                        <h5>{car.safetyrating}</h5>
                                    </td>
                                </tr>

                                <tr>
                                    <td scope="row" className='p-3'>
                                        <p className='text-secondary '><GiBackwardTime size={25} /> Warranty</p>
                                        <h5>{car.warranty}</h5>
                                    </td>
                                    <td scope="row" className='p-3'>
                                        <p className='text-secondary '><MdAirlineSeatReclineExtra size={25} /> Seater</p>
                                        <h5>{car.seater}</h5>
                                    </td><td scope="row" className='p-3'>
                                        <p className='text-secondary '><MdCompareArrows size={25} /> Size</p>
                                        <h5>{car.size}</h5>
                                    </td>
                                </tr>

                                <tr>
                                    <td scope="row" className='p-3'>
                                        <p className='text-secondary '><MdOutlinePropaneTank size={25} /> Fuel Tank</p>
                                        <h5>{car.fuelTank}</h5>
                                    </td>
                                    <td scope="row" className='p-3'>
                                        <p className='text-secondary '><AiOutlineColumnWidth size={25} /> Engine Size</p>
                                        <h5>{car.engineSize}</h5>
                                    </td>
                                    <td scope="row" className='p-3'>
                                        <p className='text-secondary '><AiOutlineNodeIndex size={25} /> Transmission</p>
                                        <h5>{car.transmission}</h5>
                                    </td>
                                </tr>
                            </thead>
                        </table>
                    </div>
                    <div className="container mt-5">
                        <div className="row">
                            <div className="col-12 text-center mb-5">
                                <h2 className="brand_title">Related <span style={{ color: 'blueviolet' }}>{car.brand.name}</span> Cars in Stock</h2>
                            </div>
                            {relatedCar.length > 0 ? (
                                relatedCar.map((p) => (
                                    <div className="col-md-12 col-lg-3 mb-3 mb-lg-0 my-3">
                                        <div className="card">
                                            <div className="d-flex justify-content-between p-3">
                                                <p className="lead mb-0">{p.brand.name}</p>
                                                <Link to={`/brand/${p.brand.slug}`}
                                                    className=" rounded-circle d-flex align-items-center justify-content-center shadow-1-strong"
                                                    style={{ width: '35px', height: '35px' }}>
                                                    <p className="text-white mb-0 small">
                                                        <img src={p.brand.brandPictures} alt={p.brand.name} style={{ maxWidth: '100%', maxHeight: '150px', objectFit: 'contain' }} />
                                                    </p>
                                                </Link>
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
                                <div className="col-md-12 text-center">
                                    <h4>Currently No Related {car.brand.name} is available.</h4>
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default CarView;
