import React, { useEffect, useState } from 'react';
import AdminMenu from './AdminMenu';
import axios from 'axios';
import { Select, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import Loading from './Loading'
import toast from 'react-hot-toast';

const { Option } = Select;

const CreateCar = () => {
    const [brands, setBrands] = useState([]);
    const [brand, setBrand] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [shipping, setShipping] = useState('');
    const [productPictures, setProductPictures] = useState([]);
    const [price, setprice] = useState('');
    const [fuelType, setfuelType] = useState('');
    const [transmission, settransmission] = useState('');
    const [engineSize, setengineSize] = useState('');
    const [mileage, setmileage] = useState('');
    const [safetyrating, setsafetyrating] = useState('');
    const [warranty, setwarranty] = useState('');
    const [seater, setseater] = useState('');
    const [size, setsize] = useState('');
    const [fuelTank, setfuelTank] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const validateForm = () => {
        if (!brand.trim()) {
            toast.error('Car Brand is required');
            return false;
        }
        if (productPictures.length === 0) {
            toast.error('Please Provide atleast one Image');
            return false;
        }
        if (!name.trim()) {
            toast.error('Car name is required');
            return false;
        }
        if (!price.trim()) {
            toast.error('Price is required');
            return false;
        }
        if (!fuelType.trim()) {
            toast.error('FuelType is required');
            return false;
        }
        if (!transmission.trim()) {
            toast.error('Transmission is required');
            return false;
        }
        if (!engineSize.trim()) {
            toast.error('Engine Size is required');
            return false;
        }
        if (!mileage.trim()) {
            toast.error('Mileage is required');
            return false;
        }
        if (!safetyrating.trim()) {
            toast.error('Safetyrating is required');
            return false;
        }
        if (!warranty.trim()) {
            toast.error('Warranty is required');
            return false;
        }
        if (!seater.trim()) {
            toast.error('Seater is required');
            return false;
        }
        if (!size.trim()) {
            toast.error('Car Size is required');
            return false;
        }
        if (!fuelTank.trim()) {
            toast.error('FuelTank is required');
            return false;
        }
        if (!description.trim()) {
            toast.error('Description is required');
            return false;
        }
        if (!shipping.trim()) {
            toast.error('Shipping is required');
            return false;
        }
        return true;
    };

    const getAllCar = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/brand/getAll-brand`);
            if (data.success) {
                setBrands(data?.brands);
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
        if (!validateForm()) {
            return;
        }
        try {
            setLoading(true)
            const carData = new FormData();
            carData.append('name', name);
            carData.append('description', description);
            carData.append('shipping', shipping);
            carData.append('brand', brand);
            carData.append('price', price);
            carData.append('fuelType', fuelType);
            carData.append('transmission', transmission);
            carData.append('engineSize', engineSize);
            carData.append('mileage', mileage);
            carData.append('safetyrating', safetyrating);
            carData.append('warranty', warranty);
            carData.append('seater', seater);
            carData.append('size', size);
            carData.append('fuelTank', fuelTank);

            productPictures.forEach((image, index) => {
                carData.append(`productPictures`, image);
            });
            const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/api/car/create-car`, carData);

            if (data.success) {
                toast.success('Car Created Successfully');
                navigate('/dashboard/admin/cars');
            } else {
                toast.error('Error in Car creation');
            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        getAllCar();
        window.scrollTo(0, 0)
    }, []);

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
                                <h1 className='text-center'>Create Car</h1>
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
                                            required
                                        />
                                    </div>
                                    <div className='mb-3'>
                                        <input
                                            type='text'
                                            value={price}
                                            placeholder='write only car amount price not include Lakhs,Cr,Rupees etc...'
                                            className='form-control'
                                            onChange={(e) => setprice(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className='mb-3'>
                                        <input
                                            type='text'
                                            value={fuelType}
                                            placeholder='write a car fueltype'
                                            className='form-control'
                                            onChange={(e) => setfuelType(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className='mb-3'>
                                        <input
                                            type='text'
                                            value={transmission}
                                            placeholder='write a car transmission'
                                            className='form-control'
                                            onChange={(e) => settransmission(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className='mb-3'>
                                        <input
                                            type='text'
                                            value={engineSize}
                                            placeholder='write a car enginesize'
                                            className='form-control'
                                            onChange={(e) => setengineSize(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className='mb-3'>
                                        <input
                                            type='text'
                                            value={mileage}
                                            placeholder='write a car mileage'
                                            className='form-control'
                                            onChange={(e) => setmileage(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className='mb-3'>
                                        <input
                                            type='text'
                                            value={safetyrating}
                                            placeholder='write a car safetyrating'
                                            className='form-control'
                                            onChange={(e) => setsafetyrating(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className='mb-3'>
                                        <input
                                            type='text'
                                            value={warranty}
                                            placeholder='write a car warranty'
                                            className='form-control'
                                            onChange={(e) => setwarranty(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className='mb-3'>
                                        <input
                                            type='text'
                                            value={seater}
                                            placeholder='write a car seater'
                                            className='form-control'
                                            onChange={(e) => setseater(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className='mb-3'>
                                        <input
                                            type='text'
                                            value={size}
                                            placeholder='write a car height and width'
                                            className='form-control'
                                            onChange={(e) => setsize(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className='mb-3'>
                                        <input
                                            type='text'
                                            value={fuelTank}
                                            placeholder='write a car fueltank'
                                            className='form-control'
                                            onChange={(e) => setfuelTank(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className='mb-3'>
                                        <textarea
                                            rows={3}
                                            value={description}
                                            placeholder='write a car description'
                                            className='form-control'
                                            onChange={(e) => setDescription(e.target.value)}
                                            required
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
                            </form>
                        </div>
                    </div>
                </div>
            ) : <Loading />}
        </div>
    );
};

export default CreateCar;
