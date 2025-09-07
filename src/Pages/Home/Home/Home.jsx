import React from 'react';
import Slider from '../Slider/Slider';
import HowItWorks from '../HowItWorks/HowItWorks';
import OurServices from '../OurServices/OurServices';
import LogosSection from '../LogosSection/LogosSection';
import FeatureSection from '../FeatureSection/FeatureSection';

const Home = () => {
    return (
        <div>
            <Slider></Slider>
            <HowItWorks></HowItWorks>
            <OurServices></OurServices>
            <LogosSection></LogosSection>
            <FeatureSection></FeatureSection>
        </div>
    );
};

export default Home;