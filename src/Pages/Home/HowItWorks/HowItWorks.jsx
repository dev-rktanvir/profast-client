import React from "react";
import { FaBoxOpen, FaMoneyBillWave, FaWarehouse, FaBuilding } from "react-icons/fa";

const HowItWorks = () => {
    const steps = [
        {
            icon: <FaBoxOpen className="text-5xl text-secondary mb-4" />,
            title: "Booking Pick & Drop",
            text: "Easily book your parcel for pick up and delivery to your preferred location.",
        },
        {
            icon: <FaMoneyBillWave className="text-5xl text-secondary mb-4" />,
            title: "Cash On Delivery",
            text: "Pay securely upon receiving your parcel with our COD service.",
        },
        {
            icon: <FaWarehouse className="text-5xl text-secondary mb-4" />,
            title: "Delivery Hub",
            text: "Your parcels are processed and managed through our trusted delivery hubs.",
        },
        {
            icon: <FaBuilding className="text-5xl text-secondary mb-4" />,
            title: "Booking SME & Corporate",
            text: "Special delivery solutions tailored for SMEs and corporate clients.",
        },
    ];

    return (
        <section className="py-5 md:py-8 lg:py-16">
            <div className="max-w-7xl mx-auto px-4 text-left">
                <h2 className="text-3xl text-secondary font-bold mb-8 md:mb-12">How It Works</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className="card bg-base-200 shadow-md hover:shadow-xl transition rounded-2xl p-6 flex flex-col"
                        >
                            {step.icon}
                            <h3 className="text-xl text-secondary font-semibold mb-2">{step.title}</h3>
                            <p className="text-accent text-sm">{step.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
