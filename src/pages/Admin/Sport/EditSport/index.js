import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';

import { IconAddFile, IconClose, IconVideo, IconVideo2, VectorQuestion } from '../../../../assets';
import { AccordionCheckbox, FooterAdmin, HeaderAdmin, Sidebar, TinyMce } from '../../../../component';
import { useGetSportById } from '../../../../hooks/fetch/sport/useGetSportById';
import { useGetTopNews } from '../../../../hooks/fetch/sport/useGetTopNews';
import { usePutSport } from '../../../../hooks/fetch/sport/usePutSport';
import { showToastMessage } from '../../../../lib/toast';
import { isValidBase64 } from '../../../../lib/utils';

const sportSchema = z.object({
  name_sport: z.string({ required_error: 'Name sport tidak boleh kosong' }),
  image: z.string({ required_error: 'Banner tidak boleh kosong' }),
  first_debut: z.string({ required_error: 'First debut tidak boleh kosong' }),
  history: z.string({ required_error: 'History tidak boleh kosong' }),
  selected_top_news: z.array(z.string({ required_error: 'Selected top news tidak boleh kosong' })),
  most_medal: z.string({ required_error: 'Most medals tidak boleh kosong' }),
  // title: z.string({ required_error: 'Video title tidak boleh kosong' }),
  // link: z.string({ required_error: 'Video link tidak boleh kosong' }),
  video: z
    .array(
      z.object({
        title: z.string({ required_error: 'Video title tidak boleh kosong' }),
        link: z.string({ required_error: 'Video link tidak boleh kosong' }),
      }),
    )
    .min(1, 'Video harus ada minimal 1'),
});

