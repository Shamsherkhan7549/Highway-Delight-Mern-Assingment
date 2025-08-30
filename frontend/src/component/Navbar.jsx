import React, { useEffect, useContext, } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Navbar.css'
import { AppContext } from '../context/ContextApi.jsx'

const Navbar = () => {

    const context = useContext(AppContext);
    const { token, setToken } = context;
    const navigate = useNavigate();
    const handlingLogout = () => {
        setToken(null);
        navigate('/login');
    }

    return (
        <>

            <div className='d-flex justify-content-between align-items-center py-2 px-4'>
                <Link className="navbar-brand" to="/"> <img className='logo-image' src="/sun.png" alt="" /> <span className='fw-bold px-2'>Dashboard</span></Link>
                <ul className="navbar-nav">

                    {
                        token == null ?
                            <li className="nav-item">
                                <Link className="nav-link " to="/login">Login</Link>
                            </li>
                            : <>
                                <li className="nav-item ">
                                </li>

                                <li className="nav-item">
                                    <Link className="nav-link text-primary fw-semibold" to="/login" onClick={handlingLogout}><u>Sign out</u></Link>
                                </li>
                            </>
                    }

                </ul>
            </div>

        </>
    )
}

export default Navbar