import React from "react";

const faqs = [
    {
        q: "How can I book a parcel delivery?",
        a: "You can easily book your parcel by signing up on our website or mobile app, filling in the sender and receiver details, and confirming the booking.",
    },
    {
        q: "Do you offer Cash on Delivery (COD) service?",
        a: "Yes, we provide Cash on Delivery service across Bangladesh. The collected amount will be transferred to your account within 24–48 hours.",
    },
    {
        q: "How long does it take for delivery?",
        a: "Delivery times vary depending on the destination. Inside the city, it usually takes 24 hours, and outside the city, it may take 2–3 days.",
    },
    {
        q: "How can I track my parcel?",
        a: "You can track your parcel in real-time using the tracking ID provided at the time of booking, directly on our website or app.",
    },
];

const FAQSection = () => {
    return (
        <section className="py-16">
            <div className="max-w-4xl mx-auto px-4 text-center">
                {/* Title */}
                <h2 className="text-3xl text-secondary font-bold mb-4">
                    Frequently Asked Question (FAQ)
                </h2>
                <p className="text-gray-600 mb-12">
                    Enhance posture, mobility, and well-being effortlessly with Posture
                    Pro. Achieve proper alignment, reduce pain, and strengthen your body
                    with ease!
                </p>

                {/* FAQ List */}
                <div className="space-y-4 text-left">
                    {faqs.map((item, idx) => (
                        <div
                            key={idx}
                            className="collapse collapse-arrow border border-base-300 bg-base-200 rounded-lg"
                        >
                            <input type="checkbox" />
                            <div className="collapse-title text-secondary text-lg font-medium">
                                {item.q}
                            </div>
                            <div className="collapse-content">
                                <p className="text-gray-600">{item.a}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Button */}
                <div className="mt-8">
                    <button className="btn btn-primary text-secondary px-6">
                        See more FAQ's
                    </button>
                </div>
            </div>
        </section>
    );
};

export default FAQSection;
