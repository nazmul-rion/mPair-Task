import React from 'react'
import { Link } from 'react-router-dom'

function NotFoundPage() {
    return (
        <div className='container d-flex flex-column justify-content-center align-items-center' style={{ height: "100vh" }
        } >

            <h1>404</h1>
            <h2>Page Not Found!</h2>
            <Link className="fw-bold" to="/">Back to Home</Link>
        </div >
    )
}

export default NotFoundPage