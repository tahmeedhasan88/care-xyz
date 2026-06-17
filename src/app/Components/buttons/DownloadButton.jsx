"use client"
import { PDFDownloadLink } from '@react-pdf/renderer';
import { FaFilePdf } from "react-icons/fa6";
import BookingPDF from '../DownloadPDF';




export default function DownloadButton({ booking }) {
  const fileName = `Booking_${booking._id.toString().slice(0, 8)}.pdf`;

  return (


    <PDFDownloadLink
      document={<BookingPDF booking={booking} />}
      fileName={fileName}
    >


      {({ blob, url, loading, error }) =>
        loading ? (
          <button
            type="button"
            disabled
            className="bg-gray-400 text-white px-5 py-2 rounded-lg cursor-not-allowed"
          >
            Generating...
          </button>
        ) : (
          <button type="button" className="bg-gray-600 text-white px-5 py-2 rounded-lg hover:bg-black transition flex items-center gap-1">
            <FaFilePdf /> Download
          </button>
        )
      }
    </PDFDownloadLink>
  );
}