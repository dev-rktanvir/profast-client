import React from "react";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../../../hooks/useAuth";
import Swal from "sweetalert2";
import {useNavigate } from "react-router";

const GoogleLoginButton = () => {
    const { loginWithGoogle } = useAuth()
    const navigate = useNavigate();

    const handleGoogleLogin = () => {
        loginWithGoogle()
            .then(result => {
                Swal.fire({
                    icon: "success",
                    title: "Login Successful",
                    text: "Welcome back!",
                    timer: 1500
                });
                navigate(location?.state || '/');
            })
            .catch(error => {
                Swal.fire({
                    icon: "error",
                    title: "Login Failed",
                    text: "Please Try Again",
                    timer: 1500
                });

            })
    };

    return (
        <button
            onClick={handleGoogleLogin}
            className="btn btn-outline w-full flex items-center gap-2"
        >
            <FcGoogle className="text-xl" />
            Continue with Google
        </button>
    );
};

export default GoogleLoginButton;
