import React from 'react';
import { FaBabyCarriage } from "react-icons/fa";
import services from "@/app/data/servicess.json";
import { MdOutlineElderlyWoman } from "react-icons/md";
import { LuBriefcaseMedical } from "react-icons/lu";
import Link from 'next/link';


const Services = () => {

    const icons = [
  FaBabyCarriage,
  MdOutlineElderlyWoman,
  LuBriefcaseMedical,
];

const bgColors = [
    "#c7ecee",
    "#f27474",
    "#f7d794",
];

    return (
        <div className='mt-20'>
            <h1 className='text-2xl lg:text-3xl font-bold text-center'>Services</h1>

    <div className=' flex flex-col lg:flex-row gap-10 items-center justify-center my-10'>
        
                {
                services.map((service, index) => {
                const Icon = icons[index];
                
                return (
                <Link key={service.slug} href={`/serviceDetails/${service.slug}`}>
                <div 
                key={service._id}
                style={{ backgroundColor: bgColors[index] }}
                className="flex flex-col items-center gap-2 rounded-[15px] p-7 lg:p-10 shadow-2xl"
                >
                <Icon className="size-8 lg:size-10" />

                <h1 className="text-2xl lg:text-3xl font-semibold">
                {service.name}
                </h1>

                <h4 className="text-center">
                {service.shortDescription}
                </h4>
                </div>
                </Link>
                );
                })
                }



        

       

            </div>

        </div>
    );
};

export default Services;