import { React, useState } from 'react';
import { useDebounce } from 'use-debounce';

import { VectorDelete } from '../../../../assets';
import { FooterAdmin, HeaderAdmin, Sidebar, Table } from '../../../../component';
import { useDeleteSport } from '../../../../hooks/fetch/sport/useDeleteSport';
import { useGetSports } from '../../../../hooks/fetch/sport/useGetSports';
import { showToastMessage } from '../../../../lib/toast';

const ListSport = () => {
  const [sportId, setSportId] = useState('');
  const [modal, setModal] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [searchValueDebounce] = useDebounce(searchValue, 2500);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const {
    data: dataGetSports,
    isLoading: isLoadingGetSports,
    refetch: refetchGetSports,
  } = useGetSports(limit, page, searchValueDebounce);

  const { mutate: deleteSport } = useDeleteSport({
    onSuccess: () => {
      refetchGetSports();
      setModal(false);
      showToastMessage('Data berhasil dihapus', 'success');
    },
    onError: () => showToastMessage('Data tidak berhasil dihapus', 'error'),
  });

  const columns = ['No', 'Picture', 'Sports', 'Action'];

  //Pagination
  const [totalPages, setTotalPages] = useState('')
  const handlePageChange = (page) => {
    setPage(page);
  };
  const handlePrevChange = () => {
      if(page === 1) {
          setPage(1)
      } else {
          setPage(page - 1);
      }
  };
  const handleNextChange = () => {
      if(page === totalPages) {
          setPage(totalPages)
      } else {
          setPage(page + 1);
      }
  };

  return (
    <div className='flex'>
      <Sidebar />
      <div className='w-screen -my-2 overflow-hidden'>
        <HeaderAdmin title='Sport' />
        <Table
          page={page}
          limit={limit}
          totalCount={dataGetSports?.totalCount}
          handlePageChange={handlePageChange}
          handlePrevChange={handlePrevChange}
          handleNextChange={handleNextChange}
          totalPages={dataGetSports?.totalPages}
          searchValueOne={searchValue}
          setSearchValueOne={setSearchValue}
          title={'Sport List'}
          rows={dataGetSports?.data}
          columns={columns}
          titleCreate={'Add Sport'}
          linkEdit='/edit-sport'
          linkadd={'/create-sport'}
          openModalOne={(id) => {
            setModal(true);
            setSportId(id);
          }}
        />
        <FooterAdmin />
      </div>
      {modal && (
        <div className='fixed top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center w-full h-full bg-opacity-50 bg-slate-800'>
          <div className='bg-white w-[729px] px-16 py-14 rounded-lg text-center'>
            <img
              src={VectorDelete}
              alt='Delete Icon'
              className='w-[100px] h-[100px] mx-auto mb-[20px]'
            />
            <h1 className='mb-4 text-2xl font-bold text-black'>Are you sure?</h1>
            <h1 className='text-lg mb-[52px] text-black'>Are you sure you want to delete this data?</h1>
            <div className='flex justify-center gap-6'>
              <button
                className='bg-[#EE393E] px-8 py-2 font-bold rounded-md text-md text-white'
                onClick={() => deleteSport(sportId)}>
                Delete
              </button>
              <button
                className='bg-[#EDEEF1] px-8 py-2 font-bold rounded-md text-md text-[#25272C]'
                onClick={() => setModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListSport;
