import React from 'react';
import logoImg from '../../../../assets/logo.png';

const Logo = () => {
    return (
        <div className='flex items-end'>
            <img className='mb-2' src={logoImg} alt="" />
            <h2 className='text-3xl font-extrabold -ml-3'>Profast</h2>
        </div>
    );
};

export default Logo;