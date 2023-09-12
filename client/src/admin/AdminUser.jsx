import React from 'react'
import AdminMenu from './AdminMenu'

const User = () => {
    return (
        <div className='container m-5 p-5'>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-md-3'>
                        <AdminMenu />
                    </div>
                    <div className='col-md-9'>
                        <h3>User Details</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default User
