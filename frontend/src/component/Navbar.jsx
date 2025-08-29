import React, { useEffect,useContext,  } from 'react'
import { Link,  useNavigate} from 'react-router-dom'
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
            <nav className="navbar navbar-expand-md sticky-top bg-body-tertiary">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/"> <img className='logo-image' src="/sun.png" alt=""/> <span className='fw-bold px-2'>Dashboard</span></Link>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <div className='me-auto'></div>
                        <ul className="navbar-nav">
                           
                           {
                            token == null ?
                             <li className="nav-item">
                                <Link className="nav-link " to="/login">Login</Link>
                            </li>
                            :<>
                            <li className="nav-item ">
                            </li>
                            
                            <li className="nav-item">
                                <Link className="nav-link text-primary fw-semibold" to="/login" onClick={handlingLogout}><u>Sign out</u></Link>
                            </li>
                            </>
                           }
                            
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar