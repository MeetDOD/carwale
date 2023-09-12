import React from 'react'
import UserMenu from './UserMenu'

const UserProfile = () => {
    return (
        <div className='container m-5 p-5'>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-md-3'>
                        <UserMenu />
                    </div>
                    <div className='col-md-9'>
                        <h3>Profile</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserProfile
