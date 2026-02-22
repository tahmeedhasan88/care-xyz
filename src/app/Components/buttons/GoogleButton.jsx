"use client"
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import Swal from 'sweetalert2';

const GoogleButton = () => {

const searchParams = useSearchParams();


 const handleSignIn = async () => {
    
    const result = await signIn("google", {redirect: "false", callbackUrl:searchParams.get("callbackUrl") || "/",});
    console.log(result)
    if(result.ok){
        Swal.fire("Successful", "Welcome to Care.xyz", "success");
    }else{
        Swal.fire("Error", "Sorry. You need to try again!", "error");
    }
 };

    return (
        <div>

        <button onClick={handleSignIn} className="w-full border flex items-center justify-center gap-2 py-2 rounded-lg hover:bg-gray-100 transition">
          <FcGoogle></FcGoogle>
          <span className="text-sm font-medium text-gray-700">
            Continue with Google
          </span>
        </button>


        </div>
    );
};

export default GoogleButton;