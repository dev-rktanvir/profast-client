import React from 'react';
import Slider from '../Slider/Slider';
import HowItWorks from '../HowItWorks/HowItWorks';
import OurServices from '../OurServices/OurServices';
import LogosSection from '../LogosSection/LogosSection';
import FeatureSection from '../FeatureSection/FeatureSection';
import MerchantSection from '../MerchantSection/MerchantSection';
import ReviewsSection from '../ReviewsSection/ReviewsSection';
import FAQSection from '../FAQSection/FAQSection';

const Home = () => {
    return (
        <div>
            <Slider></Slider>
            <HowItWorks></HowItWorks>
            <OurServices></OurServices>
            <LogosSection></LogosSection>
            <FeatureSection></FeatureSection>
            <MerchantSection></MerchantSection>
            <ReviewsSection></ReviewsSection>
            <FAQSection></FAQSection>
        </div>
    );
};

export default Home;