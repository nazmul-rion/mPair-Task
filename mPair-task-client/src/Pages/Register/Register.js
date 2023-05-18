import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const Register = () => {
    const { signUpUser, error } = useAuth();
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
            signUpUser(email, pass);
        }
    }
    return (
        <div className="container bg-light border-shadow my-5 w-25">

            <div className="">
                <div className="text-center">
                    <h1 className=" text-bold mb-4 pt-3">Register Here</h1>
                </div>
                <form  >

                    <div className="mb-3">
                        <label className="fw-bold">Email address:</label>
                        <input className='form-control'
                            onBlur={handleEmailChange}
                            type="email"
                            placeholder="Enter email"
                            required
                        />
                    </div>

                    <div className="mb-3" >
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
                    <button
                        onClick={signinWithEmailPasswordHandler}
                        className="btn btn-info"
                        type="submit"
                    >
                        Register
                    </button>
                </form>


                <p className="text-center pt-3 m-0">
                    already have an account? <Link to="/login">Go To Login</Link>
                </p>
            </div>
        </div>

    );
};
export default Register