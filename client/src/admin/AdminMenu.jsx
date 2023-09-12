import React from 'react'
import { Link } from 'react-router-dom'

const AdminMenu = () => {
    return (
        <div>
            <div className='card'>
                <div className='list-group list-group-flush'>
                    <Link to='/dashboard/admin' className='list-group-item list-group-item-action'> Dashboard</Link>
                    <Link to='/dashboard/admin/create-category' className='list-group-item list-group-item-action'> Brand</Link>
                    <Link to='/dashboard/admin/create-product' className='list-group-item list-group-item-action'> Create Car</Link>
                    <Link to='/dashboard/admin/cars' className='list-group-item list-group-item-action'> Cars List</Link>
                    <Link to='/dashboard/admin/user' className='list-group-item list-group-item-action'> User </Link>
                </div>
            </div>
        </div>
    )
}

export default AdminMenu
