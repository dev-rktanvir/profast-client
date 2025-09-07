import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import slider1 from '../../../assets/banner/banner1.png';
import slider2 from '../../../assets/banner/banner2.png';
import slider3 from '../../../assets/banner/banner3.png';

const Slider = () => {
    return (
        <div className='py-5 md:py-8 lg:py-16'>
            <Carousel autoPlay={true} infiniteLoop={true} showStatus={false} showThumbs={false}>
                <div>
                    <img src={slider1} />
                </div>
                <div>
                    <img src={slider2} />
                </div>
                <div>
                    <img src={slider3} />
                </div>
            </Carousel>
        </div>
    );
};

export default Slider;