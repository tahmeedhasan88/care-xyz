import React from 'react';

const loading = () => {
    return (
        <div className='flex flex-col justify-center items-center my-50 lg:my-60'>
            <span className="loading loading-spinner text-success size-10 lg:size-17"></span>
        </div>
    );
};

export default loading;