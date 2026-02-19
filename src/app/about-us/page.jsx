import React from 'react';

const page = () => {
    return (
        <div className='m-10'>

       <div className=' mt-10 lg:mt-15 bg-[#ced6e0] p-10 shadow-2xl rounded-2xl'>
        <h1 className='text-2xl lg:text-3xl font-bold text-center'>About Us</h1>
        <div className='flex flex-col lg:flex-row justify-center items-center py-5 px-10 lg:px-30 gap-5 lg:gap-10'>
            <img className='w-[250px] lg:w-[400px]' src='/aboutUs.png'></img>

            <p>Care.xyz is a dedicated home care service platform committed to providing compassionate, reliable, and professional care for people who need it most. We believe that everyone deserves quality care in the comfort and safety of their own home.

            Our services are designed to support elderly individuals, babies, and sick patients by offering personalized care tailored to their unique needs. Whether it’s daily assistance for senior citizens, gentle and attentive baby care, or professional support for patients recovering from illness, Care.xyz is here to help.

            At Care.xyz, we understand that care is not just about services—it’s about trust, empathy, and responsibility. That’s why our caregivers are carefully selected, trained, and guided to provide care with respect, patience, and professionalism.

            Our mission is to reduce stress for families by ensuring their loved ones receive dependable and compassionate care at home. We aim to become a trusted partner in every household we serve by maintaining high standards of safety, dignity, and quality.

            With Care.xyz, you’re not just choosing a service—you’re choosing peace of mind, comfort, and genuine care.</p>

        </div>




        </div>


        </div>

    );
};

export default page;