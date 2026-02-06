import Link from 'next/link';
import React from 'react';
import { FcGoogle } from "react-icons/fc";

const Login = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f5f7fa] px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-[#1f3b4d] shadow-lg p-6 md:p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login to Care.xyz
        </h2>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#1f3b4d] outline-none"
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#1f3b4d] outline-none"
          />
        </div>

        {/* Login Button */}
        <button className="w-full bg-[#1f3b4d] text-white py-2 rounded-lg font-semibold hover:bg-[#162c3a] transition">
          Login
        </button>

        {/* Divider */}
        <div className="flex items-center my-4">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="px-3 text-sm text-gray-500">OR</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* Google Login */}
        <button className="w-full border flex items-center justify-center gap-2 py-2 rounded-lg hover:bg-gray-100 transition">
          <FcGoogle></FcGoogle>
          <span className="text-sm font-medium text-gray-700">
            Continue with Google
          </span>
        </button>
    
        <h4 className='text-sm text-center mt-3'>Didn't have an account? <Link href={"/auth/register"}><span className='text-[#1f3b4d] font-semibold'>Register</span></Link></h4>
      </div>
    </div>
    );
};

export default Login;