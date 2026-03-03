import { getServerSession } from "next-auth/next";
import { authOptions } from "../lib/authOptions";
import { collection, dbConnect } from "../lib/dbConnects";
import DownloadButton from "../Components/buttons/DownloadButton";
import { cancelBooking, confirmBooking } from "../Server/bookingActions";

const DEFAULT_AVATAR = "/avatar.png";

export default async function MyBookings() {
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;

  if (!userEmail) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-10 text-center">
        <p className="text-gray-500">লগইন করুন বুকিং দেখার জন্য।</p>
      </div>
    );
  }

  const bookingsRaw = await dbConnect(collection.BOOKINGS)
    .find({})
    .sort({ createdAt: -1 })
    .toArray();

  const bookings = bookingsRaw.map((b) => ({
    ...b,
    _id: b._id.toString(),
    createdAt: b.createdAt?.toISOString?.() ?? null,
  }));

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">সকল বুকিং</h1>

      {bookings.length === 0 ? (
        <p className="text-center text-gray-500">কোনো বুকিং এখনো নেই।</p>
      ) : (
        <div className="grid gap-6">
          {bookings.map((booking) => {
            const isOwnBooking = booking.senderEmail === userEmail;
            const canCancel = isOwnBooking && booking.status === "pending";
            const canConfirm = !isOwnBooking && booking.status === "pending";

            return (
              <div
                key={booking._id}
                className="bg-white rounded-2xl shadow-md p-6 flex flex-col md:flex-row justify-between gap-6 border"
              >
                {/* Left part */}
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-20 h-20 rounded-full overflow-hidden border">
                      <img
                        src={booking.senderImage || DEFAULT_AVATAR}
                        alt="User"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="mt-3 font-semibold text-gray-800 text-center">
                      {booking.senderName}
                    </p>
                  </div>

                  <div>
                    <h2 className="text-lg font-semibold">
                      Booking ID: {booking._id}
                    </h2>
                    <h3 className="text-2xl font-bold text-[#0abde3] mt-1">
                      {booking.serviceName}
                    </h3>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 text-sm text-gray-700">
                      <div>
                        <p className="font-semibold">Duration Type:</p>
                        <p>{booking.durationType}</p>
                      </div>
                      <div>
                        <p className="font-semibold">Number of Hours:</p>
                        <p>{booking.durationValue}</p>
                      </div>
                      <div>
                        <p className="font-semibold">Service Area:</p>
                        <p>
                          Division: {booking.senderDivision} <br />
                          District: {booking.senderDistrict}
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold">Service Address:</p>
                        <p>
                          City: {booking.city} <br />
                          {booking.address}
                        </p>
                      </div>
                    </div>

                    <p className="mt-4 text-sm">
                      <span className="font-semibold">Special Note:</span>{" "}
                      {booking.note || "General assistance and check-in"}
                    </p>
                  </div>
                </div>

                {/* Right part */}
                <div className="flex flex-col justify-between items-end">
                  <p className="text-gray-500 text-sm">
                    {new Date(booking.createdAt).toLocaleString()}
                  </p>

                  <div
                    className={`px-4 py-1 rounded-full text-sm font-medium mt-3 ${
                      booking.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : booking.status === "confirmed"
                        ? "bg-blue-100 text-blue-800"
                        : booking.status === "cancelled"
                        ? "bg-red-100 text-red-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {booking.status === "pending"
                      ? "Pending"
                      : booking.status === "confirmed"
                      ? "Confirmed"
                      : booking.status === "cancelled"
                      ? "Cancelled"
                      : "Unknown"}
                  </div>

                  <div className="flex flex-col gap-2 mt-4">
                    <button className="bg-[#0abde3] text-white px-5 py-2 rounded-lg hover:opacity-90 transition">
                      View Details
                    </button>

                    <DownloadButton booking={booking} />

                    {canCancel && (
                      <form action={cancelBooking}>
                        <input type="hidden" name="bookingId" value={booking._id} />
                        <button
                          type="submit"
                          className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition"
                        >
                          Cancel Booking
                        </button>
                      </form>
                    )}

                    {canConfirm && (
                      <form action={confirmBooking}>
                        <input type="hidden" name="bookingId" value={booking._id} />
                        <button
                          type="submit"
                          className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition"
                        >
                          Confirm Booking
                        </button>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}