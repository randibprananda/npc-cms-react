import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange, onPrevChange, onNextChange, lengthData, limitData }) => {
  const maxVisiblePages = 3;
  const halfMaxVisiblePages = Math.floor(maxVisiblePages / 2);
  
  let startPage = Math.max(1, currentPage - halfMaxVisiblePages);
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
  
  if (endPage - startPage < maxVisiblePages - 1) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  const pageRange = Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
  
  return (
    <div>
      <div className='flex items-center justify-between mt-[30px]'>
        <div className='flex items-center gap-[8px]'>
          {totalPages > 1 && (
            <button onClick={onPrevChange} disabled={currentPage === 1}>
              <div className="text-red-500 text-[13px] font-medium">Previous</div>
            </button>
          )}
          {startPage > 1 && (
            <>
              <button className='w-8 h-8 bg-neutral-50 rounded-[5px] flex items-center justify-center' onClick={() => onPageChange(1)}>
                <h1 className='text-[#780000] text-[13px]'>1</h1>
              </button>
              {startPage > 2 && (
                <span className='text-[#A098AE]'>...</span>
              )}
            </>
          )}
          {pageRange.map((page) => (
            <button
              key={page}
              className={currentPage === page ? 'w-8 h-8 bg-red-500 rounded-[5px] flex items-center justify-center' : 'w-8 h-8 bg-neutral-50 rounded-[5px] flex items-center justify-center'}
              onClick={() => onPageChange(page)}
            >
              <h1 className={currentPage === page ? 'text-white text-[13px]' : 'text-[#780000] text-[13px]'}>{page}</h1>
            </button>
          ))}
          {endPage < totalPages && (
            <>
              {endPage < totalPages - 1 && (
                <span className='text-[#A098AE]'>...</span>
              )}
              <button className='w-8 h-8 bg-neutral-50 rounded-[5px] flex items-center justify-center' onClick={() => onPageChange(totalPages)}>
                <h1 className='text-[#780000] text-[13px]'>{totalPages}</h1>
              </button>
            </>
          )}
          {totalPages > 1 && (
            <button onClick={onNextChange} disabled={currentPage === totalPages}>
              <div className="text-red-500 text-[13px] font-medium">Next</div>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Pagination;
