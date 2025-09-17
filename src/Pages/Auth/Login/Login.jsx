import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import GoogleLoginButton from "../../../Layouts/MainLayout/Components/GoogleLoginButton/GoogleLoginButton";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";

const Login = () => {
    const { loginUser } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        loginUser(data.email, data.password)
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
                    text: "Invalid email or password!",
                    timer: 1500
                });
            })
    };

    return (
        <div className="w-full max-w-md mx-auto bg-base-100 p-8 rounded-xl shadow">
            {/* Title */}
            <h2 className="text-3xl font-bold text-left mb-2">Welcome Back</h2>
            <p className="text-gray-600 text-left mb-6">Login with Profast</p>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Email */}
                <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="email">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        {...register("email", { required: "Email is required" })}
                        className="input input-bordered w-full"
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                    )}
                </div>

                {/* Password */}
                <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="password">
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        {...register("password", { required: "Password is required" })}
                        className="input input-bordered w-full"
                    />
                    {errors.password && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.password.message}
                        </p>
                    )}
                </div>

                {/* Forgot Password */}
                <div className="text-right">
                    <Link
                        to="/forgot-password"
                        className="text-sm text-primary hover:underline"
                    >
                        Forgot password?
                    </Link>
                </div>

                {/* Login Button */}
                <button type="submit" className="btn text-secondary btn-primary w-full">
                    Login
                </button>
            </form>

            {/* Register Link */}
            <p className="text-center mt-4 text-sm">
                Don&apos;t have any account?{" "}
                <Link to="/register" className="text-primary hover:underline">
                    Register
                </Link>
            </p>

            {/* Continue with Google */}
            <div className="divider">OR</div>
            <GoogleLoginButton />
        </div>
    );
};

export default Login;
