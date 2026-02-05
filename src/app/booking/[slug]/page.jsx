"use client";

import React, { useState, useEffect } from "react";
import divisions from "@/app/data/divisions";
import districts from "@/app/data/districts";
import { useForm, useWatch } from "react-hook-form";
import { getSingleService } from "@/app/Server/service"; // server action
import { useParams } from "next/navigation"; // slug পাওয়ার জন্য

const BookingPage = () => {
  const params = useParams();
  const slug = params?.slug; // dynamic route থেকে slug নিচ্ছি (/booking/[slug])

  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  // Service ডাটা লোড করা
  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }

    const fetchService = async () => {
      try {
        const data = await getSingleService(slug);
        setService(data);
      } catch (err) {
        console.error("Service fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [slug]);

  const { register, watch, control } = useForm({
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
  const durationValue = watch("durationValue");

  // Total cost calculate
  const totalCost = (() => {
    if (!service?.price || !durationValue || durationValue < 1) return 0;

    const pricePerUnit =
      durationType === "hourly" ? service.price.hourly : service.price.daily;

    return pricePerUnit * Number(durationValue);
  })();

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

  if (loading) {
    return <div className="py-20 text-center">Loading service details...</div>;
  }

  if (!service || Object.keys(service).length === 0) {
    return <div className="py-20 text-center">Service not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">
        Booking: {service?.name || "Service"}
      </h1>

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
            <option value="" disabled>
              Pick a division
            </option>
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
            <option value="" disabled>
              Pick a district
            </option>
            {districtByDivision(senderDivision).map((d, i) => (
              <option key={i} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="font-semibold block mb-1">City</label>
          <input
            placeholder="City"
            {...register("city")}
            className={inputClass}
          />
        </div>

        <div>
          <label className="font-semibold block mb-1">Full Address</label>
          <input
            placeholder="Full Address"
            {...register("address")}
            className={inputClass}
          />
        </div>
      </div>

      {/* Total Cost */}
      <div className="bg-gray-100 p-6 rounded-lg mb-8">
        <p className="font-semibold text-lg">Total Cost</p>
        <p className="text-3xl font-bold text-[#0abde3] mt-1">
          ৳ {totalCost.toLocaleString()}
        </p>
        <p className="text-sm text-gray-600 mt-1">
          {durationValue} {durationType === "hourly" ? "hour" : "day"}(s) × ৳
          {durationType === "hourly"
            ? service.price.hourly
            : service.price.daily}{" "}
          per {durationType === "hourly" ? "hour" : "day"}
        </p>
      </div>

      <button className="w-full bg-[#10ac84] text-white py-4 rounded-lg font-semibold hover:opacity-90 transition text-lg">
        Confirm Booking
      </button>
    </div>
  );
};

export default BookingPage;