import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function AdminNavbar() {
    const navigate = useNavigate()

    const logoutHandler=()=>{
        localStorage.removeItem('authToken')
        navigate('/')
    }
    return (
        <nav className="navbar navbar-expand-lg bg-light">
            <div className="container-fluid">
                
                <div id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" aria-current="page" to="/admin/manager-reg">Mangers</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/admin/dev-reg">Developers</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" onClick={logoutHandler}>Logout</Link>
                        </li>
                       
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default AdminNavbar;
