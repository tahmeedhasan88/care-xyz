import Link from 'next/link';
import React from 'react';

const Logo = () => {
    return (
        <Link href={'/'}>
        <div className='flex items-center justify-center'>
            <img className='w-[40px] lg:w-[70px]' src='/logo.png'></img>
            <h2 className='font-bold text-xl lg:text-3xl'>Care.xyz</h2>
        </div>
        </Link>
    );
};

export default Logo;