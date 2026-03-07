// app/Server/bookingActions.js
'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '../lib/authOptions';
import { ObjectId } from 'mongodb';
import { revalidatePath } from 'next/cache';
import { collection, dbConnect } from '../lib/dbConnects';

const { Resend } = require('resend');

export async function cancelBooking(formData) {
  try {
    const bookingId = formData.get('bookingId');

    if (!bookingId) {
      return { success: false, error: 'Booking ID is required' };
    }

    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return { success: false, error: 'You must be logged in' };
    }

    const db = await dbConnect(collection.BOOKINGS);

    const booking = await db.findOne({ _id: new ObjectId(bookingId) });
    if (!booking) {
      return { success: false, error: 'Booking not found' };
    }

    if (booking.senderEmail !== session.user.email) {
      return { success: false, error: 'You can only cancel your own booking' };
    }

    if (booking.status !== 'pending') {
      return { success: false, error: 'Only pending bookings can be cancelled' };
    }

    const result = await db.updateOne(
      { _id: new ObjectId(bookingId) },
      { $set: { status: 'cancelled', updatedAt: new Date() } }
    );

    if (result.modifiedCount === 0) {
      return { success: false, error: 'Failed to update booking status' };
    }

    revalidatePath('/my-bookings');

    return { success: true, message: 'Booking cancelled successfully' };
  } catch (error) {
    console.error('Cancel booking error:', error);
    return { success: false, error: 'Something went wrong. Please try again.' };
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
      return { success: false, error: 'You must be logged in' };
    }

    const db = await dbConnect(collection.BOOKINGS);

    const booking = await db.findOne({ _id: new ObjectId(bookingId) });
    if (!booking) {
      return { success: false, error: 'Booking not found' };
    }

    if (booking.status !== 'pending') {
      return { success: false, error: 'Only pending bookings can be confirmed' };
    }

    const result = await db.updateOne(
      { _id: new ObjectId(bookingId) },
      { $set: { status: 'confirmed', updatedAt: new Date() } }
    );

    if (result.modifiedCount === 0) {
      return { success: false, error: 'Failed to update booking status' };
    }

   
   // Send confirmation email using Brevo SMTP
        try {
        const nodemailer = require('nodemailer');

        if (!process.env.BREVO_SMTP_USER || !process.env.BREVO_SMTP_PASS) {
            console.warn('Brevo SMTP credentials missing — email not sent');
        } else {
            const transporter = nodemailer.createTransport({
            host: process.env.BREVO_SMTP_HOST || 'smtp-relay.brevo.com',
            port: Number(process.env.BREVO_SMTP_PORT) || 587,
            secure: false, 
            auth: {
                user: process.env.BREVO_SMTP_USER,
                pass: process.env.BREVO_SMTP_PASS,
            },
            });

            const mailOptions = {
            from: '"Care.xyz" <hasantahmeed416@gmail.com>',
            to: booking.senderEmail,
            subject: 'Your Booking Has Been Confirmed - Care.xyz',
            html: `
                <div style="font-family: Arial, Helvetica, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #ffffff; border: 1px solid #e0e0e0; border-radius: 8px;">
                <h1 style="color: #0abde3; text-align: center; margin-bottom: 10px;">Invoice of Care.xyz</h1>
                
                <p style="text-align: center; color: #555; font-size: 14px;">
                    <strong>Confirmed by:</strong> ${session.user.email}
                </p>
                
                <hr style="border: 1px solid #eee; margin: 20px 0;" />
                
                <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                    <tr>
                    <td style="padding: 8px; font-weight: bold; width: 150px;">Service:</td>
                    <td style="padding: 8px;">${booking.serviceName}</td>
                    </tr>
                    <tr>
                    <td style="padding: 8px; font-weight: bold;">Duration:</td>
                    <td style="padding: 8px;">${booking.durationValue} ${booking.durationType}</td>
                    </tr>
                    <tr>
                    <td style="padding: 8px; font-weight: bold;">Total Cost:</td>
                    <td style="padding: 8px;">৳${booking.totalCost.toLocaleString()}</td>
                    </tr>
                    <tr>
                    <td style="padding: 8px; font-weight: bold;">Location:</td>
                    <td style="padding: 8px;">
                        ${booking.city}, ${booking.address}<br />
                        Division: ${booking.senderDivision}<br />
                        District: ${booking.senderDistrict}
                    </td>
                    </tr>
                    ${booking.note ? `
                    <tr>
                        <td style="padding: 8px; font-weight: bold;">Special Note:</td>
                        <td style="padding: 8px;">${booking.note}</td>
                    </tr>
                    ` : ''}
                </table>
                
                <hr style="border: 1px solid #eee; margin: 20px 0;" />
                
                <p style="text-align: center; color: #777; font-size: 13px;">
                    Booking ID: ${booking._id.toString()}<br />
                    Created: ${new Date(booking.createdAt).toLocaleString()}<br /><br />
                    Thank you for using Care.xyz!
                </p>
                </div>
            `,
            };

            const info = await transporter.sendMail(mailOptions);
            console.log('Brevo confirmation email sent to:', booking.senderEmail, 'Message ID:', info.messageId);
        }
        } catch (emailError) {
        console.error('Brevo email sending failed (non-critical):', emailError);
        // Email fail হলেও confirm সফল হবে
        }

    revalidatePath('/my-bookings');

    return { success: true, message: 'Booking confirmed successfully' };
  } catch (error) {
    console.error('Confirm error:', error);
    return { success: false, error: 'Something went wrong. Please try again.' };
  }
}

export async function deleteBooking(formData) {
  try {
    const bookingId = formData.get('bookingId');

    if (!bookingId) {
      return { success: false, error: 'Booking ID is required' };
    }

    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return { success: false, error: 'You must be logged in' };
    }

    const db = await dbConnect(collection.BOOKINGS);

    const booking = await db.findOne({ _id: new ObjectId(bookingId) });
    if (!booking) {
      return { success: false, error: 'Booking not found' };
    }

    if (booking.senderEmail !== session.user.email) {
      return { success: false, error: 'This is not your booking' };
    }

    const result = await db.deleteOne({ _id: new ObjectId(bookingId) });

    if (result.deletedCount === 0) {
      return { success: false, error: 'Failed to delete booking' };
    }

    revalidatePath('/my-bookings');

    return { success: true, message: 'Booking deleted successfully' };
  } catch (error) {
    console.error('Delete booking error:', error);
    return { success: false, error: 'Something went wrong. Please try again.' };
  }
}