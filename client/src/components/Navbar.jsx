import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/auth'

const Navbar = () => {

    const [auth, setAuth] = useAuth();

    const handleSubmit = () => {
        setAuth({
            ...auth,
            user: null,
            token: ''
        })
        localStorage.removeItem('auth')
    }

    return (
        <div>
            <nav class="navbar navbar-expand-lg container">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">Navbar</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav ms-auto">
                            <li class="nav-item">
                                <Link class="nav-link" to="/">Home</Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link" to="/category">Category</Link>
                            </li>
                            {!auth.user ? (<>
                                <li class="nav-item">
                                    <Link class="nav-link" to='/login'>Login</Link>
                                </li>
                                <li class="nav-item">
                                    <Link class="nav-link" to='/register'>Register</Link>
                                </li>
                            </>) : (<>
                                <li class="nav-item">
                                    <Link class="nav-link" onClick={handleSubmit} to='/login'>Logout</Link>
                                </li>
                                <li class="nav-item">
                                    <Link class="nav-link" to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}>Dashboard</Link>
                                </li>
                            </>)
                            }
                            <li class="nav-item">
                                <Link to='/cart' class="nav-link" >Cart</Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link" to='/admin'>Admin</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
