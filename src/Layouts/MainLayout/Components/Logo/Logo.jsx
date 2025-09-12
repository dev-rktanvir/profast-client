import React from 'react';
import logoImg from '../../../../assets/logo.png';
import { Link } from 'react-router';

const Logo = () => {
    return (
        <Link to='/'>
            <div className='flex items-end'>
                <img className='mb-2' src={logoImg} alt="" />
                <h2 className='text-3xl font-extrabold -ml-4'>Profast</h2>
            </div>
        </Link>
    );
};

export default Logo;