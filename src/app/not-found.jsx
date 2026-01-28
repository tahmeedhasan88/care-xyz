import React from 'react';
import { GiTerror } from "react-icons/gi";
import { TfiReload } from "react-icons/tfi";

const Error404 = () => {
    return (
        <div className='flex flex-col justify-center items-center text-[#2C3A47] my-50 lg:my-60 gap-2'>
            <GiTerror className='size-20 lg:size-40'></GiTerror>
            <h1 className='text-2xl lg:text-3xl font-bold'>Page Not Found!!</h1>
           <div className='flex gap-2 items-center justify-center text-black font-semibold'> <h3>Please Try Again</h3><TfiReload className='animate-spin'></TfiReload></div>
        </div>
    );
};

export default Error404;