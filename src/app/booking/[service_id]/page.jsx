"use client";

import React, { useEffect, useState, use } from "react";
import { getSingleService } from "@/app/Server/service";
import divisions from "@/app/data/divisions";
import districts from "@/app/data/districts";
import { useForm } from "react-hook-form";

const BookingPage = ({ params }) => {
  const resolvedParams = use(params);
  const { service_id } = resolvedParams;

  const { register, watch } = useForm();

  const senderDivision = watch("senderDivision");

  const districtByDivision = (divisionName) => {
    if (!divisionName) return [];

    // find division id by name
    const division = divisions.find(
      (d) => d.name === divisionName
    );

    if (!division) return [];

    // filter districts by division_id
    return districts
      .filter(
        (dist) => dist.division_id === division.id
      )
      .map((dist) => dist.name);
  };

  const [service, setService] = useState(null);
  const [durationType, setDurationType] = useState("hourly");
  const [durationValue, setDurationValue] = useState(1);
  const [totalCost, setTotalCost] = useState(0);

  // Fetch service
  useEffect(() => {
    if (!service_id) return;

    const loadService = async () => {
      const data = await getSingleService(service_id);
      setService(data);
    };

    loadService();
  }, [service_id]);

  // Cost calculation
  useEffect(() => {
    if (!service) return;

    const price =
      durationType === "hourly"
        ? service?.price?.hourly ?? 0
        : service?.price?.daily ?? 0;

    setTotalCost(price * durationValue);
  }, [durationType, durationValue, service]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">
        Booking: {service?.name}
      </h1>

      {/* Duration */}
      <div className="mb-6">
        <label className="font-semibold">Duration Type</label>
        <select
          value={durationType}
          onChange={(e) => setDurationType(e.target.value)}
          className="w-full mt-2 border p-2 rounded"
        >
          <option value="hourly">Hourly</option>
          <option value="daily">Daily</option>
        </select>
      </div>

      <div className="mb-6">
        <label className="font-semibold">
          Number of {durationType === "hourly" ? "Hours" : "Days"}
        </label>
        <input
          type="number"
          min="1"
          value={durationValue}
          onChange={(e) => setDurationValue(Number(e.target.value))}
          className="w-full mt-2 border p-2 rounded"
        />
      </div>

      {/* Location */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Division */}
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Division</legend>
          <select
            {...register("senderDivision")}
            defaultValue=""
            className="select"
          >
            <option disabled value="">
              Pick a division
            </option>
            {divisions.map((d) => (
              <option key={d.id} value={d.name}>
                {d.name}
              </option>
            ))}
          </select>
        </fieldset>

        {/* District */}
        <fieldset className="fieldset">
          <legend className="fieldset-legend">District</legend>
          <select
            {...register("senderDistrict")}
            defaultValue=""
            className="select"
          >
            <option disabled value="">
              Pick a district
            </option>
            {districtByDivision(senderDivision).map((d, i) => (
              <option key={i} value={d}>
                {d}
              </option>
            ))}
          </select>
        </fieldset>


        <input
          placeholder="City"
          className="border p-2 rounded"
          onChange={(e) =>
            setLocation({ ...location, city: e.target.value })
          }
        />
        <input
          placeholder="Full Address"
          className="border p-2 rounded"
          onChange={(e) =>
            setLocation({ ...location, address: e.target.value })
          }
        />


      </div>

      {/* Total Cost */}
      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <p className="font-semibold">Total Cost</p>
        <p className="text-xl font-bold text-[#0abde3]">
          ৳ {totalCost}
        </p>
      </div>

      <button className="w-full bg-[#10ac84] text-white py-3 rounded-lg font-semibold">
        Confirm Booking
      </button>
    </div>
  );
};

export default BookingPage;
