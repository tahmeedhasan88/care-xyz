import React from 'react';
import Logo from './Layouts/Logo';
import NavLink from './buttons/NavLink';
import Link from 'next/link';

const Navbar = () => {

const nav = <div className='flex flex-col lg:flex-row items-center gap-4 text-[16px] font-semibold'>
                <li><NavLink href={"/"}>Home</NavLink></li>
                <li>About</li>
                <li><NavLink href={"/my-bookings"}>My Bookings</NavLink></li>
            </div>


const recognizationButton = <div className='flex flex-col items-center gap-2 mt-2 lg:gap-4 lg:flex-row'>

                            <Link href={'/auth/login'}>
                            <button className='text-white px-4 py-2 bg-[#0abde3] hover:bg-[#196677] rounded-[5px] font-semibold '>Login</button>
                            </Link>

                            <Link href={'/auth/register'}>
                            <button className='text-white px-4 py-2 bg-[#10ac84] hover:bg-[#128166] rounded-[5px] font-semibold '>Signup</button>
                            </Link>

                            </div>

    return (
        <div>
            
        <div className="navbar bg-[#2C3A47] text-white lg:px-10 relative z-50">
        <div className="navbar-start">
        <div className="dropdown">
        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
        </div>
        <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-white text-black rounded-box z-50  mt-3 w-52 p-2 shadow">
        {nav}
        {recognizationButton}
        </ul>
        </div>
        <Logo></Logo>
        </div>
        <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
        {nav}
        </ul>
        </div>
        <div className="navbar-end lg:flex hidden">
        {recognizationButton}
        </div>
        </div>


        </div>
    );
};

export default Navbar;