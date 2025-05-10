import React from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ProtectedRoute = ({ element }) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');

    if (!user || !token) {
        toast.error('Please login');
        return <Navigate to="/login" replace />;
    }

    return element;
};

export default ProtectedRoute;
