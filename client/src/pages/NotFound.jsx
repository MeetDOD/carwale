import React from 'react'
import notFound from '../images/notFound.png'

const NotFound = () => {
    return (
        <div className='text-center marginStyle'>
            <img src={notFound} width={400} alt='NOT FOUND' />
            <h1>
                <span className='text-danger fs-1'>404</span><br /> Page Not Found
            </h1>
        </div>
    )
}

export default NotFound
