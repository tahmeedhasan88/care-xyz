"use client"
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { FcGoogle } from 'react-icons/fc';
import Swal from 'sweetalert2';

const GoogleButton = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') ?? '/';

  const handleSignIn = async () => {
    const result = await signIn('google', {
      redirect: false,
      callbackUrl,
    });

    if (result?.ok) {
      await Swal.fire('Successful', 'Welcome to Care.xyz', 'success');
      window.location.href = callbackUrl;
      return;
    }

    Swal.fire('Error', 'Sorry. You need to try again!', 'error');
  };

  return (
    <div>
      <button
        type="button"
        onClick={handleSignIn}
        className="w-full border flex items-center justify-center gap-2 py-2 rounded-lg hover:bg-gray-100 transition"
      >
        <FcGoogle />
        <span className="text-sm font-medium text-gray-700">Continue with Google</span>
      </button>
    </div>
  );
};

export default GoogleButton;