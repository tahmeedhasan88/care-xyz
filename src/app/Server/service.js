// app/Server/service.js   ← এই ফাইলেই রাখো (অথবা actions.js যেখানে সার্ভার অ্যাকশন রাখো)

"use server";

const { dbConnect, collection } = require("../lib/dbConnects");

export const getSingleService = async (slug) => {
  if (!slug || typeof slug !== "string" || slug.trim() === "") {
    console.log("No valid slug:", slug);
    return null;
  }

  try {
    const service = await dbConnect(collection.SERVICES).findOne({
      slug: slug.trim(),
    });

    return service || null;
  } catch (error) {
    console.error("getSingleService error:", error);
    return null;
  }
};

// ------------------ নতুন ফাংশন যোগ করো এখানে ------------------
export const createBooking = async (formData) => {
  try {
    // formData থেকে সব ডাটা নেওয়া
    const booking = {
      serviceId: formData.get("serviceId"),
      serviceName: formData.get("serviceName"),
      serviceSlug: formData.get("serviceSlug"),
      durationType: formData.get("durationType"),
      durationValue: Number(formData.get("durationValue")),
      senderDivision: formData.get("senderDivision"),
      senderDistrict: formData.get("senderDistrict"),
      city: formData.get("city"),
      address: formData.get("address"),
      totalCost: Number(formData.get("totalCost")),
      createdAt: new Date(),
      status: "pending",           // পরে চাইলে confirmed, cancelled ইত্যাদি করতে পারো
      // userId: ... যদি লগইন সিস্টেম থাকে তাহলে যোগ করো
    };

    // MongoDB-তে insert
    const result = await dbConnect(collection.BOOKINGS || "bookings").insertOne(booking);

    if (!result.insertedId) {
      throw new Error("Insert failed - no insertedId returned");
    }

    return {
      success: true,
      message: "Booking successful!",
      bookingId: result.insertedId.toString(),
    };
  } catch (error) {
    console.error("createBooking error:", error);
    return {
      success: false,
      message: error.message || "Failed to save booking. Please try again.",
    };
  }
};