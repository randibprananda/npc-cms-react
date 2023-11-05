import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import {
  IconAdmin,
  IconAdmin2,
  IconArrowRight,
  IconAthletes,
  IconAthletes2,
  IconBlog,
  IconBlog2,
  IconDashboard,
  IconDashboard2,
  IconEvent,
  IconEvent2,
  IconHeader,
  IconHeader2,
  IconImportData,
  IconImportData2,
  IconSport,
  IconSport2,
  LogoBig,
} from '../../assets';
import { checkTokenExpiration } from '../../lib/utils';

const App = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const location = useLocation();
  const Menus = [
    { title: 'Dashboard', src: IconDashboard, src2: IconDashboard2, path: '/dashboard' },
    { title: 'Import Data', src: IconImportData, src2: IconImportData2, path: '/import-data' },
    { title: 'Sport', src: IconSport, src2: IconSport2, path: '/list-sport' },
    { title: 'Event', src: IconEvent, src2: IconEvent2, path: '/list-event' },
    { title: 'News', src: IconBlog, src2: IconBlog2, path: '/list-news' },
    { title: 'Athletes', src: IconAthletes, src2: IconAthletes2, path: '/list-athletes' },
    { title: 'Admin', src: IconAdmin, src2: IconAdmin2, path: '/list-admin' },
    { title: 'Header Setting', src: IconHeader, src2: IconHeader2, path: '/header-setting' },
  ];

  useEffect(() => {
    const token = window.localStorage.getItem('token-npc');

    if (checkTokenExpiration(token)) {
      window.localStorage.removeItem('token-npc');
      navigate('/');
    }
  }, []);

  const handleLogout = () => {
    window.localStorage.removeItem('token-npc');
    navigate('/');
  };

  return (
    <div className='relative'>
      <div
        className={` ${
          open ? 'w-56' : 'w-20 '
        } bg-white h-screen sticky p-5  shadow-custom pt-8 top-0 left-0 duration-300`}>
        <img
          src={IconArrowRight}
          className={`absolute cursor-pointer -right-3 top-28 w-7 rounded-full  ${!open && 'rotate-180'}`}
          onClick={() => setOpen(!open)}
          alt='IconArrow'
        />
        <div className='flex gap-x-4 items-center border-b-2 pb-7 border-[#6B7280]'>
          <img
            src={LogoBig}
            className={`cursor-pointer duration-500 ${open && 'rotate-[360deg]'}`}
            alt='Logo'
          />
        </div>
        <ul className='pt-6'>
          {Menus.map((Menu, index) => (
            <Link
              to={Menu.path}
              key={index}>
              <li
                className={`flex justify-between rounded-md group p-2 cursor-pointer text-[#8E95A2] font-bold text-sm items-center
    ${Menu.gap ? 'mt-9' : 'mt-2'} ${location.pathname === Menu.path ? 'bg-[#EE393E] text-white ' : ''}`}>
                <div className='flex items-center gap-x-4'>
                  {typeof Menu.src === 'string' ? (
                    <img
                      src={location.pathname === Menu.path ? Menu.src2 : Menu.src}
                      alt={Menu.title}
                    />
                  ) : (
                    <Menu.src />
                  )}
                  <span className={`${!open && 'hidden'} origin-left duration-200`}>{Menu.title}</span>
                </div>
                {open && location.pathname === Menu.path && (
                  <div className='w-1.5 h-1.5 rounded-full bg-[#1FB15E]'></div>
                )}
              </li>
            </Link>
          ))}
        </ul>
        <button
          className='absolute flex items-center bottom-2 gap-[10px] group'
          onClick={handleLogout}>
          <svg
            width='41'
            height='42'
            viewBox='0 0 41 42'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M14.5 19.95H22.5V22.05H14.5V25.2L9.5 21L14.5 16.8V19.95ZM13.5 27.3H16.208C17.3627 28.3693 18.7867 29.0659 20.3091 29.3065C21.8316 29.547 23.3878 29.3212 24.791 28.6561C26.1942 27.991 27.3849 26.9148 28.2201 25.5568C29.0553 24.1988 29.4995 22.6166 29.4995 21C29.4995 19.3834 29.0553 17.8012 28.2201 16.4432C27.3849 15.0852 26.1942 14.009 24.791 13.3439C23.3878 12.6788 21.8316 12.453 20.3091 12.6935C18.7867 12.9341 17.3627 13.6307 16.208 14.7H13.5C14.4307 13.395 15.6383 12.3359 17.0271 11.6069C18.4158 10.8778 19.9473 10.4988 21.5 10.5C27.023 10.5 31.5 15.2009 31.5 21C31.5 26.7991 27.023 31.5 21.5 31.5C19.9473 31.5012 18.4158 31.1222 17.0271 30.3931C15.6383 29.6641 14.4307 28.605 13.5 27.3Z'
              fill='#8E95A2'
              className='transition-all duration-300 group-hover:fill-red-600'
            />
          </svg>
          <span className='text-[16px] font-[700] text-[#8E95A2] transition-all duration-300 group-hover:text-red-600'>
            Logout
          </span>
        </button>
      </div>
    </div>
  );
};
export default App;
