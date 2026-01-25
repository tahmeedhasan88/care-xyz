"use client";
import React, { useEffect, useRef, useState } from "react";

const images = [
  "/oldCare.jpg",
  "/babyCare.jpg",
  "/oldladycare.png",
  "/olldgents.JPG",
  "/bbabyCare.png",
];

const Banner = () => {
  const [index, setIndex] = useState(0);
  const intervalRef = useRef(null);

  const startAutoSlide = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 2000);
  };

  const stopAutoSlide = () => {
    clearInterval(intervalRef.current);
  };

  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, []);

  const getIndex = (offset) =>
    (index + offset + images.length) % images.length;

  const goNext = () => {
    setIndex(getIndex(1));
    startAutoSlide(); // restart auto
  };

  const goPrev = () => {
    setIndex(getIndex(-1));
    startAutoSlide(); // restart auto
  };

  return (
    <div className="py-10 bg-black">

    <div
      className="relative w-full h-[220px] lg:h-[420px] flex items-center justify-center overflow-hidden bg-black"
      onMouseEnter={stopAutoSlide}
      onMouseLeave={startAutoSlide}
    >
      {/* LEFT */}
      <img
        src={images[getIndex(-1)]}
        className="absolute w-[55%] lg:w-[40%] h-[80%] object-cover rounded-xl
        scale-90 opacity-40 -translate-x-[55%] z-0 transition-all duration-700"
        alt="left"
      />

      {/* RIGHT */}
      <img
        src={images[getIndex(1)]}
        className="absolute w-[55%] lg:w-[40%] h-[80%] object-cover rounded-xl
        scale-90 opacity-40 translate-x-[55%] z-0 transition-all duration-700"
        alt="right"
      />

      {/* MAIN */}
      <img
        src={images[index]}
        className="relative w-[70%] lg:w-[45%] h-full object-cover rounded-xl
        z-10 shadow-2xl transition-all duration-700"
        alt="main"
      />

      {/* CONTROLS */}
      <button
        onClick={goPrev}
        className="btn btn-circle absolute left-6 z-20"
      >
        ❮
      </button>

      <button
        onClick={goNext}
        className="btn btn-circle absolute right-6 z-20"
      >
        ❯
      </button>
    </div>
    <h1 className="font-bold text-2xl lg:text-4xl text-center mt-10 shine-text">
  CARING FOR YOUR LOVED ONES, BECAUSE THEY DESERVE THE BEST EVERYDAY
</h1>



    </div>
  );
};

export default Banner;