const EditSport = () => {
  const navigate = useNavigate();
  let { state } = useLocation();
  const sportId = state.id;
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [modal3, setModal3] = useState(false);

  const { data: dataGetSport, isLoading: isLoadingGetSport } = useGetSportById(sportId);

  const { mutate: updateSport } = usePutSport({
    onSuccess: () => {
      showToastMessage('Data berhasil diupdate', 'success');
      navigate(-1);
    },
    onError: () => {
      showToastMessage('Data gagal diupdate', 'error');
    },
  });

  const initialValues = {
    name_sport: dataGetSport?.name_sport,
    image: dataGetSport?.image,
    first_debut: dataGetSport?.first_debut,
    history: dataGetSport?.history,
    most_medal: dataGetSport?.most_medal,
    selected_top_news: dataGetSport?.selected_top_news,
    title: '',
    link: '',
    video: dataGetSport?.video ?? [],
  };

  const formik = useFormik({
    validationSchema: toFormikValidationSchema(sportSchema),
    initialValues: initialValues,
    enableReinitialize: true,
    onSubmit: () => {
      if (isValidBase64(formik.values.image)) {
        const data = {
          id: sportId,
          name_sport: formik.values.name_sport,
          history: formik.values.history,
          first_debut: formik.values.first_debut,
          selected_top_news: 'TOP',
          video: formik.values.video,
          image: formik.values.image,
        };
        updateSport(data);
      } else {
        const data = {
          id: sportId,
          name_sport: formik.values.name_sport,
          history: formik.values.history,
          first_debut: formik.values.first_debut,
          selected_top_news: 'TOP',
          video: formik.values.video,
        };
        updateSport(data);
      }
    },
  });

  const accordions = [
    {
      title: 'General News',
      options: [
        'President Jokowi Honors Paralympic Athletes at State Palace for Remarkable Achievements',
        'President Jokowi Honors Paralympic Athletes at State Palace for Remarkable Achievements',
        'President Jokowi Honors Paralympic Athletes at State Palace for Remarkable Achievements',
      ],
    },
    { title: 'Accordion 2', options: ['Option A', 'Option B', 'Option C'] },
    // Add more accordion objects here
  ];

  const getContentTinyMce = (data) => {
    formik.setFieldValue('history', data);
  };

  const handleIconCloseClick = (index) => {
    const video = formik.values.video;
    const updatedVideos = [...video];
    updatedVideos.splice(index, 1);
    formik.setFieldValue('video', updatedVideos);
  };

  const { data: dataGetTopNews } = useGetTopNews();

  function isValidYouTubeLink(link) {
    const youtubeLinkPattern = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/;
    return youtubeLinkPattern.test(link);
  }

  const [selectedNews, setSelectedNews] = useState([]);

  useEffect(() => {
    if (dataGetSport !== undefined) {
      setSelectedNews(dataGetSport.selected_top_news);
      setImage(imagePath);
    }
  }, [dataGetSport]);

  const imagePath = process.env.REACT_APP_MODE == "dev" ? process.env.REACT_APP_API_IMAGE_URL_STAGING : process.env.REACT_APP_API_IMAGE_URL_PROD  + dataGetSport?.image;
  const [image, setImage] = useState('');

  if (!dataGetSport) {
    return null;
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className='flex'>
        <Sidebar />
        <div className='w-screen -my-2 overflow-hidden'>
          <HeaderAdmin title='Sport' />
          <div className='px-8 py-[70px]'>
            <div className='py-[33px] px-[34px] shadow-card rounded-[10px]'>
              <h1 className='mb-8 text-xl font-bold'>Edit Sport</h1>
              <div className='mb-4'>
                <h1 className='text-base font-bold text-[#40444C] mb-2.5'>Name Sport</h1>
                <input
                  className='appearance-none block w-full bg-light text-black border rounded-[12px] py-3 px-4 leading-tight focus:outline-none focus:bg-white md:text-sm text-xs'
                  id='name'
                  type='text'
                  placeholder='Name sport'
                  value={formik.values.name_sport}
                  onChange={(e) => formik.setFieldValue('name_sport', e.target.value)}
                />
                <span className='text-red-500'>{formik.errors.name_sport}</span>
              </div>
              <div className='flex flex-col mb-4 gap-y-3'>
                <h1 className='text-base font-bold text-[#40444C] mb-2.5'>Banner</h1>
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
                <h1 className='text-base font-bold text-[#40444C] mb-2.5'>First Debut</h1>
                <input
                  className='appearance-none block w-full bg-light text-black border rounded-[12px] py-3 px-4 leading-tight focus:outline-none focus:bg-white md:text-sm text-xs'
                  id='debut'
                  type='text'
                  value={formik.values.first_debut}
                  onChange={(e) => formik.setFieldValue('first_debut', e.target.value)}
                  placeholder='Enter the place and year...'
                />
                <span className='text-red-500'>{formik.errors.first_debut}</span>
              </div>
              <div className='mb-4'>
                <h1 className='text-base font-bold text-[#40444C] mb-2.5'>Most Medals</h1>
                <input
                  className='appearance-none block w-full bg-light text-black border rounded-[12px] py-3 px-4 leading-tight focus:outline-none focus:bg-white md:text-sm text-xs'
                  id='debut'
                  type='text'
                  value={formik.values.most_medal}
                  onChange={(e) => formik.setFieldValue('most_medal', e.target.value)}
                  placeholder='Enter the place and year...'
                />
                <span className='text-red-500'>{formik.errors.most_medal}</span>
              </div>
              <div className='mb-4'>
                <h1 className='text-base font-bold text-[#40444C] mb-2.5'>History</h1>
                <TinyMce
                  getContentTinyMce={getContentTinyMce}
                  setDataTinyMce={formik.values.history}
                />
                <span className='text-red-500'>{formik.errors.history}</span>
              </div>
              <div className='mb-4'>
                <h1 className='text-base font-bold text-[#40444C] mb-2.5'>Select Top News</h1>
                <button
                  onClick={() => setModal(true)}
                  type='button'
                  className='flex w-1/3 bg-light  border rounded-[12px] justify-between items-center px-4 py-3 text-left mb-4'>
                  <h1 className='text-[#8E95A2] md:text-sm text-xs'>Select the top 3 news...</h1>
                  <img
                    src={IconAddFile}
                    alt='IconAddFile'
                  />
                </button>
                {/* <div className='flex flex-wrap gap-4'>
                  <div className='bg-[#EDEEF1] py-3 pl-4 pr-2 flex justify-between max-w-[207px] rounded-[6px] items-center'>
                    <h1 className='text-xs text-[#8E95A2] line-clamp-1'>
                      President Jokowi Honors Paralympic Athletes at State Palace for Remarkable Achievements{' '}
                    </h1>
                    <div className='flex items-center'>
                      <button className='w-max'>
                        <img
                          src={IconClose}
                          alt='IconClose'
                          className='w-5 h-5'
                        />
                      </button>
                    </div>
                  </div>
                </div> */}
              </div>
              <div className='mb-[50px]'>
                <h1 className='text-base font-bold text-[#40444C] mb-2.5'>Video</h1>
                <button
                  type='button'
                  onClick={() => setModal2(true)}
                  className='flex w-full bg-light  border rounded-[12px] justify-between items-center px-4 py-3 text-left mb-4'>
                  <h1 className='text-[#8E95A2] md:text-sm text-xs'>Enter the video link...</h1>
                  <img
                    src={IconVideo}
                    alt='IconVideo'
                  />
                </button>
                <div className='flex flex-wrap gap-4'>
                  {formik.values.video.length > 0 &&
                    formik.values.video.map((video, index) => {
                      return (
                        <div
                          className='px-3 py-[14px] border border-dashed border-[#737373] bg-[#EDEDED] w-[196px] rounded-[6px]'
                          key={video.title}>
                          <div className='flex justify-end'>
                            <button
                              type='button'
                              className='w-max'
                              onClick={() => handleIconCloseClick(index)}>
                              <img
                                src={IconClose}
                                alt='IconClose'
                                className='w-5 h-5'
                              />
                            </button>
                          </div>
                          <div className='flex flex-col items-center justify-center'>
                            <img
                              src={IconVideo2}
                              className='w-9 h-9 mb-'
                              alt='IconVideo'
                            />
                            <h1 className='text-xs text-center line-clamp-2 text-[#737373]'>{video.title}</h1>
                          </div>
                        </div>
                      );
                    })}
                </div>
                <span className='text-red-500'>{formik.errors.video}</span>
              </div>
              <div className='flex justify-end gap-6'>
                <button
                  className='bg-[#EDEEF1] px-8 py-2 font-bold rounded-[10px] text-md text-[#25272C]'
                  type='button'
                  onClick={() => {
                    setModal2(false);
                    navigate(-1);
                  }}>
                  Cancel
                </button>
                <button
                  className='bg-[#EE393E] px-8 py-2 font-bold rounded-[10px] text-md text-white'
                  type='submit'>
                  Update
                </button>
              </div>
            </div>
          </div>
          <FooterAdmin />
        </div>
        {modal === true && (
          <div className='fixed top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center w-full h-auto bg-opacity-50 bg-slate-800'>
            <div class='bg-white w-[729px]  px-[59px] py-[30px] rounded-lg text-center'>
              <div className='flex justify-end'>
                <button
                  type='button'
                  onClick={() => {
                    setModal(false);
                  }}>
                  <img
                    src={IconClose}
                    alt='IconClose'
                  />
                </button>
              </div>
              <h1 class='text-2xl font-bold mb-10 text-black'>Select Top News</h1>
              <div className='mb-[50px]'>
                <div className='border border-[#CACACA] max-h-[400px] overflow-y-auto rounded-[10px] px-8 py-7'>
                  {dataGetTopNews.map((accordion, index) => {
                    return (
                      <AccordionCheckbox
                        key={index}
                        title={accordion.name_sport}
                        options={accordion.data}
                      />
                    );
                  })}
                </div>
              </div>
              <div className='flex justify-end gap-6'>
                <button
                  type='button'
                  className='bg-[#EDEEF1] px-8 py-2 font-bold rounded-[10px] text-md text-[#25272C]'
                  onClick={() => setModal(false)}>
                  Cancel
                </button>
                <button
                  type='button'
                  className='bg-[#EE393E] px-8 py-2 font-bold rounded-[10px] text-md text-white'
                  onClick={() => {
                    setModal(false);
                  }}>
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
        {modal2 === true && (
          <div className='fixed top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center w-full h-auto bg-opacity-50 bg-slate-800'>
            <div class='bg-white w-[729px]  px-[59px] py-[30px] rounded-lg text-center'>
              <div className='flex justify-end'>
                <button
                  type='button'
                  onClick={() => {
                    setModal2(false);
                  }}>
                  <img
                    src={IconClose}
                    alt='IconClose'
                  />
                </button>
              </div>
              <h1 class='text-2xl font-bold mb-10 text-black'>Add Video</h1>
              <div className='mb-[50px]'>
                <div className='flex flex-col justify-start mb-4'>
                  <h1 className='text-xs font-bold text-[#40444C] mb-2.5 text-left'>Video Title</h1>
                  <input
                    className='block w-full bg-light text-black border rounded-[6px] py-3 px-4 mb-[20px] leading-tight focus:outline-none focus:bg-white text-xs'
                    id='title'
                    type='text'
                    placeholder='Enter the place and year...'
                    value={formik.values.title}
                    onChange={(e) => formik.setFieldValue('title', e.target.value)}
                  />
                  <span className='text-red-500'>{formik.errors.title}</span>
                </div>
                <div className='mb-4'>
                  <h1 className='text-xs font-bold text-[#40444C] mb-2.5 text-left'>Link Video</h1>
                  <input
                    className='block w-full bg-light text-black border rounded-[6px] py-3 px-4 mb-[20px] leading-tight focus:outline-none focus:bg-white text-xs'
                    id='link'
                    type='text'
                    placeholder='Enter the athletes name...'
                    value={formik.values.link}
                    onChange={(e) => formik.setFieldValue('link', e.target.value)}
                  />
                  <span className='text-red-500'>{formik.errors.link}</span>
                </div>
              </div>
              <div className='flex justify-center gap-6'>
                <button
                  type='button'
                  className='bg-[#EE393E] px-8 py-2 font-bold rounded-[10px] text-md text-white'
                  onClick={async () => {
                    const data = {
                      title: formik.values.title,
                      link: formik.values.link,
                    };

                    // Check if the link is a valid YouTube link
                    if (isValidYouTubeLink(data.link)) {
                      await formik.setFieldValue('video', [...formik.values.video, data]);
                      formik.setFieldValue('title', '');
                      formik.setFieldValue('link', '');
                      setModal2(false);
                    } else {
                      // Display an alert if the link is not valid
                      showToastMessage('Masukkan link YouTube yang valid', 'error');
                    }
                  }}>
                  Add
                </button>
                <button
                  type='button'
                  className='bg-[#EDEEF1] px-8 py-2 font-bold rounded-[10px] text-md text-[#25272C]'
                  onClick={() => {
                    formik.setFieldValue('title', '');
                    formik.setFieldValue('link', '');
                    setModal2(false);
                  }}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
        {modal === true && (
          <div className='fixed top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center w-full h-auto bg-opacity-50 bg-slate-800'>
            <div class='bg-white w-[729px]  px-[59px] py-[30px] rounded-lg text-center'>
              <div className='flex justify-end'>
                <button
                  type='button'
                  onClick={() => {
                    setModal(false);
                  }}>
                  <img
                    src={IconClose}
                    alt='IconClose'
                  />
                </button>
              </div>
              <h1 class='text-2xl font-bold mb-10 text-black'>Select Top News</h1>
              <div className='mb-[50px]'>
                <div className='border border-[#CACACA] max-h-[400px] overflow-y-auto rounded-[10px] px-8 py-7'>
                  {dataGetTopNews.map((accordion, index) => (
                    <AccordionCheckbox
                      key={index}
                      title={accordion?.name_sport}
                      options={accordion?.data}
                      selectedNews={selectedNews}
                      setSelectedNews={setSelectedNews}
                    />
                  ))}
                </div>
              </div>
              <div className='flex justify-end gap-6'>
                <button
                  type='button'
                  className='bg-[#EDEEF1] px-8 py-2 font-bold rounded-[10px] text-md text-[#25272C]'
                  onClick={() => setModal(false)}>
                  Cancel
                </button>
                <button
                  type='button'
                  className='bg-[#EE393E] px-8 py-2 font-bold rounded-[10px] text-md text-white'
                  onClick={() => {
                    setModal(false);
                  }}>
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
        {/* Modal buat kalo gak ada news */}
        {modal3 === true && (
          <div className='absolute top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center w-full h-full bg-opacity-50 bg-slate-800'>
            <div class='bg-white w-[729px] px-16 py-14 rounded-lg text-center'>
              <img
                src={VectorQuestion}
                alt='Vector Question'
                className='w-[100px] h-[100px] mx-auto mb-[20px]'
              />
              <h1 class='text-2xl font-bold mb-4 text-black'>News not yet available</h1>
              <h1 class='text-lg mb-[52px] text-black'>Please add news first on the news page</h1>
              <div className='flex justify-center gap-6'>
                <button
                  type='button'
                  className='bg-[#EE393E] px-8 py-2 font-bold rounded-md text-md text-white'
                  onClick={() => {
                    setModal3(false);
                  }}>
                  Create News
                </button>
                <button
                  type='button'
                  className='bg-[#EDEEF1] px-8 py-2 font-bold rounded-md text-md text-[#25272C]'
                  onClick={() => setModal3(false)}>
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

export default EditSport;
