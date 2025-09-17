import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const SendParcel = () => {
    const coverageData = useLoaderData();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { register, handleSubmit, watch, reset } = useForm();
    const [parcelType, setParcelType] = useState("document");

    const senderRegion = watch("senderRegion");
    const senderDistrict = watch("senderDistrict");
    const receiverRegion = watch("receiverRegion");
    const receiverDistrict = watch("receiverDistrict");

    // District getter
    const getDistricts = (region) =>
        coverageData.filter((item) => item.region === region);

    const getBranches = (region, district) =>
        coverageData.find(
            (item) => item.region === region && item.district === district
        )?.covered_area || [];

    // Cost Calculation
    const calculateCost = (data) => {
        let withinDistrict = false;
        if (
            data.senderDistrict &&
            data.receiverDistrict &&
            data.senderDistrict === data.receiverDistrict
        ) {
            withinDistrict = true;
        }

        let baseCost = 0;
        let extraCost = 0;
        let totalCost = 0;
        const type = parcelType === "document" ? "Document" : "Non-Document";
        const weight = parcelType === "document" ? "Any" : parseFloat(data.parcelWeight || 0);

        if (parcelType === "document") {
            baseCost = withinDistrict ? 60 : 80;
            totalCost = baseCost;
        } else {
            if (weight <= 3) {
                baseCost = withinDistrict ? 110 : 150;
                totalCost = baseCost;
            } else {
                baseCost = withinDistrict ? 110 : 150;
                extraCost = (weight - 3) * 40 + (!withinDistrict ? 40 : 0);
                totalCost = baseCost + extraCost;
            }
        }

        return { type, weight, baseCost, extraCost, totalCost, withinDistrict };
    };


    const onSubmit = (data) => {
        const { type, weight, baseCost, extraCost, totalCost, withinDistrict } =
            calculateCost(data);

        let breakdownHTML = `
    <div class="text-left">
      <p class="font-semibold mb-2">📦 Parcel Details:</p>
      <ul class="list-disc pl-6 text-sm">
        <li>Delivery Zone: <b>${withinDistrict ? "Within District" : "Outside District"
            }</b></li>
        <li>Parcel Type: <b>${type}</b></li>
        <li>Weight: <b>${weight} ${parcelType === "document" ? "" : "kg"
            }</b></li>
      </ul>

      <p class="font-semibold mt-3 mb-2">💰 Cost Calculation:</p>
      <ul class="list-disc pl-6 text-sm">
        <li>Base Cost: ৳${baseCost}</li>`;

        if (extraCost > 0) {
            if (weight > 3) {
                breakdownHTML += `
        <li>Extra Weight Charge: (${weight} - 3) × 40 = ৳${(weight - 3) * 40
                    }</li>`;
            }
            if (!withinDistrict) {
                breakdownHTML += `
        <li>Outside District Extra: ৳40</li>`;
            }
        }

        breakdownHTML += `
      </ul>

      <div class="mt-4 p-2 border-t">
        <p class="font-bold text-green-600">✅ Total Cost: ৳${totalCost}</p>
      </div>
    </div>
  `;

        Swal.fire({
            title: "Confirm Booking",
            html: breakdownHTML,
            icon: "info",
            showCancelButton: true,
            confirmButtonText: "Confirm",
            cancelButtonText: "Edit",
            confirmButtonColor: "#2563eb",
            cancelButtonColor: "#f59e0b",
            width: 600,
        }).then((result) => {
            if (result.isConfirmed) {
                // prepare final data for DB
                const bookingData = {
                    ...data,
                    parcelType: type,
                    weight,
                    cost: {
                        baseCost,
                        extraCost,
                        totalCost,
                        withinDistrict,
                    },
                    userEmail: user?.email || "guest",
                    createdAt: new Date().toISOString(),
                    delevery_status: "Not-collected",
                    payment_status: "unpaid",
                    trackingId: "TRK-" + Date.now(),
                };
                // Send Data to DB
                axiosSecure.post('/parcels', bookingData)
                    .then(res => {
                        if (res.data.insertedId) {
                            Swal.fire({
                                icon: "success",
                                title: "Parcel booking is confirmed.",
                                text: "Redirect To Payment Page!",
                                timer: 1500
                            });
                            reset();
                        }
                    })

            }
        });
    };



    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-full mx-auto bg-white p-6 lg:px-24 lg:py-10 my-10 shadow-md rounded-4xl"
        >
            <h2 className="text-2xl font-bold mb-6 text-center text-secondary">
                Send Parcel
            </h2>

            {/* Section 1 */}
            <div className="mb-6 border-t border-b border-gray-200 pt-10 pb-8">
                <h3 className="text-xl font-semibold mb-4 text-secondary">
                    Enter your parcel details
                </h3>

                <div className="flex items-center gap-6 mb-4">
                    <label className="flex items-center gap-2">
                        <input
                            type="radio"
                            value="document"
                            checked={parcelType === "document"}
                            onChange={() => setParcelType("document")}
                        />
                        Document
                    </label>
                    <label className="flex items-center gap-2">
                        <input
                            type="radio"
                            value="not_document"
                            checked={parcelType === "not_document"}
                            onChange={() => setParcelType("not_document")}
                        />
                        Not Document
                    </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block font-medium">Parcel Name</label>
                        <input
                            {...register("parcelName", { required: true })}
                            placeholder="Enter parcel name"
                            className="w-full border rounded p-2"
                        />
                    </div>
                    <div>
                        <label className="block font-medium">Parcel Weight (kg)</label>
                        <input
                            type="number"
                            step="0.1"
                            {...register("parcelWeight", {
                                required: parcelType === "not_document",
                            })}
                            placeholder="Enter weight"
                            className="w-full border rounded p-2"
                            disabled={parcelType === "document"}
                        />
                    </div>
                </div>
            </div>

            {/* Section 2 + 3 Side by Side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Sender Section */}
                <div>
                    <h3 className="text-xl font-semibold mb-4 text-secondary">
                        Sender Details
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Name + Region */}
                        <div>
                            <label className="block font-medium">Sender Name</label>
                            <input
                                {...register("senderName", { required: true })}
                                placeholder="Sender name"
                                className="w-full border rounded p-2"
                            />
                        </div>
                        <div>
                            <label className="block font-medium">Region</label>
                            <select
                                {...register("senderRegion", { required: true })}
                                className="w-full border rounded p-2"
                            >
                                <option value="">Select Region</option>
                                {[...new Set(coverageData.map((item) => item.region))].map(
                                    (region, idx) => (
                                        <option key={idx} value={region}>
                                            {region}
                                        </option>
                                    )
                                )}
                            </select>
                        </div>

                        {/* District + Branch */}
                        <div>
                            <label className="block font-medium">District</label>
                            <select
                                {...register("senderDistrict", { required: true })}
                                className="w-full border rounded p-2"
                                disabled={!senderRegion}
                            >
                                <option value="">Select District</option>
                                {getDistricts(senderRegion).map((item, idx) => (
                                    <option key={idx} value={item.district}>
                                        {item.district}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block font-medium">Branch</label>
                            <select
                                {...register("senderBranch", { required: true })}
                                className="w-full border rounded p-2"
                                disabled={!senderDistrict}
                            >
                                <option value="">Select Branch</option>
                                {getBranches(senderRegion, senderDistrict).map((branch, idx) => (
                                    <option key={idx} value={branch}>
                                        {branch}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Contact No + Address */}
                        <div>
                            <label className="block font-medium">Contact No</label>
                            <input
                                {...register("senderContact", { required: true })}
                                placeholder="Contact number"
                                className="w-full border rounded p-2"
                            />
                        </div>
                        <div>
                            <label className="block font-medium">Address</label>
                            <input
                                {...register("senderAddress", { required: true })}
                                placeholder="Sender address"
                                className="w-full border rounded p-2"
                            />
                        </div>
                    </div>

                    {/* Instruction */}
                    <div className="mt-4">
                        <label className="block font-medium">Pickup Instruction</label>
                        <textarea
                            {...register("senderInstruction")}
                            placeholder="Any special instruction"
                            className="w-full border rounded p-2"
                            rows="3"
                        />
                    </div>
                </div>

                {/* Receiver Section */}
                <div>
                    <h3 className="text-xl font-semibold mb-4 text-secondary">
                        Receiver Details
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Name + Region */}
                        <div>
                            <label className="block font-medium">Receiver Name</label>
                            <input
                                {...register("receiverName", { required: true })}
                                placeholder="Receiver name"
                                className="w-full border rounded p-2"
                            />
                        </div>
                        <div>
                            <label className="block font-medium">Region</label>
                            <select
                                {...register("receiverRegion", { required: true })}
                                className="w-full border rounded p-2"
                            >
                                <option value="">Select Region</option>
                                {[...new Set(coverageData.map((item) => item.region))].map(
                                    (region, idx) => (
                                        <option key={idx} value={region}>
                                            {region}
                                        </option>
                                    )
                                )}
                            </select>
                        </div>

                        {/* District + Branch */}
                        <div>
                            <label className="block font-medium">District</label>
                            <select
                                {...register("receiverDistrict", { required: true })}
                                className="w-full border rounded p-2"
                                disabled={!receiverRegion}
                            >
                                <option value="">Select District</option>
                                {getDistricts(receiverRegion).map((item, idx) => (
                                    <option key={idx} value={item.district}>
                                        {item.district}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block font-medium">Branch</label>
                            <select
                                {...register("receiverBranch", { required: true })}
                                className="w-full border rounded p-2"
                                disabled={!receiverDistrict}
                            >
                                <option value="">Select Branch</option>
                                {getBranches(receiverRegion, receiverDistrict).map(
                                    (branch, idx) => (
                                        <option key={idx} value={branch}>
                                            {branch}
                                        </option>
                                    )
                                )}
                            </select>
                        </div>

                        {/* Contact No + Address */}
                        <div>
                            <label className="block font-medium">Contact No</label>
                            <input
                                {...register("receiverContact", { required: true })}
                                placeholder="Contact number"
                                className="w-full border rounded p-2"
                            />
                        </div>
                        <div>
                            <label className="block font-medium">Address</label>
                            <input
                                {...register("receiverAddress", { required: true })}
                                placeholder="Receiver address"
                                className="w-full border rounded p-2"
                            />
                        </div>
                    </div>

                    {/* Instruction */}
                    <div className="mt-4">
                        <label className="block font-medium">Delivery Instruction</label>
                        <textarea
                            {...register("receiverInstruction")}
                            placeholder="Any special instruction"
                            className="w-full border rounded p-2"
                            rows="3"
                        />
                    </div>
                </div>
            </div>

            {/* Submit Button */}
            <div className="text-center mt-6">
                <button
                    type="submit"
                    className="px-6 py-3 bg-primary text-secondary rounded-lg font-semibold hover:opacity-90"
                >
                    Proceed to Confirm Booking
                </button>
            </div>
        </form>
    );
};

export default SendParcel;
