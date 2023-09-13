import React from 'react'
import UserMenu from './UserMenu'

const UserProfile = () => {
    return (
        <div className='container'>
            <br /><br /><br /><br /><br />
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
