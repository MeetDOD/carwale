import React, { useEffect, useState } from 'react';
import AdminMenu from './AdminMenu';
import axios from 'axios';
import { Select, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

const CreateCar = () => {
    const [brands, setBrands] = useState([]);
    const [brand, setBrand] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [shipping, setShipping] = useState('');
    const [productPictures, setProductPictures] = useState([]);
    const navigate = useNavigate();

    const getAllCar = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/api/brand/getAll-brand');
            if (data.success) {
                setBrands(data?.brand);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setProductPictures(files);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const carData = new FormData();
            carData.append('name', name);
            carData.append('description', description);
            carData.append('shipping', shipping);
            carData.append('brand', brand);

            // Append each selected image to the FormData
            productPictures.forEach((image, index) => {
                carData.append(`productPictures[${index}]`, image);
            });

            const { data } = await axios.post('http://localhost:5000/api/car/create-car', carData);

            if (data.success) {
                alert('Car Created Successfully');
                navigate('/dashboard/admin/cars');
            } else {
                alert('Error in Car creation');
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getAllCar();
    }, []);

    return (
        <div className='container m-5 p-5'>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-md-3'>
                        <AdminMenu />
                    </div>
                    <div className='col-md-9 mt-2'>
                        <h1>Create Car</h1>
                        <div className='m-1'>
                            <Select
                                bordered={false}
                                placeholder='Select A Brand'
                                size='large'
                                showSearch
                                className='form-select mb-3'
                                onChange={(value) => {
                                    setBrand(value);
                                }}
                            >
                                {brands?.map((c) => (
                                    <Option key={c._id} value={c._id}>
                                        {c.name}
                                    </Option>
                                ))}
                            </Select>
                            <div className='mb-3'>
                                {productPictures.map((image, index) => (
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
                                <input
                                    type='text'
                                    value={name}
                                    placeholder='write a car name'
                                    className='form-control'
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className='mb-3'>
                                <textarea
                                    rows={3}
                                    value={description}
                                    placeholder='write a car description'
                                    className='form-control'
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                            <div className='mb-3'>
                                <Select
                                    bordered={false}
                                    placeholder='Select Shipping'
                                    size='large'
                                    showSearch
                                    className='form-select mb-3'
                                    onChange={(value) => {
                                        setShipping(value);
                                    }}
                                >
                                    <Option value='0'>No</Option>
                                    <Option value='1'>Yes</Option>
                                </Select>
                            </div>
                            <div className='mb-3'>
                                <button className='btn btn-success' onClick={handleSubmit}>
                                    Create Car
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateCar;
