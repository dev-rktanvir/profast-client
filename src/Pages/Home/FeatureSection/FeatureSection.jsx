import React from "react";
import image1 from '../../../assets/live-tracking.png';
import image2 from '../../../assets/safe-delivery.png';

const features = [
    {
        title: "Live Parcel Tracking",
        text: "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
        image: image1,
    },
    {
        title: "100% Safe Delivery",
        text: "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
        image: image2,
    },
    {
        title: "24/7 Call Center Support",
        text: "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
        image: image2,
    },
];

const FeatureSection = () => {
    return (
        <section className="py-16 border-y-2 border-dashed border-secondary max-w-7xl mx-auto">
            <div className="max-w-7xl mx-auto px-4 space-y-8">
                {features.map((feature, index) => (
                    <div
                        key={index}
                        className="flex flex-col md:flex-row justify-between items-center md:items-center gap-6 bg-white rounded-3xl p-8"
                    >
                        {/* Left Column - Image */}
                        <div className="flex justify-center md:justify-start pr-0 md:pr-6 md:border-r-2 md:border-dashed md:border-secondary w-full md:w-1/3">
                            <img
                                src={feature.image}
                                alt={feature.title}
                                className="w-36 h-36 md:w-48 md:h-48 object-cover"
                            />
                        </div>

                        {/* Right Column - Text */}
                        <div className="w-full md:[80%] text-center md:text-left md:pl-6">
                            <h3 className="text-2xl text-secondary font-semibold mb-2">{feature.title}</h3>
                            <p className="text-accent">{feature.text}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FeatureSection;
