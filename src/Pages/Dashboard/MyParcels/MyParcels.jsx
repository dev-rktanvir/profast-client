import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaTrash, FaInfoCircle, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';

const MyParcels = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const { data: parcels = [], refetch } = useQuery({
        queryKey: ['my-parcels', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels?email=${user.email}`);
            return res.data;
        }
    })

    const handleDelete = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This parcel will be permanently deleted!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/parcels/${id}`);
                if (res.data.deletedCount) {
                    Swal.fire({
                        title: 'Deleted!',
                        text: 'The parcel has been successfully deleted.',
                        icon: 'success',
                        timer: 1500,
                        confirmButtonText: 'OK'
                    });
                    refetch();
                }
            }
        });
    };

    const handlePay = (id) => {
        navigate(`/dashboard/payment/${id}`)
    }

    return (
        <div>
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto bg-white shadow rounded-lg">
                <table className="table w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            <th>Parcel</th>
                            <th>Sender</th>
                            <th>Receiver</th>
                            <th>Cost</th>
                            <th>Status</th>
                            <th className="text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {parcels.map((parcel) => (
                            <tr key={parcel._id} className="border-b">
                                <td>
                                    <div>
                                        <p className="font-semibold">{parcel.parcelName}</p>
                                        <p className="text-sm text-gray-500">
                                            {parcel.parcelType}, {parcel.parcelWeight} kg
                                        </p>
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <p className="font-semibold">{parcel.senderName}</p>
                                        <p className="text-sm text-gray-500">
                                            {parcel.senderDistrict}
                                        </p>
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <p className="font-semibold">{parcel.receiverName}</p>
                                        <p className="text-sm text-gray-500">
                                            {parcel.receiverDistrict}
                                        </p>
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <p className="font-semibold">৳{parcel.cost?.totalCost}</p>
                                        <p className="text-sm text-gray-500">
                                            Base: ৳{parcel.cost?.baseCost}, Extra: ৳
                                            {parcel.cost?.extraCost}
                                        </p>
                                    </div>
                                </td>
                                <td>
                                    {parcel.paid ? (
                                        <span className="text-green-600 flex items-center gap-1">
                                            <FaCheckCircle /> Paid
                                        </span>
                                    ) : (
                                        <span className="text-red-600 flex items-center gap-1">
                                            <FaTimesCircle /> Unpaid
                                        </span>
                                    )}
                                </td>
                                <td className="flex gap-2 justify-end">
                                    <button
                                        className="btn btn-sm btn-info text-white flex items-center gap-1"
                                    >
                                        <FaInfoCircle /> Details
                                    </button>
                                    <button
                                        className={`btn btn-sm ${parcel.payment_status === "unpaid" ? "btn-warning" : "btn-success"
                                            } text-white`}
                                        onClick={() => handlePay(parcel._id)}
                                    >
                                        {parcel.payment_status === "unpaid" ? "Please Pay" : "Paid"}
                                    </button>

                                    <button
                                        className="btn btn-sm btn-error text-white flex items-center gap-1"
                                        onClick={() => handleDelete(parcel._id)}
                                    >
                                        <FaTrash /> Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-4">
                {parcels.map((parcel) => (
                    <div
                        key={parcel._id}
                        className="bg-white shadow rounded-lg p-4 border"
                    >
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="font-bold text-lg">{parcel.parcelName}</h3>
                                <p className="text-sm text-gray-500">
                                    {parcel.parcelType}, {parcel.parcelWeight} kg
                                </p>
                            </div>
                            <div>
                                {parcel.paid ? (
                                    <span className="text-green-600 flex items-center gap-1 text-sm">
                                        <FaCheckCircle /> Paid
                                    </span>
                                ) : (
                                    <span className="text-red-600 flex items-center gap-1 text-sm">
                                        <FaTimesCircle /> Unpaid
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="mt-3 space-y-1 text-sm">
                            <p>
                                <span className="font-semibold">Sender:</span>{" "}
                                {parcel.senderName} ({parcel.senderDistrict})
                            </p>
                            <p>
                                <span className="font-semibold">Receiver:</span>{" "}
                                {parcel.receiverName} ({parcel.receiverDistrict})
                            </p>
                            <p>
                                <span className="font-semibold">Cost:</span> ৳
                                {parcel.cost?.totalCost} (Base ৳
                                {parcel.cost?.baseCost} + Extra ৳
                                {parcel.cost?.extraCost})
                            </p>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2 mt-4">
                            <button
                                className="btn btn-xs btn-info text-white flex items-center gap-1"
                            >
                                <FaInfoCircle /> Details
                            </button>
                            <button
                                className={`btn btn-xs ${parcel.paid ? "btn-warning" : "btn-success"
                                    } text-white`}
                            >
                                {parcel.paid ? "Mark Unpaid" : "Mark Paid"}
                            </button>
                            <button
                                className="btn btn-xs btn-error text-white flex items-center gap-1"
                            >
                                <FaTrash /> Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyParcels;