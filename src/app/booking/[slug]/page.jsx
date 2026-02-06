// app/booking/[slug]/page.jsx
"use client";

import React, { useState, useEffect } from "react";
import divisions from "@/app/data/divisions";
import districts from "@/app/data/districts";
import { useForm, useWatch } from "react-hook-form";
import { getSingleService, createBooking } from "@/app/Server/service";
import { useParams } from "next/navigation";
import Loading from "./Loading"; // তোমার Loading কম্পোনেন্ট
import Swal from "sweetalert2";

const BookingPage = () => {
  const params = useParams();
  const slug = params?.slug;

  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) {
      setError("No service slug provided in URL");
      setLoading(false);
      return;
    }

    const fetchService = async () => {
      try {
        console.log("Fetching service for slug:", slug);
        const data = await getSingleService(slug);

        if (!data) {
          setError("Service not found in database");
        } else {
          setService(data);
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to load service");
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [slug]);

  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      durationType: "hourly",
      durationValue: 1,
      senderDivision: "",
      senderDistrict: "",
      city: "",
      address: "",
    },
  });

  const durationType = watch("durationType");
  const durationValue = watch("durationValue") || 1;

  const totalCost = service
    ? durationType === "hourly"
      ? service.price?.hourly * durationValue
      : service.price?.daily * durationValue
    : 0;

  const inputClass =
    "w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#10ac84]";

  const districtByDivision = (divisionName) => {
    if (!divisionName) return [];
    const division = divisions.find((d) => d.name === divisionName);
    if (!division) return [];
    return districts
      .filter((dist) => dist.division_id === division.id)
      .map((dist) => dist.name);
  };

  const senderDivision = watch("senderDivision");

  const onSubmit = async (data) => {
    const confirm = await Swal.fire({
      title: "Confirm Booking?",
      html: `
        Service: <b>${service.name}</b><br>
        Duration: <b>${data.durationValue} ${data.durationType}</b><br>
        Location: <b>${data.senderDivision}, ${data.senderDistrict}, ${data.city}</b><br>
        Address: <b>${data.address}</b><br><br>
        <b style="font-size:1.4rem;color:#0abde3">Total: ৳${totalCost.toLocaleString()}</b>
      `,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#10ac84",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Book Now",
    });

    if (!confirm.isConfirmed) return;

    Swal.fire({
      title: "Processing...",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    const formData = new FormData();
    formData.append("serviceId", service._id);
    formData.append("serviceName", service.name);
    formData.append("serviceSlug", slug);
    formData.append("durationType", data.durationType);
    formData.append("durationValue", data.durationValue);
    formData.append("senderDivision", data.senderDivision);
    formData.append("senderDistrict", data.senderDistrict);
    formData.append("city", data.city);
    formData.append("address", data.address);
    formData.append("totalCost", totalCost);

    const response = await createBooking(formData);

    Swal.close();

    if (response?.success) {
      Swal.fire("Success!", "Booking confirmed", "success");
      // চাইলে রিডাইরেক্ট করতে পারো: window.location.href = "/my-bookings";
    } else {
      Swal.fire("Error", response?.message || "Something went wrong", "error");
    }
  };

  if (loading) return <div className="py-20 text-center"><Loading /></div>;

  if (error || !service) {
    return (
      <div className="py-20 text-center text-red-600">
        {error || "Service not found"}
        <br />
        <small>Slug: {slug || "not received"}</small>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Booking: {service.name}</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Duration Type */}
        <div className="mb-6">
          <label className="font-semibold block mb-1">Duration Type</label>
          <select {...register("durationType")} className={inputClass}>
            <option value="hourly">Hourly</option>
            <option value="daily">Daily</option>
          </select>
        </div>

        {/* Duration Value */}
        <div className="mb-6">
          <label className="font-semibold block mb-1">
            Number of {durationType === "hourly" ? "Hours" : "Days"}
          </label>
          <input
            type="number"
            min="1"
            {...register("durationValue", { valueAsNumber: true })}
            className={inputClass}
          />
        </div>

        {/* Location */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="font-semibold block mb-1">Division</label>
            <select {...register("senderDivision")} className={inputClass}>
              <option value="">Pick a division</option>
              {divisions.map((d) => (
                <option key={d.id} value={d.name}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-semibold block mb-1">District</label>
            <select {...register("senderDistrict")} className={inputClass}>
              <option value="">Pick a district</option>
              {districtByDivision(senderDivision).map((d, i) => (
                <option key={i} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-semibold block mb-1">City</label>
            <input {...register("city")} className={inputClass} />
          </div>

          <div>
            <label className="font-semibold block mb-1">Full Address</label>
            <input {...register("address")} className={inputClass} />
          </div>
        </div>

        {/* Total Cost */}
        <div className="bg-gray-100 p-6 rounded-lg mb-8">
          <p className="font-semibold text-lg">Total Cost</p>
          <p className="text-3xl font-bold text-[#0abde3] mt-1">
            ৳ {totalCost.toLocaleString()}
          </p>
          <p className="text-sm text-gray-600 mt-1">
            {durationValue} {durationType} × ৳
            {durationType === "hourly" ? service.price.hourly : service.price.daily}
          </p>
        </div>

        <button
          type="submit"
          className="w-full bg-[#10ac84] text-white py-4 rounded-lg font-semibold hover:opacity-90 transition text-lg"
        >
          Confirm Booking
        </button>
      </form>
    </div>
  );
};

export default BookingPage;