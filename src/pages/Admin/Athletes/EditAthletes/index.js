import '../../../../App.css';

import { useFormik } from 'formik';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';

import { IconClose, IconDelete, IconEdit2, IconMedal1, IconMedal2, IconMedal3, VectorDelete } from '../../../../assets';
import { FooterAdmin, HeaderAdmin, NumberInput, Sidebar, TinyMce } from '../../../../component';
import { useGetAthletesById } from '../../../../hooks/fetch/athletes/useGetAthletesById';
import { usePutAthletes } from '../../../../hooks/fetch/athletes/usePutAthletes';
import { useGetSports } from '../../../../hooks/fetch/sport/useGetSports';
import { showToastMessage } from '../../../../lib/toast';
import { isValidBase64 } from '../../../../lib/utils';

const athleteSchema = z.object({
  atheletes_name: z.string({ required_error: 'Name Athletes tidak boleh kosong' }),
  atheletes_regional: z.string({ required_error: 'Region of Origin tidak boleh kosong' }),
  atheletes_debute: z.string({ required_error: 'Debute tidak boleh kosong' }),
  atheletes_birthdate: z.string({ required_error: 'Date of Birth tidak boleh kosong' }),
  atheletes_class: z.string({ required_error: 'Class tidak boleh kosong' }),
  atheletes_biography: z.string({ required_error: 'Biography tidak boleh kosong' }),
  paralympic_sport_type: z.string({ required_error: 'Sport type tidak boleh kosong' }),
  image: z.string({ required_error: 'Image tidak boleh kosong' }),
});

