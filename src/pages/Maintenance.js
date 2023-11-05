import React from 'react';

import { MaintenanceImage } from '../assets';

const Maintenance = () => {
  return (
    <main className='flex items-center justify-center h-screen bg-white'>
      <img
        src={MaintenanceImage}
        alt='Maintenance'
        className='mx-auto my-auto'
      />
    </main>
  );
};

export default Maintenance;
