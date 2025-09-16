import React from "react";
import Logo from "../MainLayout/Components/Logo/Logo";
import { Outlet } from "react-router";
import authImage from "../../assets/authImage.png";

const AuthLayouts = () => {
    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
            {/* Left Side */}
            <div className="flex flex-col justify-between px-8 lg:px-16 bg-base-100 min-h-screen">
                {/* Logo - Top Left */}
                <div className="pt-8">
                    <Logo />
                </div>

                {/* Outlet - Vertically Centered */}
                <div className="flex-grow flex items-center justify-center">
                    <div className="w-full max-w-md">
                        <Outlet />
                    </div>
                </div>
            </div>

            {/* Right Side */}
            <div className="hidden lg:flex items-center justify-center bg-[#FAFDF0]">
                <img
                    src={authImage}
                    alt="Auth Illustration"
                    className="max-h-[80%] object-contain"
                />
            </div>
        </div>
    );
};

export default AuthLayouts;
