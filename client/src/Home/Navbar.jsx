import React, { useEffect, useState } from 'react'
import { BiMenuAltRight } from 'react-icons/bi'
import '../styles/navbar.css'
import logo from '../images/logo.png'
import { Link } from "react-router-dom"
import { useAuth } from '../context/auth'
import { useCart } from '../context/cart'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import toast from 'react-hot-toast'

const Navbar = () => {

    const [auth, setAuth] = useAuth();
    const [cart] = useCart()
    const [click, setClick] = useState(false)
    const handleClick = () => setClick(!click)

    const [color, setcolor] = useState(false)

    const changeColor = () => {
        if (window.scrollY >= 90) {
            setcolor(true)
        } else {
            setcolor(false)
        }
    }

    window.addEventListener('scroll', changeColor)

    const handleSubmit = () => {
        setAuth({
            ...auth,
            user: null,
            token: ''
        })
        localStorage.removeItem('auth')
        toast.success('Logged Out Successfully')
    }

    useEffect(() => {
        const navBar = document.querySelectorAll(".nav-link");
        const navCollapse = document.querySelector(".navbar-collapse.collapse");

        const handleNavClick = () => {
            navCollapse.classList.remove("show");
        };

        navBar.forEach((a) => {
            a.addEventListener("click", handleNavClick);
        });

        return () => {
            navBar.forEach((a) => {
                a.removeEventListener("click", handleNavClick);
            });
        };
    }, []);
    return (
        <header className={color ? 'header_wrapper header-scrolled' : 'header_wrapper'}>
            <nav className="navbar navbar-expand-lg fixed-top">
                <div className="container-fluid mx-3">
                    <Link to='/'>
                        <img src={logo} style={{ width: '130px' }} />
                    </Link>
                    <button className="navbar-toggler pe-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <BiMenuAltRight size={35} />
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                        <ul className="navbar-nav menu-navbar-nav">
                            <Link to='/' style={{ textDecoration: 'none' }}>
                                <li className="nav-item">
                                    <a className="nav-link " aria-current="page">Home</a>
                                </li>
                            </Link>
                            <Link to='/about' style={{ textDecoration: 'none' }}>
                                <li className="nav-item">
                                    <a className="nav-link " aria-current="page">About</a>
                                </li>
                            </Link>
                            <Link to='/brands' style={{ textDecoration: 'none' }}>
                                <li className="nav-item">
                                    <a className="nav-link " aria-current="page">Brands</a>
                                </li>
                            </Link>
                            <Link to='/cars' style={{ textDecoration: 'none' }}>
                                <li className="nav-item">
                                    <a className="nav-link " aria-current="page">Cars</a>
                                </li>
                            </Link>
                            <Link to='/cart' style={{ textDecoration: 'none' }}>
                                <li className="nav-item">
                                    <i class="fa"><AiOutlineShoppingCart size={25} color='blueviolet' /></i>
                                    <span className='badge' style={{ marginLeft: '3px', paddingBottom: '2px', paddingTop: '1px' }} id='lblCartCount'>{cart?.length}</span>
                                </li>
                            </Link>
                        </ul>

                        {!auth.user ? (<ul className='mt-2 text-center'>
                            <Link to='/login' style={{ textDecoration: 'none' }} className="nav-item text-center">
                                <a className="nav-link learn-more-btn btn-extra-header" aria-current="page">Login</a>
                            </Link>
                            <Link to='/register' style={{ textDecoration: 'none' }} className="nav-item text-center">
                                <a className="nav-link learn-more-btn" aria-current="page">Register</a>
                            </Link>
                        </ul>) : (<ul className='mt-2 text-center'>
                            <Link to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`} style={{ textDecoration: 'none' }} className="nav-item text-center">
                                <a className="nav-link learn-more-btn" aria-current="page">Dashboard</a>
                            </Link>
                            <Link onClick={handleSubmit} to='/login' style={{ textDecoration: 'none' }} className="nav-item text-center">
                                <a className="nav-link learn-more-btn-logout" aria-current="page">Logout</a>
                            </Link>
                        </ul>)
                        }
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Navbar
