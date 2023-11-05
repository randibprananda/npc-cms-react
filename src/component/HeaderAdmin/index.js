import { React } from 'react';

import { Marsha } from '../../assets';

const HeaderAdmin = ({ title }) => {
  return (
    <div className='flex items-center justify-between px-8 pt-10'>
      <h1 className='text-2xl font-bold'>{title}</h1>
      <div className='flex items-center gap-4'>
        <div>
          <h1 className='text-base font-bold'>Admin</h1>
          <h1 className='text-base'>NPC Indonesia</h1>
        </div>
        <img
          src={Marsha}
          className='w-10 h-10 rounded-full'
          alt=''
        />
      </div>
    </div>
  );
};
export default HeaderAdmin;
