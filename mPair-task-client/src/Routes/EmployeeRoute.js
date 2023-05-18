EmployeeRoute
import React from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const EmployeeRoute = ({ children }) => {
    const { user, employee } = useAuth();
    const location = useLocation();

    return (user.email && employee) ? children : <Navigate to="/login" replace state={{ from: location }} />;
}

export default EmployeeRoute