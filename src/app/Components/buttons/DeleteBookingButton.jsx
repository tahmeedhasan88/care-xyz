'use client';

import { useRouter } from 'next/navigation';
import { deleteBooking } from '@/app/Server/bookingActions';

export default function DeleteBookingButton({ bookingId }) {
  const router = useRouter();
  const handleDelete = async () => {
    const confirmed = window.confirm('Delete this booking permanently?');
    if (!confirmed) return;

    const formData = new FormData();
    formData.append('bookingId', bookingId);

    const result = await deleteBooking(formData);
    if (result.success) {
      alert(result.message);
      router.refresh();
      return;
    }

    alert(result.error ?? 'Deleting failed');
  };

  return (
    <button
      type="button"
      onClick={handleDelete}
      className="text-red-600 hover:text-red-800 text-xl font-bold hover:bg-red-50 px-2 py-1 rounded transition"
      title="Delete booking"
      aria-label="Delete booking"
    >
      ×
    </button>
  );
}