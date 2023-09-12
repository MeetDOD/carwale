import "./Navbar.css"
import React, { useState } from 'react'
import { Link } from "react-router-dom"
import { FaBars, FaTimes } from "react-icons/fa"
import { useAuth } from '../context/auth'

function Navbar() {

    const [auth, setAuth] = useAuth();
    const [click, setClick] = useState(false)
    const handleClick = () => setClick(!click)

    const [color, setColor] = useState(false);
    const changeColor = () => {
        if (window.scrollY >= 100) {
            setColor(true);
        } else {
            setColor(false);
        }
    };

    const handleSubmit = () => {
        setAuth({
            ...auth,
            user: null,
            token: ''
        })
        localStorage.removeItem('auth')
    }

    window.addEventListener("scroll", changeColor);

    return (
        <div className={color ? "header header-bg" : "header"}>
            <Link to="/" className="logo">
                <h1>Meet</h1>
            </Link>
            <ul className={click ? "nav-menu active" : "nav-menu"} style={{ marginRight: '100px' }}>
                <li>
                    <Link class="nav-link no" to="/">  Home </Link>
                </li>
                <li>
                    <Link class="nav-link no" to="/brands"> Brands </Link>
                </li>
                <li>
                    <Link class="nav-link no" to="/about"> Cart </Link>
                </li>
                {!auth.user ? (<>
                    <li class="nav-item">
                        <Link class="nav-link no" to='/login'>Login</Link>
                    </li>
                    <li class="nav-item">
                        <Link class="nav-link no" to='/register'>Register</Link>
                    </li>
                </>) : (<>
                    <li class="nav-item">
                        <Link class="nav-link no" onClick={handleSubmit} to='/login'>Logout</Link>
                    </li>
                    <li class="nav-item">
                        <Link class="nav-link no" to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}>Dashboard</Link>
                    </li>
                </>)
                }
            </ul>
            <div className="ham" onClick={handleClick}>
                {click ? (<FaTimes size={25} style={{ color: "white" }} />) : (<FaBars size={25} style={{ color: "white" }} />)}
            </div>
        </div>
    )
}

export default Navbar
