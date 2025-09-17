import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import GoogleLoginButton from "../../../Layouts/MainLayout/Components/GoogleLoginButton/GoogleLoginButton";
import profileImg from "../../../assets/image-upload-icon.png";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";

const Register = () => {
    const { createUser } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {

        createUser(data.email, data.password)
            .then(result => {
                Swal.fire({
                    icon: "success",
                    title: "Registration Successful",
                    text: "Your account has been created successfully!",
                    timer: 1500,
                    confirmButtonColor: "#2563eb", // Tailwind Blue-600
                });
                reset();
                navigate(location?.state || '/');
            })
            .catch(error => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: error.message || "Registration failed. Try again!",
                    confirmButtonColor: "#dc2626", // Tailwind Red-600
                });
            })
    };

    return (
        <div className="w-full max-w-md mx-auto bg-base-100 p-8 rounded-xl shadow">
            {/* Title */}
            <h2 className="text-3xl font-bold mb-2">
                Create an Account
            </h2>
            <p className="text-gray-600 mb-6">Register with Profast</p>

            {/* Image */}
            <div className="flex mb-6">
                <img
                    src={profileImg}
                    alt="Register"
                    className="w-12 h-12 rounded-full shadow"
                />
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Name */}
                <div>
                    <label className="block mb-1 font-medium">Name</label>
                    <input
                        type="text"
                        placeholder="Your Name"
                        {...register("name", { required: "Name is required" })}
                        className="input input-bordered w-full"
                    />
                    {errors.name && (
                        <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                    )}
                </div>

                {/* Email */}
                <div>
                    <label className="block mb-1 font-medium">Email</label>
                    <input
                        type="email"
                        placeholder="Your Email"
                        {...register("email", { required: "Email is required" })}
                        className="input input-bordered w-full"
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                    )}
                </div>

                {/* Password */}
                <div>
                    <label className="block mb-1 font-medium">Password</label>
                    <input
                        type="password"
                        placeholder="Your Password"
                        {...register("password", {
                            required: "Password is required",
                            validate: (value) => {
                                if (value.length < 6) {
                                    return "Password must be at least 6 characters long";
                                }
                                if (!/[a-z]/.test(value)) {
                                    return "Password must include at least one lowercase letter";
                                }
                                if (!/[A-Z]/.test(value)) {
                                    return "Password must include at least one uppercase letter";
                                }
                                if (!/\d/.test(value)) {
                                    return "Password must include at least one number";
                                }
                                if (!/[@$!%*?&]/.test(value)) {
                                    return "Password must include at least one special character (@$!%*?&)";
                                }
                                return true; // All validations passed
                            },
                        })}
                        className="input input-bordered w-full"
                    />
                    {errors.password && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.password.message}
                        </p>
                    )}
                </div>


                {/* Register Button */}
                <button type="submit" className="btn text-secondary btn-primary w-full">
                    Register
                </button>
            </form>

            {/* Login Link */}
            <p className="text-center mt-4 text-sm">
                Already have an account?{" "}
                <Link to="/login" className="text-primary hover:underline">
                    Login
                </Link>
            </p>

            {/* Continue with Google */}
            <div className="divider">OR</div>
            <GoogleLoginButton />
        </div>
    );
};

export default Register;
