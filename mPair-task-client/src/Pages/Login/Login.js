import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const LoginPage = () => {
    const { signInUser, error } = useAuth();
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const handleEmailChange = e => {
        setEmail(e.target.value);

    }

    const handlePassChange = e => {
        setPass(e.target.value);

    }

    const signinWithEmailPasswordHandler = e => {
        e.preventDefault();
        if (email !== '' && pass !== '') {
            signInUser(email, pass);
        }
    }

    return (
        <div className="container bg-light border-shadow my-5 w-25">
            <div className="">
                <div className="text-center">
                    <h1 className=" text-bold mb-4 pt-3">Login in Here</h1>
                </div>

                <form  >

                    <div className='my-3'>
                        <label className="fw-bold">Email:</label>
                        <input className='form-control'
                            onBlur={handleEmailChange}
                            type="email"
                            placeholder="Enter email"
                            required
                        />
                    </div>


                    <div className='my-3'>
                        <label className="fw-bold">Password:</label>
                        <input className='form-control'
                            onBlur={handlePassChange}
                            type="password"
                            placeholder="Password"
                            required
                        />
                    </div>


                    {
                        error !== '' ? (<p className="text-danger"> {error}</p>) : (<></>)
                    }
                    <button onClick={signinWithEmailPasswordHandler} className="btn btn-info" type="submit">
                        Login
                    </button>

                    <p className="text-center pt-3 m-0">
                        dont have an account? <Link to="/register">Register Now</Link>
                    </p>
                </form>
            </div>

        </div >
    );
};

export default LoginPage