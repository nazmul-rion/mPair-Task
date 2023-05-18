import React from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const AdminRoute = ({ children }) => {
    const { user, admin } = useAuth();
    const location = useLocation();

    return (user?.email && admin) ? children : <Navigate to="/login" replace state={{ from: location }} />;
}

export default AdminRoute