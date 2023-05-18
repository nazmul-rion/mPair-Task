import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth';

function NavigationBar() {

    const { user, admin, signOutUser } = useAuth();
    let navigate = useNavigate();

    return (
        <div>
            <nav class="navbar navbar-expand-lg bg-body-tertiary">
                <div class="container-fluid">
                    <Link class="navbar-brand" to="/">
                        <img src="https://mpairtech.com/resources/icons/Logo.svg" alt="Bootstrap" width="50" height="50" />
                    </Link>
                    <Link class="navbar-brand" to="/">mPair</Link>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav">
                            <li class="nav-item">
                                <Link class="nav-link active" aria-current="page" to="/">Home</Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link" to="/dashBoard">Dashboard</Link>
                            </li>

                            <li class="nav-item">
                                {
                                    admin && <Link class="nav-link" to="/salary-management">Salary Management</Link>
                                }

                            </li>

                            {user.email ? (
                                <>
                                    <li>
                                        <b className="mx-3">{user.name}</b>
                                        <button className='btn btn-danger float-end' onClick={signOutUser}>Sign Out</button>{' '}
                                    </li>
                                </>
                            ) : (
                                <>
                                    <button className='btn btn-info' onClick={() => navigate('/login')} >Login</button>
                                </>)
                            }

                        </ul>
                    </div>
                </div>
            </nav >
        </div >
    )
}

export default NavigationBar