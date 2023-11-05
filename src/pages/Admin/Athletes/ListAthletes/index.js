import { React, useState } from 'react';
import { useDebounce } from 'use-debounce';

import { VectorDelete } from '../../../../assets';
import { FooterAdmin, HeaderAdmin, Sidebar, Table } from '../../../../component';
import { useDeleteAthletes } from '../../../../hooks/fetch/athletes/useDeleteAthletes';
import { useGetAthletes } from '../../../../hooks/fetch/athletes/useGetAthletes';
import { showToastMessage } from '../../../../lib/toast';

const ListAthletes = () => {
  const columns = ['No', 'Picture', 'Name', 'Sports Type', 'Region of Origin', 'Action'];

  const [modal, setModal] = useState(false);

  const openModal = () => setModal(true);
  const closeModal = () => setModal(false);
  const [athletesId, setAthletesId] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [searchValueDebounce] = useDebounce(searchValue, 2500);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);

  const { data: dataGetAthletes, refetch: refetchGetAthletes } = useGetAthletes(limit, page, searchValueDebounce);
  const { mutate: deleteAthletes } = useDeleteAthletes({
    onSuccess: () => {
      refetchGetAthletes();
      setModal(false);
      showToastMessage('Data berhasil dihapus', 'success');
    },
    onError: () => showToastMessage('Data tidak berhasil dihapus', 'error'),
  });

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
        <HeaderAdmin title='Athletes' />
        <Table
          page={page}
          limit={limit}
          totalCount={dataGetAthletes?.totalCount}
          handlePageChange={handlePageChange}
          handlePrevChange={handlePrevChange}
          handleNextChange={handleNextChange}
          totalPages={dataGetAthletes?.totalPages}
          searchValueOne={searchValue}
          setSearchValueOne={setSearchValue}
          title={'Athletes List'}
          rows={dataGetAthletes?.data}
          columns={columns}
          titleCreate={'Add Athletes'}
          linkadd={'/create-athletes'}
          linkEdit={'/edit-athletes'}
          createFunction={() => setModal(true)}
          openModalOne={(id) => {
            setModal(true);
            setAthletesId(id);
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
                onClick={() => deleteAthletes(athletesId)}>
                Delete
              </button>
              <button
                className='bg-[#EDEEF1] px-8 py-2 font-bold rounded-md text-md text-[#25272C]'
                onClick={closeModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListAthletes;
