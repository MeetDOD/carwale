import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './carview.css';
import { ReactImageTurntable } from 'react-image-turntable';
import { Tb360View } from 'react-icons/tb'
const CarView = () => {
    const params = useParams();
    const [car, setCar] = useState({ name: '', description: '', productPictures: [] });

    const getCar = async () => {
        try {
            const { data } = await axios.get(`http://localhost:5000/api/car/getCarById-car/${params.slug}`);
            setCar(data?.car);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (params?.slug) {
            getCar();
        } else {
            console.log('error')
        }
    }, [params?.slug]);

    const imageUrls = car.productPictures.map(picture => `http://localhost:5000/${picture}`);

    return (
        <div className='container'>
            <br />
            <br />
            <br />
            <br />
            <br />
            <div className="row">
                <div className="col-md-7 text-center">
                    <ReactImageTurntable images={imageUrls} />
                    {/* <img
                        src={`http://localhost:5000/${car.productPictures}`}
                        height='180px' width='255px' alt={car.name}
                    /> */}
                    <Tb360View size={50} />
                </div>

                <div className="col-md-5">
                    <h3 className="my-3">{car.name}</h3>
                    <h4>Description : </h4><span>{car.description}</span>
                </div>
            </div>
        </div>
    );
};

export default CarView;
