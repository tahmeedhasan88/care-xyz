// app/Server/service.js   ← এই ফাইলেই রাখো (অথবা actions.js যেখানে সার্ভার অ্যাকশন রাখো)

"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../lib/authOptions";

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
//---------------------------------------------------

export async function POST(req) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  return Response.json({ email: session.user.email });
}

// ------------------ নতুন ফাংশন যোগ করো এখানে ------------------
export const createBooking = async (formData) => {
  try {

    const session = await getServerSession(authOptions);

    if (!session) {
      return { success: false, message: "Unauthorized" };
    }
    // formData থেকে সব ডাটা নেওয়া
    const booking = {
      serviceId: formData.get("serviceId"),
       senderName: session.user.name, 
      senderEmail: session.user.email,
      senderImage: session.user.image, 
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
      status: "pending",          
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