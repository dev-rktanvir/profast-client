import React from "react";
import img1 from '../../../assets/be-a-merchant-bg.png';
import img2 from '../../../assets/location-merchant.png';

const MerchantSection = () => {
    return (
        <section
            className="my-10 md:my-20 px-4 sm:px-6 lg:px-12 py-16 md:py-20 bg-secondary rounded-4xl text-white max-w-7xl mx-auto"
            style={{
                backgroundImage: `url(${img1})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "top center",
            }}
        >
            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12">
                {/* Left Column */}
                <div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-snug mb-6">
                        Merchant and Customer Satisfaction is Our First Priority
                    </h2>
                    <p className="text-base sm:text-lg mb-8">
                        We offer the lowest delivery charge with the highest value along
                        with 100% safety of your product. Pathao courier delivers your
                        parcels in every corner of Bangladesh right on time.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <button className="px-5 py-3 border text-sm sm:text-base cursor-pointer text-secondary bg-primary border-primary font-semibold rounded-xl">
                            Become a Merchant
                        </button>
                        <button className="px-5 py-3 border text-sm sm:text-base cursor-pointer bg-transparent text-primary border-primary rounded-xl">
                            Earn with Profast Courier
                        </button>
                    </div>
                </div>

                {/* Right Column */}
                <div className="flex justify-center">
                    <img
                        src={img2}
                        alt="Merchant Satisfaction"
                        className="w-full max-w-md"
                    />
                </div>
            </div>
        </section>
    );
};

export default MerchantSection;
