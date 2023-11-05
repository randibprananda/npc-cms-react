import moment from 'moment';
import { React } from 'react';
import ReactPaginate from 'react-paginate';
import { Link, useNavigate } from 'react-router-dom';

import { IconDelete, IconEdit, LogoSmall } from '../../assets';
import Pagination from '../Pagination';

const Table = ({
  limit,
  page,
  totalCount,
  handlePageChange,
  handlePrevChange,
  handleNextChange,
  totalPages,
  title,
  rows,
  columns,
  openModalOne,
  linkadd,
  titleCreate,
  linkEdit,
  searchValueOne,
  setSearchValueOne,
  searchValueTwo,
  setSearchValueTwo,
}) => {
  const navigate = useNavigate();

  if (!rows) {
    return null;
  }

  return (
    <div className='inline-block w-full min-h-screen px-8 py-20'>
      <div className='bg-white border-b shadow-custom rounded-[10px]'>
        <div className='px-8 pt-8'>
          <h1 className='text-xl font-bold'>{title}</h1>
        </div>
        <div className='flex-1 p-8'>
          <div className='flex justify-end gap-2.5 mb-14'>
            <div className='relative w-full md:w-max'>
              <input
                type='text'
                id='simple-search'
                className='bg-white border border-[#E4E6FC] text-gray-900 text-sm rounded-lg block w-full pr-10 p-2.5'
                value={searchValueOne || searchValueTwo}
                onChange={(e) => {
                  if (searchValueTwo === '' || !searchValueTwo) {
                    setSearchValueOne(e.target.value);
                  } else {
                    setSearchValueTwo(e.target.value);
                  }
                }}
              />
            </div>
            <Link
              to={linkadd}
              className='px-8 flex items-center rounded-[10px] text-white bg-[#EE393E] hover:bg-[#d63430] transition duration-300 font-[500] text-sm'>
              {titleCreate}
            </Link>
          </div>
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
                  rows.map((row, rowIndex) => {
                    if (row?.name_sport !== 'General News') {
                      return (
                        <tr key={rowIndex}>
                          {columns.map((column, colIndex) => (
                            <td
                              key={colIndex}
                              className='px-6 py-4 font-semibold text-black truncate'>
                              {column === 'No' ? (
                                <div> {rowIndex + 1}.</div>
                              ) : column === 'Picture' ? (
                                <img
                                  src={row.image? (process.env.REACT_APP_MODE == "dev" ? process.env.REACT_APP_API_IMAGE_URL_STAGING : process.env.REACT_APP_API_IMAGE_URL_PROD)  + row?.image : LogoSmall}
                                  alt='image'
                                  className='w-[100px] h-[100px] rounded-[10px] bg-contain'
                                />
                              ) : column === 'Sports' ? (
                                <div>{row?.name_sport}</div>
                              ) : column === 'Sports Type' ? (
                                <div>{row?.paralympic_sport?.name_sport}</div>
                              ) : column === 'Region of Origin' ? (
                                <div>{row?.atheletes_regional}</div>
                              ) : column === 'Title' ? (
                                <div>{row?.title}</div>
                              ) : column === 'Email' ? (
                                <div>{row?.email}</div>
                              ) : column === 'News Type' ? (
                                <div>{row?.news_type?.name_sport}</div>
                              ) : column === 'Name' ? (
                                <div>{row?.title || row?.atheletes_name || row?.fullname}</div>
                              ) : column === 'Location' ? (
                                <div>{row?.location}</div>
                              ) : column === 'Date' ? (
                                <div>{`${moment(row?.opening).format('DD-MM-YYYY')} Until ${moment(row?.closing).format(
                                  'DD-MM-YYYY',
                                )}`}</div>
                              ) : column === 'Date ' ? (
                                <div>{moment(row?.date).format('D-M-YYYY')}</div>
                              ) : column === 'Action' ? (
                                <div className='flex gap-3'>
                                  <button
                                    onClick={() => navigate(linkEdit, { state: { id: row.id } })}
                                    className='bg-[#1479BD] hover:bg-[#126a9c] transition duration-300 p-3 rounded-[5px] flex-shrink-0 flex'>
                                    <img
                                      src={IconEdit}
                                      alt='Edit'
                                    />
                                  </button>
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
                      );
                    }
                  })}
              </tbody>
            </table>
            <div className='flex justify-end'>
            {/* <ReactPaginate
              breakLabel={<span className='mr-4'>...</span>}
              nextLabel={
                <span
                  className='text-[#EE393E] font-semibold text-[13px]'
                  onClick={() => page < totalPages && setPage((prev) => prev + 1)}>
                  Next
                </span>
              }
              // onPageChange={handlePageClick}
              pageRangeDisplayed={limit}
              pageCount={totalPages}
              previousLabel={
                <span
                  onClick={() => page > 1 && setPage((prev) => prev - 1)} // Perubahan disini
                  className='text-[#EE393E] font-semibold text-[13px]'>
                  Previous
                </span>
              }
              // renderOnZeroPageCount={null}
              containerClassName='flex items-center justify center mt-8 mb-4 space-x-10'
              disabledClassName='w-8 h-8 rounded-[5px] flex items-center justify-center text-[#EE393E] bg-[#FAFAFA]'
              activeClassName='w-8 h-8 rounded-[5px] bg-[#EE393E] text-white flex items-center justify-center'
            /> */}

            <Pagination
                currentPage={page} 
                totalPages={totalPages} 
                limitData={limit}
                lengthData={totalCount}
                onPageChange={handlePageChange}
                onPrevChange={handlePrevChange}
                onNextChange={handleNextChange}
            />

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
