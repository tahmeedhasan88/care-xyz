// app/my-bookings/page.jsx

import { collection, dbConnect } from "../lib/dbConnects";



export default async function MyBookings() {
  const bookings = await dbConnect(collection.BOOKINGS)
    .find({})
    .sort({ createdAt: -1 })
    .toArray();

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">My Bookings</h1>

      {bookings.length === 0 ? (
        <p className="text-center text-gray-500">No bookings yet.</p>
      ) : (
        <div className="grid gap-6">
          {bookings.map((booking) => (
            <div
              key={booking._id.toString()}
              className="border rounded-lg p-6 shadow-sm bg-white"
            >
              <h2 className="text-xl font-semibold">{booking.serviceName}</h2>

              <p className="text-gray-600 mt-1">
                {booking.durationValue}{" "}
                {booking.durationType === "hourly" ? "hour(s)" : "day(s)"}
              </p>

              <p className="mt-2">
                <strong>Location:</strong> {booking.senderDivision} →{" "}
                {booking.senderDistrict}, {booking.city}
              </p>

              <p>
                <strong>Address:</strong> {booking.address}
              </p>

              <p className="text-lg font-bold mt-3 text-[#0abde3]">
                Total: ৳ {Number(booking.totalCost).toLocaleString()}
              </p>

              <p className="text-sm text-gray-500 mt-1">
                Booked on: {new Date(booking.createdAt).toLocaleString()}
              </p>

              <p
                className={`mt-2 inline-block px-3 py-1 rounded-full text-sm font-medium ${
                  booking.status === "pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-green-100 text-green-800"
                }`}
              >
                Status: {booking.status}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}