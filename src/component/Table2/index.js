import { React } from 'react';
import { Link } from 'react-router-dom';

import { IconDelete, IconEdit } from '../../assets';

const Table2 = ({ title, rows, columns, openModalOne, linkadd, titleCreate }) => {
  return (
    <div className='inline-block w-full'>
      <div className='bg-white border-b shadow-custom rounded-[10px]'>
        <div className='px-8 pt-8'>
          <h1 className='text-[22px] font-bold'>{title}</h1>
        </div>
        <div className='flex-1 p-8'>
          
          <div className='w-full overflow-x-auto scrollbar-hide'>
            <table className='w-full divide-y divide-gray-200'>
              <thead className='bg-[#EDEEF1]'>
                <tr>
                  {columns.map((column, index) => (
                    <th
                      key={index}
                      scope='col'
                      className='px-6 py-3 text-left text-base font-bold text-[#25272C] uppercase tracking-wider truncate'>
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className='bg-white divide-y divide-gray-200'>
                {rows !== undefined &&
                  rows.map((row, rowIndex) => (
                    <tr key={row.id}>
                      {columns.map((column, colIndex) => (
                        <td
                          key={colIndex}
                          className='px-6 py-4 font-semibold text-black truncate'>
                          {column === 'No' ? (
                            <div> {rowIndex + 1}.</div>
                          ) : column === 'Picture' ? (
                            <img
                              src={process.env.REACT_APP_MODE == "dev" ? process.env.REACT_APP_API_IMAGE_URL_STAGING : process.env.REACT_APP_API_IMAGE_URL_PROD  + row?.image}
                              alt='image'
                              className='w-[100px] h-[100px] rounded-[10px] flex-shrink-0'
                            />
                          ) : column === 'Sports' ? (
                            <div>{row?.name_sport}</div>
                          ) : column === 'Action' ? (
                            <div className='flex gap-3'>
                              <Link
                                state={{ id: row?.id }}
                                to='/edit-sport'
                                className='bg-[#1479BD] hover:bg-[#126a9c] transition duration-300 p-3 rounded-[5px] flex-shrink-0 flex'>
                                <img
                                  src={IconEdit}
                                  alt='Edit'
                                />
                              </Link>
                              <button
                                onClick={() => openModalOne(row?.id)}
                                className='bg-[#EE393E] hover:bg-[#d63430] transition duration-300 p-3 rounded-[5px] flex-shrink-0 flex'>
                                <img
                                  src={IconDelete}
                                  alt='Delete'
                                />
                              </button>
                            </div>
                          ) : (
                            row[column]
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table2;
