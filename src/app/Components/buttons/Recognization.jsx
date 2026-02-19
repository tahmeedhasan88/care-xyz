"use client"
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';

const Recognization = () => {

    const session = useSession();

    return (
<div>

            {
                session.status == "authenticated"?
                (<div className='flex flex-col lg:flex-row items-center mt-2 lg:mt-0'><button onClick={()=> signOut()} className="px-5 py-2 rounded-lg text-white font-semibold 
                bg-gradient-to-r from-[#10ac84] to-[#0abde3] 
                hover:from-[#0abde3] hover:to-[#10ac84] 
                transition-all duration-300 shadow-md hover:shadow-lg">Logout</button></div>):
                (<div className='flex flex-col items-center gap-2 mt-2 lg:gap-4 lg:flex-row'>

                <Link href={'/auth/login'}>
                <button className='text-white px-4 py-2 bg-[#0abde3] hover:bg-[#196677] rounded-[5px] font-semibold '>Login</button>
                </Link>

                <Link href={'/auth/register'}>
                <button className='text-white px-4 py-2 bg-[#10ac84] hover:bg-[#128166] rounded-[5px] font-semibold '>Signup</button>
                </Link>

                </div>)
            }


</div>
    );
};

export default Recognization;