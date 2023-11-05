import { useFormik } from 'formik';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';

import { FooterAdmin, HeaderAdmin, Sidebar, TinyMce } from '../../../../component';
import { useGetNewsById } from '../../../../hooks/fetch/news/useGetNewsById';
import { usePutNews } from '../../../../hooks/fetch/news/usePutNews';
import { useGetSports } from '../../../../hooks/fetch/sport/useGetSports';
import { showToastMessage } from '../../../../lib/toast';
import { isValidBase64 } from '../../../../lib/utils';
import { useGetNews } from '../../../../hooks/fetch/news/useGetNews';
import { useDebounce } from 'use-debounce';

const newsSchema = z.object({
  title: z.string({ required_error: 'Title tidak boleh kosong' }),
  description: z.string({ required_error: 'Description tidak boleh kosong' }),
  news_type: z.string({ required_error: 'News type tidak boleh kosong' }),
  date: z.string({ required_error: 'Date tidak boleh kosong' }),
  image: z.string({ required_error: 'Image tidak boleh kosong' }),
});

const CreateNews = () => {
  const navigate = useNavigate();
  let { state } = useLocation();
  const newsId = state.id;
  const editorRef = useRef(null);

  const getContentTinyMce = (data) => {
    formik.setFieldValue('description', data);
  };

  const { data: dataGetNewsById } = useGetNewsById(newsId);
  const { data: dataGetSports } = useGetSports(0, 1, '');

  const {
    data: dataGetNews,
    isLoading: isLoadingDataNews,
    refetch: refetchDataNews,
  } = useGetNews(0, 1);

  const { mutate: updateNews } = usePutNews({
    onSuccess: () => {
      showToastMessage('Data berhasil diupdate', 'success');
      navigate(-1);
    },
    onError: () => {
      showToastMessage('Data gagal diupdate', 'error');
    },
  });

  const imagePath = process.env.REACT_APP_MODE == "dev" ? process.env.REACT_APP_API_IMAGE_URL_STAGING : process.env.REACT_APP_API_IMAGE_URL_PROD  + dataGetNewsById?.image;
  const [image, setImage] = useState('');

  useEffect(() => {
    if (dataGetNewsById !== undefined) {
      setImage(imagePath);
    }
  }, [dataGetNewsById]);

  const initialValues = {
    title: dataGetNewsById?.title,
    description: dataGetNewsById?.description,
    news_type: dataGetNewsById?.news_type?.id,
    date: moment(dataGetNewsById?.date).format('YYYY-MM-DD'),
    image: dataGetNewsById?.image,
  };

  const formik = useFormik({
    validationSchema: toFormikValidationSchema(newsSchema),
    initialValues: initialValues,
    enableReinitialize: true,
    onSubmit: async () => {
      if (isValidBase64(formik.values.image)) {
        const data = {
          id: newsId,
          title: formik.values.title,
          description: formik.values.description,
          news_type: formik.values.news_type,
          date: formik.values.date,
          image: formik.values.image,
        };
        await updateNews(data);
        refetchDataNews()
      } else {
        const data = {
          id: newsId,
          title: formik.values.title,
          description: formik.values.description,
          news_type: formik.values.news_type,
          date: formik.values.date,
          image: formik.values.image,
        };
        await updateNews(data);
        refetchDataNews()
      }
    },
  });

  if (!dataGetNewsById) {
    return null;
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className='flex'>
        <Sidebar />
        <div className='w-screen -my-2 overflow-hidden'>
          <HeaderAdmin title='News' />
          <div className='px-8 py-[70px]'>
            <div className='py-[33px] px-[34px] shadow-card rounded-[10px]'>
              <h1 className='mb-8 text-xl font-bold'>Edit News</h1>
              <div className='mb-4'>
                <h1 className='text-base font-bold text-[#40444C] mb-2.5'>Title News</h1>
                <input
                  className='appearance-none block w-full bg-light text-black border rounded-[12px] py-3 px-4 leading-tight focus:outline-none focus:bg-white md:text-sm text-xs'
                  id='name'
                  type='text'
                  value={formik.values.title}
                  placeholder='Name sport'
                  onChange={(e) => formik.setFieldValue('title', e.target.value)}
                />
                <span className='text-red-500'>{formik.errors.title}</span>
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
                <h1 className='text-base font-bold text-[#40444C] mb-2.5'>News Type</h1>
                <select
                  value={formik.values.news_type}
                  className='appearance-none block w-full bg-light text-black border rounded-[12px] py-3 px-4 mb-[20px] leading-tight focus:outline-none focus:bg-white md:text-sm text-xs'
                  id='debut'
                  onChange={(e) => formik.setFieldValue('news_type', e.target.value)}>
                  <option
                    value=''
                    disabled>
                    Select news type...
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
                <span className='text-red-500'>{formik.errors.news_type}</span>
              </div>
              <div className='mb-4'>
                <h1 className='text-base font-bold text-[#40444C] mb-2.5'>Date</h1>
                <input
                  className='appearance-none block w-full bg-light text-black border rounded-[12px] py-3 px-4 mb-[20px] leading-tight focus:outline-none focus:bg-white md:text-sm text-xs'
                  id='opening'
                  type='date'
                  value={formik.values.date}
                  onChange={(e) => formik.setFieldValue('date', e.target.value)}
                  placeholder='Enter the opening date...'
                />
                <span className='text-red-500'>{formik.errors.date}</span>
              </div>
              <div className='mb-4'>
                <h1 className='text-base font-bold text-[#40444C] mb-2.5'>Description</h1>
                <TinyMce
                  getContentTinyMce={getContentTinyMce}
                  setDataTinyMce={formik.values.description}
                />
                <span className='text-red-500'>{formik.errors.description}</span>
              </div>
              <div className='flex gap-6 justify-end mt-[50px]'>
                <button
                  type='button'
                  className='bg-[#EDEEF1] px-8 py-2 font-bold rounded-[10px] text-md text-[#25272C]'
                  onClick={() => navigate(-1)}>
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
      </div>
    </form>
  );
};

export default CreateNews;
