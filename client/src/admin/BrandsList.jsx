import React, { useEffect, useState } from 'react'
import AdminMenu from './AdminMenu'
import axios from 'axios'
import CategoryForm from './BrandForm'
import { Modal } from 'antd'
import toast from 'react-hot-toast'
import { ColorRing } from 'react-loader-spinner'

const CreateCategory = () => {

    const [brands, setBrand] = useState([])
    const [visible, setVisible] = useState(false)
    const [selected, setSelected] = useState(null)
    const [updatedName, setUpdatedName] = useState("")
    const [loading, setLoading] = useState(true);

    const getAllBrand = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/brand/getAll-brand`)
            if (data.success) {
                setBrand(data.brands.reverse())
            }
            setLoading(false);
        } catch (err) {
            console.log(err);
            setLoading(true);
        }
    }

    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.put(`${process.env.REACT_APP_API_URL}/api/brand/update-brand/${selected._id}`, { name: updatedName })
            if (data?.success) {
                toast.success('Brand Updated Successfully')
                setSelected(null)
                setUpdatedName("")
                setVisible(false)
                getAllBrand()
            } else {
                toast.error('Error Occured in Updating Brand')
            }
        } catch (err) {
            console.log(err)
        }
    }

    const handleDelete = async (id) => {
        try {
            const { data } = await axios.delete(`${process.env.REACT_APP_API_URL}/api/brand/delete-brand/${id}`, { name: updatedName })
            if (data?.success) {
                toast.success('Brand Deleted Successfully')
                getAllBrand()
            } else {
                toast.error('Failed to Delete ${name} Brand')
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
        <div className='container marginStyle'>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-md-3'>
                        <AdminMenu />
                    </div>
                    <div className='col-md-9 my-3'>
                        <h1 className='text-center'>All Brands List</h1>
                        {loading ?
                            <div className="h-100 d-flex align-items-center justify-content-center">
                                <ColorRing
                                    visible={true}
                                    colors={['#000435', 'rgb(14 165 233)', 'rgb(243 244 246)', '#000435', 'rgb(14 165 233)']}
                                />
                            </div>
                            :
                            <>
                                <div className="table-responsive">
                                    <table className="table table-bordered">
                                        <thead className="table-dark text-center">
                                            <tr>
                                                <th>Brand</th>
                                                <th>Name</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className='text-center'>
                                            {brands?.map(c => (
                                                <tr>
                                                    <td>
                                                        <img src={c.brandPictures} alt={c.name}
                                                            style={{ maxWidth: '100%', maxHeight: '50px', objectFit: 'contain' }}
                                                        />
                                                    </td>
                                                    <td>
                                                        <p className="fw-normal mb-1">{c.name}</p>
                                                    </td>
                                                    <td>
                                                        <button className='btn btn-primary m-2' onClick={() => { setVisible(true); setUpdatedName(c.name); setSelected(c) }}>Edit</button>
                                                        <button className='btn btn-danger' onClick={() => handleDelete(c._id)}>Delete</button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <Modal onCancel={() => setVisible(false)} footer={null} visible={visible}>
                                        <CategoryForm value={updatedName} setValue={setUpdatedName} handleSubmit={handleUpdate} />
                                    </Modal>
                                </div>
                            </>
                        }
                    </div>
                </div>
            </div>
        </div >
    )
}

export default CreateCategory
