import React, { useEffect, useState } from 'react'
import AdminMenu from './AdminMenu'
import axios from 'axios'
import CategoryForm from './BrandForm'
import { Select, Modal } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'

const { Option } = Select

const UpdateCar = () => {

    const params = useParams()

    const [brands, setBrands] = useState([])
    const [brand, setBrand] = useState('')
    const [name, setname] = useState('')
    const [description, setdescription] = useState('')
    const [shipping, setshipping] = useState('')
    const [photo, setPhoto] = useState('')
    const [id, setId] = useState('')

    const navigate = useNavigate();

    const getSingleProduct = async () => {
        try {
            const { data } = await axios.get(`http://localhost:5000/api/car/getCarById-car/${params.slug}`)
            setname(data.car.name)
            setBrand(data.car.brand)
            setdescription(data.car.description)
            setId(data.car._id)
            setshipping(data.car.shipping)
        } catch (err) {
            console.log(err)
        }
    }

    const getAllCarBrand = async () => {
        try {
            const data = await fetch("http://localhost:5000/api/brand/getAll-brand", {
                method: "GET",
                headers: { "Content-type": "application/json" }
            })
            const data_ = await data.json()
            setBrands(data_.brand)
            console.log(data_)
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const carData = new FormData()
            carData.append('name', name)
            carData.append('description', description)
            carData.append('shipping', shipping)
            photo && carData.append('photo', photo)
            carData.append('brand', brand)

            const { data } = await axios.put(`http://localhost:5000/api/car/update-car/${id}`, carData)

            if (data.success) {
                alert('Car Updated Successfully')
                navigate('/dashboard/admin/cars')
            } else {
                alert('Error in Car Update')
            }
        } catch (err) {
            console.log(err)
        }
    }

    const handleDelete = async () => {
        try {
            let ans = window.prompt('Are you Sure you want to Delete this Car');
            if (!ans) return;
            const { data } = await axios.delete(`http://localhost:5000/api/car/delete-car/${id}`)
            alert('Car Deleted')
            navigate('/dashboard/admin/cars')
        } catch (err) {

        }
    }

    useEffect(() => {
        getAllCarBrand();
        getSingleProduct();
    }, [])

    return (
        <div className='container m-5 p-5'>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-md-3'>
                        <AdminMenu />
                    </div>
                    <div className='col-md-9 mt-2'>
                        <h1>Update Car</h1>
                        <div className='m-1'>
                            <Select bordered={false} placeholder='Select A Brand' size='large' showSearch className='form-select mb-3' onChange={(e) => { setBrand(e.target.value) }} value={brand.name}>
                                {brands?.map(c => (
                                    <Option key={c._id}>
                                        {c.name}
                                    </Option>
                                ))}
                            </Select>

                            {/* <div className="mb-3">
                                <label className="btn btn-outline-secondary col-md-12">
                                    {photo ? photo.name : "Upload Photo"}
                                    <input
                                        type="file"
                                        name="photo"
                                        accept="image/*"
                                        onChange={(e) => setPhoto(e.target.files[0])}
                                        hidden
                                    />
                                </label>
                            </div> */}
                            {/* <div className="mb-3">
                                {photo ? (
                                    <div className="text-center">
                                        <img
                                            src={URL.createObjectURL(photo)}
                                            alt="product_photo"
                                            height={"200px"}
                                            className="img img-responsive"
                                        />
                                    </div>
                                ) : (
                                    <div className="text-center">
                                        <img
                                            src={`http://localhost:5000/${photo.productPictures?.replace(/^uploads\\/, '')}`}
                                            alt="product_photo"
                                            height={"200px"}
                                            className="img img-responsive"
                                        />
                                    </div>
                                )}
                            </div> */}
                            <div className='mb-3'>
                                <input type='text' value={name} placeholder='write a car name' className='form-control' onChange={(e) => setname(e.target.value)} />
                            </div>
                            <div className='mb-3'>
                                <textarea rows={3} type='text' value={description} placeholder='write a car description' className='form-control' onChange={(e) => setdescription(e.target.value)} />
                            </div>
                            {/* <div className='mb-3'>
                                <Select bordered={false} placeholder='Select Shipping' size='large' showSearch className='form-select mb-3' onChange={(value) => { setshipping(value) }} value={shipping ? "yes" : "no"}>
                                    <Option value='0'>No</Option>
                                    <Option value='1'>Yes</Option>
                                </Select>
                            </div> */}
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
