import "./Navbar.css"
import React, { useState } from 'react'
import { Link } from "react-router-dom"
import { FaBars, FaTimes } from "react-icons/fa"
import { useAuth } from '../context/auth'
import vd from './vd.png'
import { useCart } from '../context/cart'

function Navbar() {

    const [auth, setAuth] = useAuth();
    const [cart] = useCart()
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
        <div>
            <nav className={color ? "header header-bg" : "header"}>
                <div class="wrapper">
                    <div class="logo">
                        <Link to='/' style={{ textDecoration: 'none' }}>
                            <img src={vd} height="150" alt="logo" />
                        </Link>
                    </div>
                    <input type="radio" name="slider" id="menu-btn" />
                    <input type="radio" name="slider" id="close-btn" />
                    <ul class="nav-links pt-3">
                        <label for="close-btn" class="btn close-btn"><FaTimes /></label>
                        <Link to='/' style={{ textDecoration: 'none' }}>
                            <li className=' text-white ' onClick={handleClick}>
                                <a className='hoverBot'>Home</a>
                            </li>
                        </Link>
                        <Link to='/about' style={{ textDecoration: 'none' }}>
                            <li className=' text-white'>
                                <a className='hoverBot'>About</a>
                            </li>
                        </Link>
                        <Link to='/brands' style={{ textDecoration: 'none' }} onClick={handleClick}>
                            <li className=' text-dark'>
                                <a className='hoverBot'>Brands</a>
                            </li>
                        </Link>
                        {!auth.user ? (<>
                            <li className=' text-white'>
                                <Link className='hoverBot' to='/login'>Login</Link>
                            </li>
                            <li className=' text-white'>
                                <Link className='hoverBot' to='/register'>Register</Link>
                            </li>
                        </>) : (<>
                            <li className=' text-white'>
                                <Link className='hoverBot' to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}>Dashboard</Link>
                            </li>
                            <li className=' text-white'>
                                <Link className='hoverBot' onClick={handleSubmit} to='/login'>Logout</Link>
                            </li>
                        </>)
                        }
                        <Link to='/cart' style={{ textDecoration: 'none' }} onClick={handleClick}>
                            <li className=' text-dark'>
                                <a className='hoverBot'>Cart {cart?.length}</a>
                            </li>
                        </Link>
                    </ul>
                    <label for="menu-btn" class="btn menu-btn"><FaBars /></label>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
