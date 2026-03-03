'use client';

import { deleteBooking } from "@/app/Server/bookingActions";



export default function DeleteBookingButton({ bookingId }) {
  const handleDelete = async () => {
    if (!confirm("Are you sure? This booking will delete permanently")) {
      return;
    }

    const formData = new FormData();
    formData.append('bookingId', bookingId);

    const result = await deleteBooking(formData);

    if (result.success) {
      alert(result.message);
      window.location.reload(); 
    } else {
      alert(result.error || "Deleting Failed");
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="text-red-600 hover:text-red-800 text-xl font-bold hover:bg-red-50 px-2 py-1 rounded transition"
      title="Delete Booking"
    >
      ×
    </button>
  );
}