import React, { useState } from "react";
import { Link, Outlet } from "react-router";
import { FaBox, FaHome, FaUser, FaCog, FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";
import Logo from "../MainLayout/Components/Logo/Logo";

const DashboardLayout = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <aside
                className={`fixed md:static top-0 left-0 h-screen md:h-screen w-64 bg-secondary text-white flex flex-col z-50 transform transition-transform duration-300 
  ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
            >
                {/* Logo + Close btn */}
                <div className="p-4 text-2xl font-bold border-b border-white/20 flex justify-between items-center">
                    <Logo></Logo>
                    <button className="md:hidden" onClick={() => setIsOpen(false)}>
                        <FaTimes />
                    </button>
                </div>

                {/* Menu */}
                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    <Link to="/dashboard" className="flex items-center gap-3 p-2 rounded-lg hover:bg-primary/80">
                        <FaHome /> Dashboard
                    </Link>
                    <Link to="/dashboard/my-parcels" className="flex items-center gap-3 p-2 rounded-lg hover:bg-primary/80">
                        <FaBox /> My Parcel
                    </Link>
                    <Link to="/dashboard/parcels" className="flex items-center gap-3 p-2 rounded-lg hover:bg-primary/80">
                        📦 Parcels
                    </Link>
                    <Link to="/dashboard/profile" className="flex items-center gap-3 p-2 rounded-lg hover:bg-primary/80">
                        <FaUser /> Profile
                    </Link>
                    <Link to="/dashboard/settings" className="flex items-center gap-3 p-2 rounded-lg hover:bg-primary/80">
                        <FaCog /> Settings
                    </Link>
                </nav>

                {/* Logout */}
                <div className="p-4 border-t border-white/20">
                    <button className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-red-600">
                        <FaSignOutAlt /> Logout
                    </button>
                </div>
            </aside>


            {/* Main content */}
            <div className="flex-1 flex flex-col">
                {/* Topbar */}
                <header className="bg-white shadow px-4 py-6 flex justify-between items-center">
                    {/* Hamburger menu button */}
                    <button className="md:hidden text-primary" onClick={() => setIsOpen(true)}>
                        <FaBars size={22} />
                    </button>

                    <h1 className="text-xl font-bold text-gray-700">Dashboard</h1>

                    {/* User Info */}
                    <div className="flex items-center gap-4">
                        <span className="text-gray-600 hidden sm:block">Hello, User</span>
                        <img
                            src="https://i.pravatar.cc/40"
                            alt="avatar"
                            className="w-10 h-10 rounded-full border"
                        />
                    </div>
                </header>

                {/* Content */}
                <main className="flex-1 p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
