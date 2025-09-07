import React from 'react';
import { Outlet } from 'react-router';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';

const MainLayout = () => {
    return (
        <div className='max-w-11/12 mx-auto pt-6'>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;