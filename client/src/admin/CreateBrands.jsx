import React, { useEffect, useState } from 'react';
import AdminMenu from './AdminMenu';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loading from './Loading'
import toast from 'react-hot-toast';

const CreateBrands = () => {
    const [name, setName] = useState('');
    const [brandPictures, setbrandPictures] = useState([]);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setbrandPictures(files);
    };

    const validateForm = () => {
        if (!name.trim()) {
            toast.error('Brand name is required');
            return false;
        }
        if (brandPictures.length === 0) {
            toast.error('Please upload Brand Image');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }
        try {
            setLoading(true)
            const carData = new FormData();
            carData.append('name', name);

            brandPictures.forEach((image, index) => {
                carData.append(`brandPictures`, image);
            });
            const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/api/brand/create-brand`, carData);

            if (data.success) {
                toast.success('Brand Created Successfully');
                navigate('/dashboard/admin/allbrands');
            }
            else {
                toast.error(data.message);
            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className='container marginStyle'>
            {!loading ? (
                <div className='container-fluid'>
                    <div className='row'>
                        <div className='col-md-3'>
                            <AdminMenu />
                        </div>
                        <div className='col-md-9 my-3'>
                            <form method='post' enctype="multipart/form-data">
                                <h1 className='text-center'>Create Brand</h1>
                                <div className='m-1'>
                                    <div className='mb-3'>
                                        <input
                                            type='text'
                                            value={name}
                                            placeholder='write the brand name'
                                            className='form-control'
                                            onChange={(e) => setName(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className='mb-3'>
                                        {brandPictures.map((image, index) => (
                                            <div key={index} className='text-center'>
                                                <img
                                                    src={URL.createObjectURL(image)}
                                                    alt={`car_image_${index}`}
                                                    className='img img-fluid'
                                                />
                                            </div>
                                        ))}
                                    </div>
                                    <div className='mb-3'>
                                        <label className='btn btn-outline-primary col-md-12'>
                                            Upload Images
                                            <input
                                                type='file'
                                                name='productPictures'
                                                accept='image/*'
                                                multiple
                                                onChange={handleImageChange}
                                                hidden
                                            />
                                        </label>
                                    </div>
                                    <div className='mb-3'>
                                        <button className='btn btn-success' onClick={handleSubmit}>
                                            Create Brand
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            ) : <Loading />}
        </div>
    );
};

export default CreateBrands;
