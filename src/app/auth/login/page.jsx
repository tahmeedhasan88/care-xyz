"use client"
import GoogleButton from "@/app/Components/buttons/GoogleButton";
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter, useSearchParams } from "next/navigation";
import Swal from "sweetalert2";

const Login = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') ?? '/';

  const handleSubmit = async (e) => {

   e.preventDefault();

    const form = e.target;

    const email = form.email.value;
    const password = form.password.value;

    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
      callbackUrl,
    });

    if (!result?.ok) {
      Swal.fire('Error', 'Email and password do not match', 'error');
      return;
    }

    await Swal.fire('Successful', 'Welcome to Care.xyz', 'success');
    router.push(callbackUrl);
  };



    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f5f7fa] px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white rounded-xl shadow-[#1f3b4d] shadow-lg p-6 md:p-8">
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
            name='email'
            placeholder="Enter your email"
            required
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
            placeholder="Enter your password"
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#1f3b4d] outline-none text-black"
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
        <GoogleButton />

        <h4 className='text-sm text-center mt-3'>Don't have an account? <Link href="/auth/register"><span className='text-[#1f3b4d] font-semibold'>Register</span></Link></h4>
      </form>
    </div>
  );
};

export default Login;