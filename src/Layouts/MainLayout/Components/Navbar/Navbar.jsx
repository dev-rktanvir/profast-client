import React from 'react';
import { Link, NavLink } from 'react-router';
import Logo from '../Logo/Logo';
import useAuth from '../../../../hooks/useAuth';
import Swal from 'sweetalert2';

const Navbar = () => {
    const { user, logoutUser } = useAuth();
    const handleLogout = () => {
        logoutUser()
            .then(result => {
                Swal.fire({
                    icon: "success",
                    title: "Logged Out",
                    text: "You have been logged out successfully.",
                    timer: 1500,
                    showConfirmButton: false
                });
            })
            .catch((error) => {
                Swal.fire({
                    icon: "error",
                    title: "Logout Failed",
                    text: error.message || "Something went wrong. Please try again.",
                    confirmButtonColor: "#dc2626", // Tailwind red-600
                });
            });
    }
    const links = <>
        <li><NavLink to='/services'>Services</NavLink></li>
        <li><NavLink to='/coverage'>Coverage</NavLink></li>
    </>
    return (
        <div className="navbar bg-base-100 shadow-sm p-3 rounded-2xl">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {links}
                    </ul>
                </div>
                <Logo></Logo>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {links}
                </ul>
            </div>
            <div className="navbar-end">
                {user ? (
                    <button onClick={handleLogout} className="btn btn-outline">
                        Logout
                    </button>
                ) : (
                    <Link to="/login" className="btn text-secondary btn-primary">
                        Login
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Navbar;