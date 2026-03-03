"use client"
import GoogleButton from '@/app/Components/buttons/GoogleButton';
import { postUser } from '@/app/Server/auth';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import Swal from 'sweetalert2';


const Register = () => {

const router = useRouter();
const searchParams = useSearchParams();
const callbackUrl = searchParams.get("callBackUrl") || "/";

const handleSubmit = async (e) => {
  e.preventDefault();

  const form = e.target;

  const formData = {
    name: form.name.value,
    email: form.email.value,
    password: form.password.value,
  };

  const result = await postUser(formData);

  if (result.acknowledged) {
  
    await Swal.fire({
      title: 'Successful!',
      text: 'Account creation completed! Login processing...',
      icon: 'success',
      timer: 2000, 
      showConfirmButton: false,
      allowOutsideClick: false,
    });

   
    const signInResult = await signIn("credentials", {
      email: formData.email,
      password: formData.password,      
      redirect: false,                   
      callbackUrl: callbackUrl,
    });

    if (signInResult?.error) {
      
      await Swal.fire({
        title: 'Login Failed',
        text: signInResult.error,
        icon: 'error',
        confirmButtonText: 'Okay',
        confirmButtonColor: '#1f3b4d',
      });
    } else if (signInResult?.ok) {
      await Swal.fire({
        title: 'Welcome',
        text: 'Login Successfully',
        icon: 'success',
        timer: 1800,
        showConfirmButton: false,
      });

      router.push(callbackUrl || '/'); 
    }
  } else {
  
    await Swal.fire({
      title: 'Sorry!',
      text: 'Something went wrong. Try again later!!',
      icon: 'error',
      confirmButtonText: 'Try Again',
    });
  }
};




    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f5f7fa] px-4 ">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white rounded-xl p-6 md:p-8 shadow-[#1f3b4d] shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Create an Account
        </h2>

        {/* Full Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Full Name
          </label>
          <input
            type="text"
            name='name'
            required
            placeholder="Enter your full name"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#1f3b4d] outline-none text-black"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Email
          </label>
          <input
            type="email"
            name='email'
            required
            placeholder="Enter your email"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#1f3b4d] outline-none text-black"
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Password
          </label>
          <input
            type="password"
            name='password'
            required
            placeholder="Create a password"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#1f3b4d] outline-none text-black"
          />
        </div>

        {/* Register Button */}
        <button className="w-full bg-[#1f3b4d] text-white py-2 rounded-lg font-semibold hover:bg-[#162c3a] transition">
          Register
        </button>

        {/* Divider */}
        <div className="flex items-center my-4">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="px-3 text-sm text-gray-500">OR</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* Google Register */}
        <GoogleButton></GoogleButton>
        <h4 className='text-sm text-center mt-3'>Already have an account? <Link href={"/auth/login"}><span className='text-[#1f3b4d] font-semibold'>Login</span></Link></h4>
      </form>
      
    </div>
    );
};

export default Register;