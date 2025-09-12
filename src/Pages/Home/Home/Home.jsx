import React from 'react';
import Slider from '../Slider/Slider';
import HowItWorks from '../HowItWorks/HowItWorks';
import OurServices from '../OurServices/OurServices';
import LogosSection from '../LogosSection/LogosSection';
import FeatureSection from '../FeatureSection/FeatureSection';
import MerchantSection from '../MerchantSection/MerchantSection';
import ReviewsSection from '../ReviewsSection/ReviewsSection';

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
        </div>
    );
};

export default Home;