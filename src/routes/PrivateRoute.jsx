import React from 'react';
import useAuth from '../hooks/useAuth';
import Loader from '../Layouts/MainLayout/Components/Loader/Loader';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({children}) => {
    const { user, loading } = useAuth();
    const location = useLocation()

    if(loading) {
        return <Loader></Loader> 
    }

    if(!user) {
        return <Navigate state={location?.pathname} to="/login"></Navigate>
    }

    return children;
};

export default PrivateRoute;