import React from "react";
import Marquee from "react-fast-marquee";
import logo1 from '../../../assets/brands/amazon.png';
import logo2 from '../../../assets/brands/amazon_vector.png';
import logo3 from '../../../assets/brands/casio.png';
import logo4 from '../../../assets/brands/moonstar.png';
import logo5 from '../../../assets/brands/randstad.png';
import logo6 from '../../../assets/brands/start-people 1.png';
import logo7 from '../../../assets/brands/start.png';

const demoLogos = [logo1,logo2,logo3,logo4,logo5,logo6,logo7];

const LogosSection = () => {
    return (
        <section className="py-16">
            <div className="max-w-7xl mx-auto px-4 text-center">
                {/* Title */}
                <h2 className="text-3xl font-bold mb-8 text-secondary">
                    We&apos;ve helped thousands of <span className="text-primary">sales teams</span>
                </h2>

                {/* Logo Slider */}
                <Marquee gradient={false} speed={50}>
                    {demoLogos.map((logo, index) => (
                        <div key={index} className="mx-8">
                            <img
                                src={logo}
                                alt=""
                                className="h-16 w-28 object-contain"
                            />
                        </div>
                    ))}
                </Marquee>
            </div>
        </section>
    );
};

export default LogosSection;
