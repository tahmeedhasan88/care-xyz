'use server';

import { getServerSession } from 'next-auth';
import { ObjectId } from 'mongodb';
import { revalidatePath } from 'next/cache';
import { collection, dbConnect } from '../lib/dbConnects';
import { authOptions } from '../lib/authOptions';

export async function cancelBooking(formData) {
  try {
    const bookingId = formData.get('bookingId');

    if (!bookingId) {
      return { success: false, error: 'Booking ID is required' };
    }

    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return { success: false, error: 'লগইন করা আবশ্যক' };
    }

    const db = await dbConnect(collection.BOOKINGS);

    const booking = await db.findOne({ _id: new ObjectId(bookingId) });
    if (!booking) {
      return { success: false, error: 'বুকিং পাওয়া যায়নি' };
    }

    if (booking.senderEmail !== session.user.email) {
      return { success: false, error: 'শুধুমাত্র নিজের বুকিং ক্যানসেল করতে পারবেন' };
    }

    if (booking.status !== 'pending') {
      return { success: false, error: 'শুধুমাত্র Pending বুকিং ক্যানসেল করা যাবে' };
    }

    const result = await db.updateOne(
      { _id: new ObjectId(bookingId) },
      { $set: { status: 'cancelled', updatedAt: new Date() } }
    );

    if (result.modifiedCount === 0) {
      return { success: false, error: 'স্ট্যাটাস আপডেট করা যায়নি' };
    }

    revalidatePath('/my-bookings');

    return { success: true, message: 'বুকিং ক্যানসেল করা হয়েছে' };
  } catch (error) {
    console.error('Cancel error:', error);
    return { success: false, error: 'কিছু সমস্যা হয়েছে। আবার চেষ্টা করুন।' };
  }
}

export async function confirmBooking(formData) {
  try {
    const bookingId = formData.get('bookingId');

    if (!bookingId) {
      return { success: false, error: 'Booking ID is required' };
    }

    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return { success: false, error: 'লগইন করা আবশ্যক' };
    }

    const db = await dbConnect(collection.BOOKINGS);

    const booking = await db.findOne({ _id: new ObjectId(bookingId) });
    if (!booking) {
      return { success: false, error: 'বুকিং পাওয়া যায়নি' };
    }



    if (booking.status !== 'pending') {
      return { success: false, error: 'শুধুমাত্র Pending বুকিং কনফার্ম করা যাবে' };
    }

    const result = await db.updateOne(
      { _id: new ObjectId(bookingId) },
      { $set: { status: 'confirmed', updatedAt: new Date() } }
    );

    if (result.modifiedCount === 0) {
      return { success: false, error: 'স্ট্যাটাস আপডেট করা যায়নি' };
    }

    revalidatePath('/my-bookings');

    return { success: true, message: 'বুকিং কনফার্ম করা হয়েছে' };
  } catch (error) {
    console.error('Confirm error:', error);
    return { success: false, error: 'কিছু সমস্যা হয়েছে। আবার চেষ্টা করুন।' };
  }
}