const EditAthletes = () => {
  const [sportEvents, setSportEvents] = useState([{ id: 1, value: "" }]);

  const addGoldMedal = () => {
    setSportEvents([...sportEvents, { id: Date.now(), value: "" }]);
  };
  const addSilverMedal = () => {
    setSportEvents([...sportEvents, { id: Date.now(), value: "" }]);
  };
  const addBronzeMedal = () => {
    setSportEvents([...sportEvents, { id: Date.now(), value: "" }]);
  };

  const updateEventValue = (id, value) => {
    const updatedEvents = sportEvents.map((event) =>
      event.id === id ? { ...event, value } : event
    );
    setSportEvents(updatedEvents);
  };

  const deleteGoldMedal = (id) => {
    const filteredEvents = sportEvents.filter((event) => event.id !== id);
    setSportEvents(filteredEvents);
  };
  const deleteSilverMedal = (id) => {
    const filteredEvents = sportEvents.filter((event) => event.id !== id);
    setSportEvents(filteredEvents);
  };
  const deleteBronzeMedal = (id) => {
    const filteredEvents = sportEvents.filter((event) => event.id !== id);
    setSportEvents(filteredEvents);
  };
  const navigate = useNavigate();
  let { state } = useLocation();
  const athletesId = state.id;

  const { data: dataGetAthlete } = useGetAthletesById(athletesId);

  const { data: dataGetSports } = useGetSports(0, 1, '');

  const { mutate: updateAthlete } = usePutAthletes({
    onSuccess: () => {
      showToastMessage('Data berhasil diupdate', 'success');
      navigate(-1);
    },
    onError: () => {
      showToastMessage('Data gagal diupdate', 'error');
    },
  });

  const getContentTinyMce = (data) => {
    formik.setFieldValue('atheletes_biography', data);
  };

  const clearFormMedal = () => {
    setGoldSportEvent('');
    setGoldClass('');
    setGoldYear('');
    setGoldCategory('');
    setSilverSportEvent('');
    setSilverClass('');
    setSilverYear('');
    setSilverCategory('');
    setBronzeSportEvent('');
    setBronzeClass('');
    setBronzeYear('');
    setBronzeCategory('');
  }

  const handleGoldResult = () => {
    const data = {
      sport_event: goldSportEvent,
      class: goldClass,
      year: goldYear,
      event_category: goldCategory,
    };
    if (goldSportEvent === '' || goldClass === '' || goldYear === '' || goldCategory === '') {
      showToastMessage('Data gagal ditambahkan, lengkapi inputan anda', 'error');
      return;
    }
    goldResult.push(data);
    console.log(goldResult, 'gold add result')
    clearFormMedal()
    showToastMessage('Data berhasil ditambahkan', 'success');
  };

  const handleSilverResult = () => {
    const data = {
      sport_event: silverSportEvent,
      class: silverClass,
      year: silverYear,
      event_category: silverCategory,
    };
    if (silverSportEvent === '' || silverClass === '' || silverYear === '' || silverCategory === '') {
      showToastMessage('Data gagal ditambahkan, lengkapi inputan anda', 'error');
      return;
    }
    silverResult.push(data);
    clearFormMedal()
    showToastMessage('Data berhasil ditambahkan', 'success');
  };

  const handleBronzeResult = () => {
    const data = {
      sport_event: bronzeSportEvent,
      class: bronzeClass,
      year: bronzeYear,
      event_category: bronzeCategory,
    };
    if (bronzeSportEvent === '' || bronzeClass === '' || bronzeYear === '' || bronzeCategory === '') {
      showToastMessage('Data gagal ditambahkan, lengkapi inputan anda', 'error');
      return;
    }
    bronzeResult.push(data);
    clearFormMedal()
    showToastMessage('Data berhasil ditambahkan', 'success');
  };

  const columns = ['No', 'Medal', 'Event', 'Year', 'Class', 'Event Category', 'Action'];
  const columns2 = ['No', 'Medal', 'Event', 'Year', 'Class', 'Event Category', 'Action'];
  const columns3 = ['No', 'Medal', 'Event', 'Year', 'Class', 'Event Category', 'Action'];

  const initialValues = {
    atheletes_name: dataGetAthlete?.atheletes_name,
    atheletes_regional: dataGetAthlete?.atheletes_regional,
    atheletes_debute: dataGetAthlete?.atheletes_debute,
    atheletes_birthdate: moment(dataGetAthlete?.atheletes_birthdate).format('YYYY-MM-DD'),
    atheletes_class: dataGetAthlete?.atheletes_class,
    atheletes_biography: dataGetAthlete?.atheletes_biography,
    gold_medal: +dataGetAthlete?.result_gold_medal.length,
    silver_medal: +dataGetAthlete?.result_silver_medal.length,
    bronze_medal: +dataGetAthlete?.result_bronze_medal,
    paralympic_sport_type: dataGetAthlete?.paralympic_sport?.id,
    image: dataGetAthlete?.image,
  };

  const editorRef = useRef(null);
  const [modalAddGold, setModalAddGold] = useState(false);
  const [modalAddSilver, setModalAddSilver] = useState(false);
  const [modalAddBronze, setModalAddBronze] = useState(false);
  const [modalListGold, setModalListGold] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [modalEditGold, setModalEditGold] = useState(false);
  const [modal7, setModal7] = useState(false);
  const [modal8, setModal8] = useState(false);
  const [modalListSilver, setModalListSilver] = useState(false);
  const [modal10, setModal10] = useState(false);
  const [goldSportEvent, setGoldSportEvent] = useState('');
  const [goldClass, setGoldClass] = useState('');
  const [goldYear, setGoldYear] = useState('');
  const [goldResult, setGoldResult] = useState([]);
  const [goldCategory, setGoldCategory] = useState('');
  const [silverSportEvent, setSilverSportEvent] = useState('');
  const [silverClass, setSilverClass] = useState('');
  const [silverYear, setSilverYear] = useState('');
  const [silverResult, setSilverResult] = useState([]);
  const [silverCategory, setSilverCategory] = useState('');
  const [bronzeSportEvent, setBronzeSportEvent] = useState('');
  const [bronzeClass, setBronzeClass] = useState('');
  const [bronzeYear, setBronzeYear] = useState('');
  const [bronzeResult, setBronzeResult] = useState([]);
  const [bronzeCategory, setBronzeCategory] = useState('');
  const [goldMedal, setGoldMedal] = useState(0);
  const [silverMedal, setSilverMedal] = useState(0);
  const [bronzeMedal, setBronzeMedal] = useState(0);

  const formik = useFormik({
    validationSchema: toFormikValidationSchema(athleteSchema),
    initialValues: initialValues,
    enableReinitialize: true,
    onSubmit: async () => {
        const data = {
          id: athletesId,
          atheletes_name: formik.values.atheletes_name,
          atheletes_regional: formik.values.atheletes_regional,
          atheletes_debute: formik.values.atheletes_debute,
          atheletes_birthdate: formik.values.atheletes_birthdate,
          atheletes_class: formik.values.atheletes_class,
          atheletes_biography: formik.values.atheletes_biography,
          goldResult: goldResult,
          silverResult: silverResult,
          bronzeResult: bronzeResult,
          paralympic_sport_type: formik.values.paralympic_sport_type,
          image: formik.values.image,
          gold_medal: goldResult.length.toString(),
          silver_medal: silverResult.length.toString(),
          bronze_medal: bronzeResult.length.toString(),
        };
        console.log(data, 'data yang dikirim')
        updateAthlete(data);
    },
  });

  const imagePath = process.env.REACT_APP_MODE == "dev" ? process.env.REACT_APP_API_IMAGE_URL_STAGING : process.env.REACT_APP_API_IMAGE_URL_PROD  + dataGetAthlete?.image;
  const [image, setImage] = useState('');

  useEffect(() => {
    if (dataGetAthlete !== undefined) {
      setGoldResult(dataGetAthlete?.result_gold_medal);
      setSilverResult(dataGetAthlete?.result_silver_medal);
      setBronzeResult(dataGetAthlete?.result_bronze_medal);
      setGoldMedal(dataGetAthlete.result_gold_medal.length);
      setSilverMedal(dataGetAthlete.result_silver_medal.length);
      setBronzeMedal(dataGetAthlete.result_bronze_medal.length);
      setImage(imagePath);
    }
  }, [dataGetAthlete]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImage(reader.result);
    };
  };
  const handleValueChange = (newValue) => {
    console.log(`New value is ${newValue}`);
  };

  const [deleteIndexGold, setDeleteIndexGold] = useState(null);
  const [deleteIndexSilver, setDeleteIndexSilver] = useState(null);
  const [deleteIndexBronze, setDeleteIndexBronze] = useState(null);

  const openModalDeleteGold = (rowIndex) => {
    setDeleteIndexGold(rowIndex); // Set the index to delete
    setModalDelete(true);
  };

  const openModalDeleteSilver = (rowIndexSilver) => {
    setDeleteIndexSilver(rowIndexSilver); // Set the index to delete
    setModalDelete(true);
  };

  const openModalDeleteBronze = (rowIndexBronze) => {
    setDeleteIndexBronze(rowIndexBronze); // Set the index to delete
    setModalDelete(true);
  };

  const handleDelete = () => {
    if (deleteIndexGold !== null) {
      // Create a copy of the goldResult array to avoid mutating it directly
      const updatedGoldResult = [...goldResult];

      // Remove the element at the specified index
      updatedGoldResult.splice(deleteIndexGold, 1);

      // Update the goldResult state with the updated array
      setGoldResult(updatedGoldResult);
      setModalDelete(false);

      // Close the modal
    } else if (deleteIndexSilver !== null) {
      const updatedSilverResult = [...silverResult];

      // Remove the element at the specified index
      updatedSilverResult.splice(deleteIndexSilver, 1);

      // Update the goldResult state with the updated array
      setSilverResult(updatedSilverResult);
      setModalDelete(false);
    } else if (deleteIndexBronze !== null) {
      const updatedBronzeResult = [...bronzeResult];

      // Remove the element at the specified index
      updatedBronzeResult.splice(deleteIndexBronze, 1);

      // Update the goldResult state with the updated array
      setBronzeResult(updatedBronzeResult);
      setModalDelete(false);
    }
    
  };

  if (!dataGetAthlete) {
    return null;
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className='flex'>
        <Sidebar />
        <div className='w-screen -my-2 overflow-hidden'>
          <HeaderAdmin title='Athletes' />
          <div className='px-8 py-[70px]'>
            <div className='py-[33px] px-[34px] shadow-card rounded-[10px]'>
              <h1 className='mb-8 text-xl font-bold'>Edit Athletes</h1>
              <div className='mb-4'>
                <h1 className='text-base font-bold text-[#40444C] mb-2.5'>Name Athletes</h1>
                <input
                  className='appearance-none block w-full bg-light text-black border rounded-[12px] py-3 px-4 leading-tight focus:outline-none focus:bg-white md:text-sm text-xs'
                  id='name'
                  type='text'
                  placeholder='Name Athletes'
                  value={formik.values.atheletes_name}
                  onChange={(e) => formik.setFieldValue('atheletes_name', e.target.value)}
                />
                <span className='text-red-500'>{formik.errors.atheletes_name}</span>
              </div>
              <div className='flex flex-col mb-2 gap-y-2'>
                <h1 className='text-base font-bold text-[#40444C] mb-2.5'>Picture</h1>
                <div className='relative'>
                  <input
                    type='file'
                    className='hidden'
                    name='foto'
                    accept='image/jpeg, image/png' // Hanya menerima jenis file JPG dan PNG
                    onChange={(e) => {
                      const file = e.target.files[0];
                      const reader = new FileReader();

                      if (!file) {
                        return; // Tidak ada file yang diunggah
                      }

                      // Mendapatkan ekstensi file
                      const fileExtension = file.name.split('.').pop().toLowerCase();

                      // Memeriksa apakah ekstensi file adalah jpg atau png
                      if (fileExtension !== 'jpg' && fileExtension !== 'jpeg' && fileExtension !== 'png') {
                        showToastMessage('Hanya gambar JPG atau PNG yang diperbolehkan', 'error');
                        return; // Jenis file tidak valid, jangan lanjutkan
                      }

                      // Check if the file size exceeds 2MB (2 * 1024 * 1024 bytes)
                      if (file.size > 2 * 1024 * 1024) {
                        showToastMessage('Ukuran gambar tidak boleh lebih dari 2MB', 'error');
                        return; // Ukuran file terlalu besar, jangan lanjutkan
                      }

                      reader.readAsDataURL(file);

                      reader.onloadend = () => {
                        setImage(reader.result);
                        formik.setFieldValue('image', reader.result);
                      };
                    }}
                    id='fileInput'
                  />
                  <label
                    htmlFor='fileInput'
                    className='cursor-pointer bg-[#EE393E] text-white px-4 py-2 rounded'>
                    Upload File
                  </label>
                </div>
                {image && (
                  <div className='mt-4'>
                    <img
                      src={image}
                      alt='Preview'
                      className='object-cover w-32 h-32 rounded'
                    />
                  </div>
                )}
                <span className='text-red-500'>{formik.errors.image}</span>
              </div>
              <div className='mb-4'>
                <h1 className='text-base font-bold text-[#40444C] mb-2.5'>Sport Type</h1>
                <select
                  className='appearance-none block w-full bg-light text-black border rounded-[12px] py-3 px-4 mb-[20px] leading-tight focus:outline-none focus:bg-white md:text-sm text-xs'
                  id='debut'
                  value={formik.values.paralympic_sport_type}
                  onChange={(e) => formik.setFieldValue('paralympic_sport_type', e.target.value)}>
                  <option
                    value=''
                    selected
                    disabled>
                    Select sport type...
                  </option>
                  {dataGetSports?.data.map((sport) => {
                    return (
                      <option
                        value={sport?.id}
                        key={sport?.id}>
                        {sport?.name_sport}
                      </option>
                    );
                  })}
                </select>
                <span className='text-red-500'>{formik.errors.paralympic_sport_type}</span>
              </div>
              <div className='mb-4'>
                <h1 className='text-base font-bold text-[#40444C] mb-2.5'>Date of Birth</h1>
                <input
                  className='appearance-none block w-full bg-light text-black border rounded-[12px] py-3 px-4 mb-[20px] leading-tight focus:outline-none focus:bg-white md:text-sm text-xs'
                  id='opening'
                  type='date'
                  placeholder='Enter date of birth...'
                  value={formik.values.atheletes_birthdate}
                  onChange={(e) => formik.setFieldValue('atheletes_birthdate', e.target.value)}
                />
                <span className='text-red-500'>{formik.errors.atheletes_birthdate}</span>
              </div>
              <div className='mb-4'>
                <h1 className='text-base font-bold text-[#40444C] mb-2.5'>Region of Origin</h1>
                <input
                  className='appearance-none block w-full bg-light text-black border rounded-[12px] py-3 px-4 mb-[20px] leading-tight focus:outline-none focus:bg-white md:text-sm text-xs'
                  id='region'
                  type='text'
                  placeholder='Enter region of origin...'
                  value={formik.values.atheletes_regional}
                  onChange={(e) => formik.setFieldValue('atheletes_regional', e.target.value)}
                />
                <span className='text-red-500'>{formik.errors.atheletes_regional}</span>
              </div>
              <div className='mb-4'>
                <div className='flex items-center gap-4'>
                  <div className='w-full'>
                    <h1 className='text-base font-bold text-[#40444C] mb-2.5'>Gold Medals</h1>
                    <NumberInput
                      initialValue={goldResult.length}
                      minValue={0}
                      onValueChange={(newValue) => formik.setFieldValue('gold_medal', goldResult.length)}
                    />
                    <span className='text-red-500'>{formik.errors.gold_medal}</span>
                  </div>
                  <div className='w-full'>
                    <h1 className='text-base font-bold text-[#40444C] mb-2.5'>Silver Medals</h1>
                    <NumberInput
                      initialValue={silverResult.length}
                      minValue={0}
                      onValueChange={(newValue) => formik.setFieldValue('silver_medal', silverResult.length)}
                    />
                    <span className='text-red-500'>{formik.errors.silver_medal}</span>
                  </div>
                  <div className='w-full'>
                    <h1 className='text-base font-bold text-[#40444C] mb-2.5'>Bronze Medals</h1>
                    <NumberInput
                      initialValue={bronzeResult.length}
                      minValue={0}
                      onValueChange={(newValue) => formik.setFieldValue('bronze_medal', bronzeResult.length)}
                    />
                    <span className='text-red-500'>{formik.errors.bronze_medal}</span>
                  </div>
                </div>
              </div>
              <div className='mb-4'>
                <h1 className='text-base font-bold text-[#40444C] mb-2.5'>Debute</h1>
                <input
                  className='appearance-none block w-full bg-light text-black border rounded-[12px] py-3 px-4 mb-[20px] leading-tight focus:outline-none focus:bg-white md:text-sm text-xs'
                  id='debute'
                  type='text'
                  placeholder='Enter debute...'
                  value={formik.values.atheletes_debute}
                  onChange={(e) => formik.setFieldValue('atheletes_debute', e.target.value)}
                />
                <span className='text-red-500'>{formik.errors.atheletes_debute}</span>
              </div>
              <div className='mb-4'>
                <h1 className='text-base font-bold text-[#40444C] mb-2.5'>Class</h1>
                <input
                  className='appearance-none block w-full bg-light text-black border rounded-[12px] py-3 px-4 mb-[20px] leading-tight focus:outline-none focus:bg-white md:text-sm text-xs'
                  id='class'
                  type='text'
                  placeholder='Enter Class...'
                  value={formik.values.atheletes_class}
                  onChange={(e) => formik.setFieldValue('atheletes_class', e.target.value)}
                />
                <span className='text-red-500'>{formik.errors.atheletes_class}</span>
              </div>
              <div className='mb-4'>
                <h1 className='text-base font-bold text-[#40444C] mb-2.5'>Biography</h1>
                <TinyMce
                  getContentTinyMce={getContentTinyMce}
                  setDataTinyMce={formik.values.atheletes_biography}
                />
                <span className='text-red-500'>{formik.errors.atheletes_biography}</span>
              </div>
              <div className="mb-4">
                <h1 className="text-base font-bold text-[#40444C] mb-2.5">
                  Result Gold Medals
                </h1>
                <div className="bg-[#EDEEF1] py-3 pl-4 pr-2 flex justify-between w-[172px] rounded-[6px] items-center">
                  <button
                    type="button"
                    className="text-xs text-[#40444C] font-[500]"
                    onClick={() => setModalAddGold(true)}
                  >
                    Add Gold Medals
                  </button>
                  <div className="flex items-center">
                    <button
                      type="button"
                      className="w-max"
                      onClick={() => setModalListGold(true)}
                    >
                      <img
                        src={IconEdit2}
                        alt="IconEdit2"
                        className="w-5 h-5"
                      />
                    </button>
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <h1 className="text-base font-bold text-[#40444C] mb-2.5">
                  Result Silver Medals
                </h1>
                <div className="bg-[#EDEEF1] py-3 pl-4 pr-2 flex justify-between w-[172px] rounded-[6px] items-center">
                  <button
                    type="button"
                    className="text-xs text-[#40444C] font-[500]"
                    onClick={() => setModalAddSilver(true)}
                  >
                    Add Silver Medals
                  </button>
                  <div className="flex items-center">
                    <button
                      type="button"
                      className="w-max"
                      onClick={() => setModalListSilver(true)}
                    >
                      <img
                        src={IconEdit2}
                        alt="IconEdit2"
                        className="w-5 h-5"
                      />
                    </button>
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <h1 className="text-base font-bold text-[#40444C] mb-2.5">
                  Result Bronze Medals
                </h1>
                <div className="bg-[#EDEEF1] py-3 pl-4 pr-2 flex justify-between w-[172px] rounded-[6px] items-center">
                  <button
                    type="button"
                    className="text-xs text-[#40444C] font-[500]"
                    onClick={() => setModalAddBronze(true)}
                  >
                    Add Bronze Medals
                  </button>
                  <div className="flex items-center">
                    <button
                      type="button"
                      className="w-max"
                      onClick={() => setModal10(true)}
                    >
                      <img
                        src={IconEdit2}
                        alt="IconEdit2"
                        className="w-5 h-5"
                      />
                    </button>
                  </div>
                </div>
              </div>
              <div className='flex gap-6 justify-end mt-[50px]'>
                <button
                  type='button'
                  className='bg-[#EDEEF1] px-8 py-2 font-bold rounded-[10px] text-md text-[#25272C]'
                  onClick={() => navigate(-1)}>
                  Cancel
                </button>
                <button
                  type='submit'
                  className='bg-[#EE393E] px-8 py-2 font-bold rounded-[10px] text-md text-white'>
                  Create
                </button>
              </div>
            </div>
          </div>
          <FooterAdmin />
        </div>
        {modalAddGold === true && (
          <div className='fixed top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center w-full h-auto bg-opacity-50 bg-slate-800'>
            <div class='bg-white w-[729px]  px-[59px] py-[30px] rounded-lg text-center'>
              <div className='flex justify-end'>
                <button
                  type='button'
                  onClick={() => {
                    setModalAddGold(false);
                  }}>
                  <img
                    src={IconClose}
                    alt='IconClose'
                  />
                </button>
              </div>
              <h1 class='text-2xl font-bold mb-10 text-black'>Result Gold Medals</h1>
              <div className="mb-[50px] max-h-[300px] overflow-y-auto scrollbar-hide">
                <div className="mb-4">
                  <h1 className="text-xs font-bold text-[#40444C] mb-2.5 text-left">
                    Medals Name
                  </h1>
                  {sportEvents.map((event) => (
                    <div key={event.id} className="flex gap-2 mb-3">
                      <input
                        className="block w-full bg-light text-black border rounded-[6px] py-3 px-4  leading-tight focus:outline-none focus:bg-white text-xs"
                        value={event.value}
                        onChange={(e) =>
                          updateEventValue(event.id, e.target.value)
                        }
                        type="text"
                        placeholder="Example : 4 Nations Para Badminton International"
                      />
                      <button
                        className="bg-[#EE393E] hover:bg-[#d63430] transition duration-300 p-3 rounded-[5px] flex-shrink-0 flex h-max"
                        onClick={() => deleteGoldMedal(event.id)}
                      >
                        <img src={IconDelete} alt="Delete" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="flex gap-1 items-center p-2 bg-[#1479BD] hover:bg-[#10608A] transition-colors duration-300 text-white text-xs rounded-[8px]"
                    onClick={addGoldMedal}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.625 9.375V5H9.375V9.375H5V10.625H9.375V15H10.625V10.625H15V9.375H10.625Z"
                        fill="white"
                      />
                    </svg>
                    <span>Add Medals</span>
                  </button>
                </div>
              </div>
              <div className='flex justify-center gap-6'>
                <button
                  type='button'
                  className='bg-[#EE393E] px-8 py-2 font-bold rounded-[10px] text-md text-white'
                  onClick={() => {
                    handleGoldResult();
                    setModalAddGold(false);
                  }}>
                  Add
                </button>
                <button
                  type='button'
                  className='bg-[#EDEEF1] px-8 py-2 font-bold rounded-[10px] text-md text-[#25272C]'
                  onClick={() => {setModalAddGold(false); clearFormMedal()}}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
        {modalAddSilver === true && (
          <div className='fixed top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center w-full h-auto bg-opacity-50 bg-slate-800'>
            <div class='bg-white w-[729px]  px-[59px] py-[30px] rounded-lg text-center'>
              <div className='flex justify-end'>
                <button
                  type='button'
                  onClick={() => {
                    setModalAddSilver(false);
                  }}>
                  <img
                    src={IconClose}
                    alt='IconClose'
                  />
                </button>
              </div>
              <h1 class='text-2xl font-bold mb-10 text-black'>Result Silver Medals</h1>
              <div className="mb-[50px]  max-h-[300px] overflow-y-auto scrollbar-hide">
                <div className="mb-4">
                  <h1 className="text-xs font-bold text-[#40444C] mb-2.5 text-left">
                    Medals Name
                  </h1>
                  {sportEvents.map((event) => (
                    <div key={event.id} className="flex gap-2 mb-3">
                      <input
                        className="block w-full bg-light text-black border rounded-[6px] py-3 px-4  leading-tight focus:outline-none focus:bg-white text-xs"
                        value={event.value}
                        onChange={(e) =>
                          updateEventValue(event.id, e.target.value)
                        }
                        type="text"
                        placeholder="Example : 4 Nations Para Badminton International"
                      />
                      <button
                        className="bg-[#EE393E] hover:bg-[#d63430] transition duration-300 p-3 rounded-[5px] flex-shrink-0 flex h-max"
                        onClick={() => deleteSilverMedal(event.id)}
                      >
                        <img src={IconDelete} alt="Delete" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="flex gap-1 items-center p-2 bg-[#1479BD] hover:bg-[#10608A] transition-colors duration-300 text-white text-xs rounded-[8px]"
                    onClick={addSilverMedal}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.625 9.375V5H9.375V9.375H5V10.625H9.375V15H10.625V10.625H15V9.375H10.625Z"
                        fill="white"
                      />
                    </svg>
                    <span>Add Medals</span>
                  </button>
                </div>
              </div>
              <div className='flex justify-center gap-6'>
                <button
                  type='button'
                  className='bg-[#EE393E] px-8 py-2 font-bold rounded-[10px] text-md text-white'
                  onClick={() => {
                    handleSilverResult();
                    setModalAddSilver(false);
                  }}>
                  Add
                </button>
                <button
                  type='button'
                  className='bg-[#EDEEF1] px-8 py-2 font-bold rounded-[10px] text-md text-[#25272C]'
                  onClick={() =>{ setModalAddSilver(false); clearFormMedal()}}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
        {modalAddBronze === true && (
          <div className='fixed top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center w-full h-auto bg-opacity-50 bg-slate-800'>
            <div class='bg-white w-[729px]  px-[59px] py-[30px] rounded-lg text-center'>
              <div className='flex justify-end'>
                <button
                  type='button'
                  onClick={() => {
                    setModalAddBronze(false);
                  }}>
                  <img
                    src={IconClose}
                    alt='IconClose'
                  />
                </button>
              </div>
              <h1 class='text-2xl font-bold mb-10 text-black'>Result Bronze Medals</h1>
              <div className="mb-[50px]  max-h-[300px] overflow-y-auto scrollbar-hide">
                <div className="mb-4">
                  <h1 className="text-xs font-bold text-[#40444C] mb-2.5 text-left">
                    Medals Name
                  </h1>
                  {sportEvents.map((event) => (
                    <div key={event.id} className="flex gap-2 mb-3">
                      <input
                        className="block w-full bg-light text-black border rounded-[6px] py-3 px-4  leading-tight focus:outline-none focus:bg-white text-xs"
                        value={event.value}
                        onChange={(e) =>
                          updateEventValue(event.id, e.target.value)
                        }
                        type="text"
                        placeholder="Example : 4 Nations Para Badminton International"
                      />
                      <button
                        className="bg-[#EE393E] hover:bg-[#d63430] transition duration-300 p-3 rounded-[5px] flex-shrink-0 flex h-max"
                        onClick={() => deleteBronzeMedal(event.id)}
                      >
                        <img src={IconDelete} alt="Delete" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="flex gap-1 items-center p-2 bg-[#1479BD] hover:bg-[#10608A] transition-colors duration-300 text-white text-xs rounded-[8px]"
                    onClick={addBronzeMedal}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.625 9.375V5H9.375V9.375H5V10.625H9.375V15H10.625V10.625H15V9.375H10.625Z"
                        fill="white"
                      />
                    </svg>
                    <span>Add Medals</span>
                  </button>
                </div>
              </div>
              <div className='flex justify-center gap-6'>
                <button
                  type='button'
                  className='bg-[#EE393E] px-8 py-2 font-bold rounded-[10px] text-md text-white'
                  onClick={() => {
                    handleBronzeResult();
                    setModalAddBronze(false);
                  }}>
                  Add
                </button>
                <button
                  type='button'
                  className='bg-[#EDEEF1] px-8 py-2 font-bold rounded-[10px] text-md text-[#25272C]'
                  onClick={() => {setModalAddBronze(false); clearFormMedal()}}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
        {modalListGold === true && (
          <div className='fixed top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center w-full h-auto bg-opacity-50 bg-slate-800'>
            <div class='bg-white w-[1280px]  px-[59px] py-[30px] rounded-lg text-center'>
              <div className='flex justify-end'>
                <button
                  type='button'
                  onClick={() => {
                    setModalListGold(false);
                  }}>
                  <img
                    src={IconClose}
                    alt='IconClose'
                  />
                </button>
              </div>
              <h1 class='text-2xl font-bold mb-10 text-black'>Result Gold Medals</h1>
              <div className='mb-[50px]'>
                <div className='w-full h-[400px] overflow-x-auto scrollbar-hide'>
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
                      {goldResult.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                          {columns.map((column, colIndex) => (
                            <td
                              key={colIndex}
                              className='px-6 py-4 font-semibold text-black truncate'>
                              {column === 'No' ? (
                                <div>{rowIndex + 1}.</div>
                              ) : column === 'Medal' ? (
                                <div>Gold</div>
                              ) : column === 'Event' ? (
                                <div>{row.sport_event}</div>
                              ) : column === 'Year' ? (
                                <div>{row.year}</div>
                              ) : column === 'Class' ? (
                                <div>{row.class}</div>
                              ) : column === 'Event Category' ? (
                                <div>{row.event_category}</div>
                              ) : column === 'Picture' ? (
                                <img
                                  src={row[column]}
                                  alt={`${row[column]} image`}
                                  className='w-[100px] h-[100px] rounded-[10px] flex-shrink-0'
                                />
                              ) : column === 'Action' ? (
                                <div className='flex gap-3'>
                                  {/* <button
                                    onClick={() => {
                                      setModalEditGold(true);
                                    }}
                                    className='bg-[#1479BD] hover:bg-[#126a9c] transition duration-300 p-3 rounded-[5px] flex-shrink-0 flex'>
                                    <img
                                      src={IconEdit}
                                      alt='Edit'
                                    />
                                  </button> */}
                                  <button
                                    type='button'
                                    onClick={() => openModalDeleteGold(rowIndex)}
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
              <div className='flex justify-end gap-6'>
                <button
                  type='button'
                  className='bg-[#EE393E] px-8 py-2 font-bold rounded-[10px] text-md text-white'
                  onClick={() => {
                    setModalListGold(false);
                  }}>
                  Save
                </button>
                <button
                  type='button'
                  className='bg-[#EDEEF1] px-8 py-2 font-bold rounded-[10px] text-md text-[#25272C]'
                  onClick={() => setModalListGold(false)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
        {modalDelete === true && (
          <div
            className='fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center w-full h-full bg-opacity-50 bg-slate-800'
            style={{ zIndex: '999' }}>
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
                  type='button'
                  className='bg-[#EE393E] px-8 py-2 font-bold rounded-md text-md text-white'
                  onClick={() => handleDelete()}>
                  Delete
                </button>
                <button
                  type='button'
                  className='bg-[#EDEEF1] px-8 py-2 font-bold rounded-md text-md text-[#25272C]'
                  onClick={() => setModalDelete(false)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
        {modalEditGold === true && (
          <div className='fixed top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center w-full h-auto bg-opacity-50 bg-slate-800'>
            <div class='bg-white w-[729px]  px-[59px] py-[30px] rounded-lg text-center'>
              <div className='flex justify-end'>
                <button
                  type='button'
                  onClick={() => {
                    setModalEditGold(false);
                  }}>
                  <img
                    src={IconClose}
                    alt='IconClose'
                  />
                </button>
              </div>
              <h1 class='text-2xl font-bold mb-10 text-black'>Edit Gold Medals</h1>
              <div className='mb-[50px]'>
                <div className='mb-4'>
                  <h1 className='text-xs font-bold text-[#40444C] mb-2.5 text-left'>Sports Events</h1>
                  <input
                    className='block w-full bg-light text-black border rounded-[6px] py-3 px-4 mb-[20px] leading-tight focus:outline-none focus:bg-white text-xs'
                    id='title'
                    type='text'
                    placeholder='Enter the name of the sporting event...'
                  />
                </div>
                <div className='mb-4'>
                  <h1 className='text-xs font-bold text-[#40444C] mb-2.5 text-left'>Class</h1>
                  <input
                    className='block w-full bg-light text-black border rounded-[6px] py-3 px-4 mb-[20px] leading-tight focus:outline-none focus:bg-white text-xs'
                    id='class'
                    type='text'
                    placeholder='Enter class...'
                  />
                </div>
                <div className='mb-4'>
                  <h1 className='text-xs font-bold text-[#40444C] mb-2.5 text-left'>Year</h1>
                  <input
                    className='block w-full bg-light text-black border rounded-[6px] py-3 px-4 mb-[20px] leading-tight focus:outline-none focus:bg-white text-xs'
                    id='year'
                    type='text'
                    placeholder='Enter year...'
                  />
                </div>
              </div>
              <div className='flex justify-center gap-6'>
                <button
                  type='button'
                  className='bg-[#EE393E] px-8 py-2 font-bold rounded-[10px] text-md text-white'
                  onClick={() => {
                    setModalEditGold(false);
                  }}>
                  Edit
                </button>
                <button
                  type='button'
                  className='bg-[#EDEEF1] px-8 py-2 font-bold rounded-[10px] text-md text-[#25272C]'
                  onClick={() => {setModalEditGold(false); clearFormMedal()}}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
        {modal7 === true && (
          <div className='fixed top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center w-full h-auto bg-opacity-50 bg-slate-800'>
            <div class='bg-white w-[729px]  px-[59px] py-[30px] rounded-lg text-center'>
              <div className='flex justify-end'>
                <button
                  type='button'
                  onClick={() => {
                    setModal7(false);
                  }}>
                  <img
                    src={IconClose}
                    alt='IconClose'
                  />
                </button>
              </div>
              <h1 class='text-2xl font-bold mb-10 text-black'>Edit Silver Medals</h1>
              <div className='mb-[50px]'>
                <div className='mb-4'>
                  <h1 className='text-xs font-bold text-[#40444C] mb-2.5 text-left'>Sports Events</h1>
                  <input
                    className='block w-full bg-light text-black border rounded-[6px] py-3 px-4 mb-[20px] leading-tight focus:outline-none focus:bg-white text-xs'
                    id='title'
                    type='text'
                    placeholder='Enter the name of the sporting event...'
                  />
                </div>
                <div className='mb-4'>
                  <h1 className='text-xs font-bold text-[#40444C] mb-2.5 text-left'>Class</h1>
                  <input
                    className='block w-full bg-light text-black border rounded-[6px] py-3 px-4 mb-[20px] leading-tight focus:outline-none focus:bg-white text-xs'
                    id='class'
                    type='text'
                    placeholder='Enter class...'
                  />
                </div>
                <div className='mb-4'>
                  <h1 className='text-xs font-bold text-[#40444C] mb-2.5 text-left'>Year</h1>
                  <input
                    className='block w-full bg-light text-black border rounded-[6px] py-3 px-4 mb-[20px] leading-tight focus:outline-none focus:bg-white text-xs'
                    id='year'
                    type='text'
                    placeholder='Enter year...'
                  />
                </div>
              </div>
              <div className='flex justify-center gap-6'>
                <button
                  type='button'
                  className='bg-[#EE393E] px-8 py-2 font-bold rounded-[10px] text-md text-white'
                  onClick={() => {
                    setModal7(false);
                  }}>
                  Edit
                </button>
                <button
                  type='button'
                  className='bg-[#EDEEF1] px-8 py-2 font-bold rounded-[10px] text-md text-[#25272C]'
                  onClick={() =>{ setModal7(false); clearFormMedal()}}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
        {modal8 === true && (
          <div className='fixed top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center w-full h-auto bg-opacity-50 bg-slate-800'>
            <div class='bg-white w-[729px]  px-[59px] py-[30px] rounded-lg text-center'>
              <div className='flex justify-end'>
                <button
                  type='button'
                  onClick={() => {
                    setModal8(false);
                  }}>
                  <img
                    src={IconClose}
                    alt='IconClose'
                  />
                </button>
              </div>
              <h1 class='text-2xl font-bold mb-10 text-black'>Edit Bronze Medals</h1>
              <div className='mb-[50px]'>
                <div className='mb-4'>
                  <h1 className='text-xs font-bold text-[#40444C] mb-2.5 text-left'>Sports Events</h1>
                  <input
                    className='block w-full bg-light text-black border rounded-[6px] py-3 px-4 mb-[20px] leading-tight focus:outline-none focus:bg-white text-xs'
                    id='title'
                    type='text'
                    placeholder='Enter the name of the sporting event...'
                  />
                </div>
                <div className='mb-4'>
                  <h1 className='text-xs font-bold text-[#40444C] mb-2.5 text-left'>Class</h1>
                  <input
                    className='block w-full bg-light text-black border rounded-[6px] py-3 px-4 mb-[20px] leading-tight focus:outline-none focus:bg-white text-xs'
                    id='class'
                    type='text'
                    placeholder='Enter class...'
                  />
                </div>
                <div className='mb-4'>
                  <h1 className='text-xs font-bold text-[#40444C] mb-2.5 text-left'>Year</h1>
                  <input
                    className='block w-full bg-light text-black border rounded-[6px] py-3 px-4 mb-[20px] leading-tight focus:outline-none focus:bg-white text-xs'
                    id='year'
                    type='text'
                    placeholder='Enter year...'
                  />
                </div>
              </div>
              <div className='flex justify-center gap-6'>
                <button
                  type='button'
                  className='bg-[#EE393E] px-8 py-2 font-bold rounded-[10px] text-md text-white'
                  onClick={() => {
                    setModal8(false);
                  }}>
                  Edit
                </button>
                <button
                  type='button'
                  className='bg-[#EDEEF1] px-8 py-2 font-bold rounded-[10px] text-md text-[#25272C]'
                  onClick={() =>{ setModal8(false); clearFormMedal()}}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
        {modalListSilver === true && (
          <div className='fixed top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center w-full h-auto bg-opacity-50 bg-slate-800'>
            <div class='bg-white w-[1280px]  px-[59px] py-[30px] rounded-lg text-center'>
              <div className='flex justify-end'>
                <button
                  type='button'
                  onClick={() => {
                    setModalListSilver(false);
                  }}>
                  <img
                    src={IconClose}
                    alt='IconClose'
                  />
                </button>
              </div>
              <h1 class='text-2xl font-bold mb-10 text-black'>Result Silver Medals</h1>
              <div className='mb-[50px]'>
                <div className='w-full h-[400px] overflow-x-auto scrollbar-hide'>
                  <table className='w-full divide-y divide-gray-200'>
                    <thead className='bg-[#EDEEF1]'>
                      <tr>
                        {columns2.map((column, index) => (
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
                      {silverResult.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                          {columns.map((column, colIndex) => (
                            <td
                              key={colIndex}
                              className='px-6 py-4 font-semibold text-black truncate'>
                              {column === 'No' ? (
                                <div>{rowIndex + 1}.</div>
                              ) : column === 'Medal' ? (
                                <div>Gold</div>
                              ) : column === 'Event' ? (
                                <div>{row.sport_event}</div>
                              ) : column === 'Year' ? (
                                <div>{row.year}</div>
                              ) : column === 'Class' ? (
                                <div>{row.class}</div>
                              ) : column === 'Event Category' ? (
                                <div>{row.event_category}</div>
                              ) : column === 'Picture' ? (
                                <img
                                  src={row[column]}
                                  alt={`${row[column]} image`}
                                  className='w-[100px] h-[100px] rounded-[10px] flex-shrink-0'
                                />
                              ) : column === 'Action' ? (
                                <div className='flex gap-3'>
                                  {/* <button
                                    onClick={() => {
                                      setModal7(true);
                                    }}
                                    className='bg-[#1479BD] hover:bg-[#126a9c] transition duration-300 p-3 rounded-[5px] flex-shrink-0 flex'>
                                    <img
                                      src={IconEdit}
                                      alt='Edit'
                                    />
                                  </button> */}
                                  <button
                                    type='button'
                                    onClick={() => openModalDeleteSilver(rowIndex)}
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
              <div className='flex justify-end gap-6'>
                <button
                  type='button'
                  className='bg-[#EE393E] px-8 py-2 font-bold rounded-[10px] text-md text-white'
                  onClick={() => {
                    setModalListSilver(false);
                  }}>
                  Save
                </button>
                <button
                  type='button'
                  className='bg-[#EDEEF1] px-8 py-2 font-bold rounded-[10px] text-md text-[#25272C]'
                  onClick={() => setModalListSilver(false)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
        {modal10 === true && (
          <div className='fixed top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center w-full h-auto bg-opacity-50 bg-slate-800'>
            <div class='bg-white w-[1280px]  px-[59px] py-[30px] rounded-lg text-center'>
              <div className='flex justify-end'>
                <button
                  type='button'
                  onClick={() => {
                    setModal10(false);
                  }}>
                  <img
                    src={IconClose}
                    alt='IconClose'
                  />
                </button>
              </div>
              <h1 class='text-2xl font-bold mb-10 text-black'>Result Bronze Medals</h1>
              <div className='mb-[50px]'>
                <div className='w-full h-[400px] overflow-x-auto scrollbar-hide'>
                  <table className='w-full divide-y divide-gray-200'>
                    <thead className='bg-[#EDEEF1]'>
                      <tr>
                        {columns3.map((column, index) => (
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
                      {bronzeResult.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                          {columns.map((column, colIndex) => (
                            <td
                              key={colIndex}
                              className='px-6 py-4 font-semibold text-black truncate'>
                              {column === 'No' ? (
                                <div>{rowIndex + 1}.</div>
                              ) : column === 'Medal' ? (
                                <div>Gold</div>
                              ) : column === 'Event' ? (
                                <div>{row.sport_event}</div>
                              ) : column === 'Year' ? (
                                <div>{row.year}</div>
                              ) : column === 'Class' ? (
                                <div>{row.class}</div>
                              ) : column === 'Event Category' ? (
                                <div>{row.event_category}</div>
                              ) : column === 'Picture' ? (
                                <img
                                  src={row[column]}
                                  alt={`${row[column]} image`}
                                  className='w-[100px] h-[100px] rounded-[10px] flex-shrink-0'
                                />
                              ) : column === 'Action' ? (
                                <div className='flex gap-3'>
                                  {/* <button
                                    onClick={() => {
                                      setModalEditGold(true);
                                    }}
                                    className='bg-[#1479BD] hover:bg-[#126a9c] transition duration-300 p-3 rounded-[5px] flex-shrink-0 flex'>
                                    <img
                                      src={IconEdit}
                                      alt='Edit'
                                    />
                                  </button> */}
                                  <button
                                    type='button'
                                    onClick={() => openModalDeleteBronze(rowIndex)}
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
              <div className='flex justify-end gap-6'>
                <button
                  type='button'
                  className='bg-[#EE393E] px-8 py-2 font-bold rounded-[10px] text-md text-white'
                  onClick={() => {
                    setModal10(false);
                  }}>
                  Save
                </button>
                <button
                  type='button'
                  className='bg-[#EDEEF1] px-8 py-2 font-bold rounded-[10px] text-md text-[#25272C]'
                  onClick={() => setModal10(false)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </form>
  );
};

export default EditAthletes;
