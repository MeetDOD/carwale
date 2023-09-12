import React, { useEffect, useState } from 'react'
import AdminMenu from './AdminMenu'
import axios from 'axios'
import { Link } from 'react-router-dom';

const Cars = () => {

    const [cars, setcars] = useState([]);

    const getAllcars = async () => {
        try {
            const data = await fetch("http://localhost:5000/api/car/getAll-car", {
                method: "GET",
                headers: { "Content-type": "application/json" }
            })
            const data_ = await data.json()
            setcars(data_.car)
            console.log(data_)
        } catch (error) {
            console.log(error);
        }
    };

    const truncateText = (text, maxLength) => {
        const words = text.split(' ');
        if (words.length > maxLength) {
            return words.slice(0, maxLength).join(' ') + '...';
        }
        return text;
    };

    const handleDelete = async (id) => {
        try {
            const { data } = await axios.delete(`http://localhost:5000/api/car/delete-car/${id}`)
            if (data?.success) {
                alert('Deleted')
                getAllcars()
            } else {
                alert('Error Occured')
            }
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getAllcars();
    }, []);

    return (
        <div className='container m-5 p-5'>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-md-3'>
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h1 className="text-center">All Cars List</h1>
                        <div className="d-flex flex-wrap">
                            {cars.map((p, index) => (
                                <div class="card m-1" key={p._id} style={{ width: "18rem" }}>
                                    <div class="card-body">
                                        <h5 class="card-title">{p.name}</h5>
                                        <p className="card-text">{truncateText(p.description, 4)}</p>
                                        <Link to={`/dashboard/admin/car/${p.slug}`} key={p._id} >

                                            <img
                                                src={`http://localhost:5000/${p.productPictures[index].replace(/^uploads\\/, '')}`}
                                                height='180px' width='255px' alt={p.name}
                                            />
                                            {console.log(p.productPictures[index].replace(/^uploads\\/, ''))}
                                        </Link>
                                        <button onClick={() => handleDelete(p._id)} className='btn btn-danger mt-2'>Delete</button>
                                        <button className='btn btn-primary mt-2 mx-2'>Edit</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cars
