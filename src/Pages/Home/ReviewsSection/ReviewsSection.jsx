import React, { use } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaQuoteLeft } from "react-icons/fa";
import "swiper/css";
import { Autoplay } from "swiper/modules";

// Fetch testimonials data
const testimonialsPromiss = fetch("reviews.json").then((res) => res.json());

const ReviewsSection = () => {
    const testimonials = use(testimonialsPromiss);

    return (
        <section className="py-8 md:py-16">
            <div className="max-w-6xl mx-auto px-4 text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-secondary">
                    What our customers are saying
                </h2>
                <p className="text-gray-600 mt-6 mb-12 max-w-3xl text-center mx-auto">
                    Enhance posture, mobility, and well-being effortlessly with Posture Pro.
                    Achieve proper alignment, reduce pain, and strengthen your body with ease!
                </p>

                <Swiper
                    spaceBetween={20}
                    loop={true}
                    centeredSlides={true}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    modules={[Autoplay]}
                    className="!overflow-visible"
                    breakpoints={{
                        0: {
                            slidesPerView: 1,
                            centeredSlides: false,
                        },
                        768: {
                            slidesPerView: 1,
                            centeredSlides: false,
                        },
                        1024: {
                            slidesPerView: 3,
                            centeredSlides: true,
                        },
                    }}
                >
                    {testimonials.map((t, idx) => (
                        <SwiperSlide key={idx} className="!overflow-visible mt-10">
                            {({ isActive }) => (
                                <div
                                    className={`transition-all duration-300 p-6 rounded-2xl shadow-lg bg-white ${isActive
                                            ? "scale-100 -translate-y-8 blur-0 opacity-100"
                                            : "scale-90 blur-sm opacity-60"
                                        }`}
                                >
                                    <FaQuoteLeft className="text-primary text-2xl mb-3 text-center md:text-left" />
                                    <p className="text-gray-700 mb-6 text-center md:text-left">
                                        {t.review}
                                    </p>
                                    <div className="flex items-center gap-3 pt-4 border-t-2 border-dashed border-gray-300">
                                        <img
                                            src={t.user_photoURL}
                                            alt={t.userName}
                                            className="w-12 h-12 rounded-full"
                                        />
                                        <div className="text-left">
                                            <h4 className="font-semibold">{t.userName}</h4>
                                            <p className="text-sm text-gray-500">{t.user_email}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default ReviewsSection;
