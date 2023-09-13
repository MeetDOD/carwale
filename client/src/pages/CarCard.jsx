import React, { useEffect, useState } from 'react'
import "./carcard.css";
import { Link } from 'react-router-dom';
import { AiFillCar } from 'react-icons/ai'
import { useCart } from '../context/cart'

const CarCard = () => {
    const [cars, setcars] = useState([]);
    const [cart, setcart] = useCart()
    const getAllcars = async () => {
        try {
            const data = await fetch("http://localhost:5000/api/car/getAll-car", {
                method: "GET",
                headers: { "Content-type": "application/json" }
            })
            const data_ = await data.json()
            setcars(data_.car)
            console.log(data_.car)

        } catch (error) {
            console.log(error);
        } finally {

        }
    };

    useEffect(() => {
        getAllcars();
    }, []);
    return (
        <><div class="text-center mt-5 mb-2">
            <h1 class="heading">Latest <span className='text-warning'>Arrivals</span></h1>
        </div>
            <div class="container py-5">
                <div class="row">
                    {cars.map((p) => (
                        <div class="col-md-12 col-lg-3 mb-4 mb-lg-0 my-4">
                            <div class="card">
                                <div class="d-flex justify-content-between p-3">
                                    <p class="lead mb-0">Latest Arrival !</p>
                                    <div
                                        class="bg-warning rounded-circle d-flex align-items-center justify-content-center shadow-1-strong"
                                        style={{ width: '35px', height: '35px' }}>
                                        <p class="text-white mb-0 small"><AiFillCar size={20} /></p>
                                    </div>
                                </div>
                                <img src={`http://localhost:5000/${p.productPictures[0]}`} alt={p.name} height={'200px'} class="card-img-top" />
                                <div class="card-body">
                                    <div class="d-flex justify-content-between mb-3">
                                        <h5 class="mb-0">{p.name}</h5>
                                        <hr />
                                        <br />
                                        <h6 class="text-dark mb-0">$999</h6>
                                    </div>
                                    <div className='text-center d-flex'>
                                        <Link className='btn btn-outline-warning my-2' to={`/car/${p.slug}`}>View</Link>
                                        <button className='btn btn-outline-primary my-2 mx-3' onClick={() => { setcart([...cart, p]); localStorage.setItem('cart', JSON.stringify([...cart, p])) }}>Add To Cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div >
        </>
    )
}

export default CarCard
