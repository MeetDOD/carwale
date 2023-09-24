import React, { useEffect, useState } from 'react'
import AdminMenu from './AdminMenu'
import axios from 'axios'
import CategoryForm from './BrandForm'
import { Modal } from 'antd'

const CreateCategory = () => {

    const [brand, setBrand] = useState([])
    const [name, setName] = useState("")
    const [brandPictures, setBrandPictures] = useState("")
    const [visible, setVisible] = useState(false)
    const [selected, setSelected] = useState(null)
    const [updatedName, setUpdatedName] = useState("")

    const getAllBrand = async () => {
        try {
            const { data } = await axios.get('https://velocity-vehicles-backend-production.up.railway.app/api/brand/getAll-brand')
            if (data.success) {
                setBrand(data.brand)
            }
        } catch (err) {
            console.log(err)
        }
    }

    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.put(`https://velocity-vehicles-backend-production.up.railway.app/api/brand/update-brand/${selected._id}`, { name: updatedName })
            if (data?.success) {
                alert('Brand Updated')
                setSelected(null)
                setUpdatedName("")
                setVisible(false)
                getAllBrand()
            } else {
                alert('Error Occured')
            }
        } catch (err) {
            console.log(err)
        }
    }

    const handleDelete = async (id) => {
        try {
            const { data } = await axios.delete(`https://velocity-vehicles-backend-production.up.railway.app/api/brand/delete-brand/${id}`, { name: updatedName })
            if (data?.success) {
                alert(`${name} Deleted`)
                getAllBrand()
            } else {
                alert('Error Occured')
            }
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getAllBrand();
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className='container'>
            <br />
            <br />
            <br />
            <br />
            <br />
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-md-3'>
                        <AdminMenu />
                    </div>
                    <div className='col-md-9 mt-3'>
                        <h1 className='mx-5'>All Brands</h1>
                        <div class="table-responsive mx-5 my-3 text-center">
                            <table class="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope='col'>Brand Name</th>
                                        <th scope='col'>Brand Image</th>
                                        <th scope='col'>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {brand?.map(c => (
                                        <tr>
                                            <>
                                                <td key={c._id}>{c.name}</td>
                                                <img
                                                    src={`https://velocity-vehicles-backend-production.up.railway.app/${c.brandPictures}`}
                                                    height='180px' width='255px' alt={c.name}
                                                />
                                                <td><button className='btn btn-primary mx-2' onClick={() => { setVisible(true); setUpdatedName(c.name); setSelected(c) }}>Edit</button>
                                                    <button className='btn btn-danger' onClick={() => handleDelete(c._id)}>Delete</button></td>
                                            </>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <Modal onCancel={() => setVisible(false)} footer={null} visible={visible}>
                                <CategoryForm value={updatedName} setValue={setUpdatedName} handleSubmit={handleUpdate} />
                            </Modal>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default CreateCategory
