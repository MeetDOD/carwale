import React, { useEffect, useState } from 'react'
import AdminMenu from './AdminMenu'
import axios from 'axios'
// import { Select, Modal } from 'antd'
import { Link, useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'

// const { Option } = Select

const UpdateCar = () => {

    const params = useParams()

    // const [brands, setBrands] = useState([])
    // const [brand, setBrand] = useState('')
    const [name, setname] = useState('')
    const [description, setdescription] = useState('')
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
    const [id, setId] = useState('')

    const navigate = useNavigate();

    const getSingleProduct = async () => {
        try {
            const { data } = await axios.get(`https://velocity-vehicles-backend-production.up.railway.app/api/car/getCarById-car/${params.slug}`)
            setname(data.car.name)
            // setBrand(data.car.brand)
            setdescription(data.car.description)
            setprice(data.car.price)
            setfuelType(data.car.fuelType)
            settransmission(data.car.transmission)
            setengineSize(data.car.engineSize)
            setmileage(data.car.mileage)
            setsafetyrating(data.car.safetyrating)
            setwarranty(data.car.warranty)
            setseater(data.car.seater)
            setsize(data.car.size)
            setfuelTank(data.car.fuelTank)
            setId(data.car._id)
        } catch (err) {
            console.log(err)
        }
    }

    // const getAllCarBrand = async () => {
    //     try {
    //         const data = await fetch("https://velocity-vehicles-backend-production.up.railway.app/api/brand/getAll-brand", {
    //             method: "GET",
    //             headers: { "Content-type": "application/json" }
    //         })
    //         const data_ = await data.json()
    //         setBrands(data_.brand)
    //         console.log(data_)
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const carData = new FormData()
            carData.append('name', name)
            carData.append('price', price)
            carData.append('fuelType', fuelType)
            carData.append('transmission', transmission)
            carData.append('engineSize', engineSize)
            carData.append('mileage', mileage)
            carData.append('safetyrating', safetyrating)
            carData.append('warranty', warranty)
            carData.append('seater', seater)
            carData.append('size', size)
            carData.append('fuelTank', fuelTank)
            carData.append('description', description)
            // carData.append('brand', brand)

            const { data } = await axios.put(`https://velocity-vehicles-backend-production.up.railway.app/api/car/update-car/${id}`, carData)

            if (data.success) {
                toast.success('Car Updated Successfully')
                navigate('/dashboard/admin/cars')
            } else {
                toast.error(data.message)
            }
        } catch (err) {
            console.log(err)
        }
    }

    const handleDelete = async () => {
        try {
            const { data } = await axios.delete(`https://velocity-vehicles-backend-production.up.railway.app/api/car/delete-car/${id}`)
            toast.success('Car Deleted Successfully')
            navigate('/dashboard/admin/cars')
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        // getAllCarBrand();
        getSingleProduct();
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className='container marginStyle'>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-md-3'>
                        <AdminMenu />
                    </div>
                    <div className='col-md-9 my-3'>
                        <h1 className='text-center'>Update Car</h1>
                        <div className='m-1'>
                            {/* <Select bordered={false} placeholder='Select A Brand' size='large' showSearch className='form-select mb-3' onChange={(e) => { setBrand(e.target.value) }} value={brand.name}>
                                {brands?.map(c => (
                                    <Option key={c._id}>
                                        {c.name}
                                    </Option>
                                ))}
                            </Select> */}
                            <div className='mb-3'>
                                <input type='text' value={name} placeholder='write a car Name' className='form-control' onChange={(e) => setname(e.target.value)} />
                            </div>
                            <div className='mb-3'>
                                <input type='text' value={price} placeholder='write a car Price' className='form-control' onChange={(e) => setprice(e.target.value)} />
                            </div>
                            <div className='mb-3'>
                                <input type='text' value={fuelType} placeholder='write a car Fuel Type' className='form-control' onChange={(e) => setfuelType(e.target.value)} />
                            </div>
                            <div className='mb-3'>
                                <input type='text' value={transmission} placeholder='write a car Transmission' className='form-control' onChange={(e) => settransmission(e.target.value)} />
                            </div>
                            <div className='mb-3'>
                                <input type='text' value={engineSize} placeholder='write a car EngineSize' className='form-control' onChange={(e) => setengineSize(e.target.value)} />
                            </div>
                            <div className='mb-3'>
                                <input type='text' value={mileage} placeholder='write a car Mileage' className='form-control' onChange={(e) => setmileage(e.target.value)} />
                            </div>
                            <div className='mb-3'>
                                <input type='text' value={safetyrating} placeholder='write a car Safetyrating' className='form-control' onChange={(e) => setsafetyrating(e.target.value)} />
                            </div>
                            <div className='mb-3'>
                                <input type='text' value={warranty} placeholder='write a car Warranty' className='form-control' onChange={(e) => setwarranty(e.target.value)} />
                            </div>
                            <div className='mb-3'>
                                <input type='text' value={seater} placeholder='write a car Seater' className='form-control' onChange={(e) => setseater(e.target.value)} />
                            </div>
                            <div className='mb-3'>
                                <input type='text' value={size} placeholder='write a car Size' className='form-control' onChange={(e) => setsize(e.target.value)} />
                            </div>
                            <div className='mb-3'>
                                <input type='text' value={fuelTank} placeholder='write a car FuelTank' className='form-control' onChange={(e) => setfuelTank(e.target.value)} />
                            </div>
                            <div className='mb-3'>
                                <textarea rows={3} type='text' value={description} placeholder='write a car Description' className='form-control' onChange={(e) => setdescription(e.target.value)} />
                            </div>
                            <div className='mb-3'>
                                <button className='btn btn-success mx-2' onClick={handleSubmit}>Update Car</button>
                                <button className='btn btn-danger' onClick={handleDelete}>Delete Car</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default UpdateCar
