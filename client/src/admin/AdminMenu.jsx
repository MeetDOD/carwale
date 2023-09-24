import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

const AdminMenu = () => {
    return (
        <div>
            <div className='card'>
                <div className='list-group list-group-flush'>
                    <Link to='/dashboard/admin' className='list-group-item list-group-item-action'> Dashboard</Link>
                    <Link to='/dashboard/admin/allbrands' className='list-group-item list-group-item-action'> Brand List</Link>
                    <Link to='/dashboard/admin/cars' className='list-group-item list-group-item-action'> Cars List</Link>
                    <Link to='/dashboard/admin/create-brand' className='list-group-item list-group-item-action'> Create Brand</Link>
                    <Link to='/dashboard/admin/create-product' className='list-group-item list-group-item-action'> Create Car</Link>
                    <Link to='/dashboard/admin/userorders' className='list-group-item list-group-item-action'> User Orders </Link>
                </div>
            </div>
        </div>
    )
}

export default AdminMenu
