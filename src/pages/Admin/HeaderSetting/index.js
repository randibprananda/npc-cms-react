import React, { useEffect, useState } from 'react'
import { FooterAdmin, HeaderAdmin, Sidebar, TinyMce } from '../../../component';
import { useFormik } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { showToastMessage } from '../../../lib/toast';
import { IconClose, IconVideo } from '../../../assets';
import { usePostHeader } from '../../../hooks/fetch/header/usePostHeader';
import { useGetHeader } from '../../../hooks/fetch/header/useGetHeader';
   
const HeaderSetting = () => {
  const { data: dataHeader, refetch: refetchGetHeader, isLoading: isLoadingGetHeader } = useGetHeader()


  const navigate = useNavigate();
  const [videoTittle, setVideoTittle] = useState()
  const [linkVideo, setLinkVideo] = useState()
  const [modalAddVideo, setModalAddVideo] = useState(false)

  const { mutate: postHeader } = usePostHeader({
    onSuccess: () => {
      refetchGetHeader()
      showToastMessage('Data berhasil ditambahkan', 'success');
    },
    onError: () => {
      showToastMessage('Data gagal ditambahkan', 'error');
    },
  });

  useEffect(() => {
    if (dataHeader) {
      setVideoTittle(dataHeader.video_title)
      setLinkVideo(dataHeader.video_link)
    }
  }, [dataHeader])
  
  const initialValues = {
    video_title: videoTittle ,
    video_link: linkVideo,
    about_npc: dataHeader?.about,
    office_info: dataHeader?.officeInfo,
    organization_structure: dataHeader?.organization_structure,
    email: dataHeader?.email,
    whatsapp: dataHeader?.whatsapp,
    facebook: dataHeader?.facebook,
    instagram: dataHeader?.instagram,
    youtube: dataHeader?.youtube,
    twitter: dataHeader?.twiter,
    tiktok: dataHeader?.tiktok,
  };
  

  const addHeaderSchema = z.object({
    // video_title: z.string({ required_error: 'Judul video tidak boleh kosong' }),
    // video_link: z.string({ required_error: 'Link tidak boleh kosong' }),
    about_npc: z.string({ required_error: 'About NPC tidak boleh kosong' }),
    office_info: z.string({ required_error: 'Office Info tidak boleh kosong' }),
    organization_structure: z.string({ required_error: 'Organization Structure tidak boleh kosong' }),
    email: z.string({ required_error: 'Email tidak boleh kosong' })
    .refine((email) => email === email.toLowerCase(), 'Email boleh mengandung huruf kapital')
    .refine((email) => {
      // Mengecek apakah email adalah email yang valid menggunakan regex
      const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
      return emailRegex.test(email);
    }, 'Email tidak valid'),
    whatsapp:z.string({ required_error: 'WhatsApp tidak boleh kosong' })
    .refine((whatsapp) => {
      // Mengecek apakah WhatsApp dimulai dengan +62
      if (!whatsapp.startsWith('+62')) {
        return false; // Nomor WhatsApp tidak dimulai dengan +62
      }
      // Mengecek apakah tidak ada huruf dalam nomor WhatsApp
      const onlyDigits = /^\+62\d+$/;
      return onlyDigits.test(whatsapp);
    }, 'WhatsApp harus dimulai dengan +62 dan tidak boleh mengandung huruf')
    //   facebook: z.string({ required_error: 'Facebook tidak boleh kosong' })
    //   .refine((facebook) => {
    //       const facebookRegex = /facebook\.com\//;
    //       return facebookRegex.test(facebook);
    //   }, 'Link Facebook tidak valid'),
    //   instagram: z.string({ required_error: 'Instagram tidak boleh kosong' })
    //   .refine((instagram) => {
    //     const instagramRegex = /instagram\.com\//;
    //     return instagramRegex.test(instagram);
    // }, 'Link Instagram tidak valid'),
    //   youtube: z.string({ required_error: 'Youtube tidak boleh kosong' })
    //   .refine((youtube) => {
    //     const youtubeRegex = /youtube\.com\//;
    //     return youtubeRegex.test(youtube);
    // }, 'Link Youtube tidak valid'),
    //   twitter: z.string({ required_error: 'Twitter tidak boleh kosong' })
    //   .refine((twitter) => {
    //     const twitterRegex = /twitter\.com\//;
    //     return twitterRegex.test(twitter);
    // }, 'Link Twitter tidak valid'),
  });

  const contentNpc = (data) => {
    formik.setFieldValue('about_npc', data);
  };
  const contentAbout = (data) => {
    formik.setFieldValue('office_info', data);
  };
  const contentOrganizationStructure = (data) => {
    formik.setFieldValue('organization_structure', data);
  };

  const formik = useFormik({
    validationSchema: toFormikValidationSchema(addHeaderSchema),
    initialValues: initialValues,
    enableReinitialize: true,
    onSubmit: async () => {
      const data = {
        video_title: videoTittle,
        video_link: linkVideo,
        about: formik.values.about_npc,
        officeInfo: formik.values.office_info,
        organization_structure: formik.values.organization_structure,
        email: formik.values.email,
        whatsapp: formik.values.whatsapp,
        facebook: formik.values.facebook,
        instagram: formik.values.instagram,
        youtube: formik.values.youtube,
        twitter: formik.values.twitter,
        tiktok: formik.values.tiktok,
      };
      await postHeader(data);
    },
  });

  useEffect(() => {

  })
  
  if (!dataHeader) {
    return <div>Loading...</div>;
  }

    return (
      <form onSubmit={formik.handleSubmit}>
        <div className='flex'>
          <Sidebar />
          <div className='w-screen -my-2 overflow-hidden'>
            <HeaderAdmin title='Header' />
            <div className='px-8 py-[70px] min-h-screen'>
              <div className='py-[33px] px-[34px] shadow-card rounded-[10px]'>
                <h1 className="text-black text-xl font-bold mb-[32px]">Header Setting</h1>

                <div className='space-y-[16px]'>
                  <div>
                    <h1 className='text-base font-bold text-[#40444C] mb-2.5'>Dashboard  Landing Page Video</h1>
                    <div
                      className='flex w-full bg-light  border rounded-[12px] justify-between items-center px-4 py-3 text-left mb-4 cursor-pointer'
                      onClick={() => setModalAddVideo(true)}>
                      <h1 className='text-[#8E95A2] md:text-sm text-xs'>Enter the video link...</h1>
                      <button type='button'>
                        <img
                          src={IconVideo}
                          alt='IconVideo'
                        />
                      </button>
                    </div>
                  </div>

                  <div>
                    <div className='mb-4'>
                      <h1 className='text-base font-bold text-[#40444C] mb-2.5'>About NPC</h1>
                      <TinyMce
                        getContentTinyMce={contentNpc}
                        setDataTinyMce={formik.values.about_npc}
                      />
                      <span className='text-red-500'>{formik.errors.about_npc}</span>
                    </div>
                  </div>

                  <div>
                    <div className='mb-4'>
                      <h1 className='text-base font-bold text-[#40444C] mb-2.5'>Office Info</h1>
                      <TinyMce
                        getContentTinyMce={contentAbout}
                        setDataTinyMce={formik.values.office_info}
                      />
                      <span className='text-red-500'>{formik.errors.office_info}</span>
                    </div>
                  </div>

                  <div>
                    <div className='mb-4'>
                      <h1 className='text-base font-bold text-[#40444C] mb-2.5'>Organization Structure</h1>
                      <TinyMce
                        getContentTinyMce={contentOrganizationStructure}
                        setDataTinyMce={formik.values.organization_structure}
                      />
                      <span className='text-red-500'>{formik.errors.organization_structure}</span>
                    </div>
                  </div>

                  <div>
                    <h1 className='text-base font-bold text-[#40444C] mb-2.5'>Help</h1>
                    <div className='flex items-center justify-between gap-[21px]'>
                      <div className='w-full'>
                        <h1 className="text-gray-400 text-xs mb-[9px]">Email</h1>
                        <input className='block w-full bg-light text-black border rounded-[6px] py-3 px-4 leading-tight focus:outline-none focus:bg-white text-xs' id='email' value={formik.values.email} onChange={(e) => formik.setFieldValue('email', e.target.value)} type='text' placeholder='Enter Email...'/>
                        <span className='text-red-500 text-xs'>{formik.errors.email}</span>

                      </div>
                      <div className='w-full'>
                        <h1 className="text-gray-400 text-xs mb-[9px]">Whatsapp</h1>
                        <input className='block w-full bg-light text-black border rounded-[6px] py-3 px-4 leading-tight focus:outline-none focus:bg-white text-xs' id='whatsapp' value={formik.values.whatsapp} onChange={(e) => formik.setFieldValue('whatsapp', e.target.value)} type='text' placeholder='Enter Whatsapp...'/>
                        <span className='text-red-500 text-xs'>{formik.errors.whatsapp}</span>

                      </div>
                    </div>
                  </div>

                  <div>
                    <h1 className='text-base font-bold text-[#40444C] mb-2.5'>Social Media</h1>

                    <div className='space-y-[12px]'>
                      <div className='flex items-center justify-between gap-[21px]'>
                        <div className='w-full'>
                          <h1 className="text-gray-400 text-xs mb-[9px]">Facebook</h1>
                          <input className='block w-full bg-light text-black border rounded-[6px] py-3 px-4 leading-tight focus:outline-none focus:bg-white text-xs' id='facebook' value={formik.values.facebook} onChange={(e) => formik.setFieldValue('facebook', e.target.value)} type='text' placeholder='Enter Facebook Link...'/>

                        </div>
                        <div className='w-full'>
                          <h1 className="text-gray-400 text-xs mb-[9px]">Instagram</h1>
                          <input className='block w-full bg-light text-black border rounded-[6px] py-3 px-4 leading-tight focus:outline-none focus:bg-white text-xs' id='instagram' value={formik.values.instagram} onChange={(e) => formik.setFieldValue('instagram', e.target.value)} type='text' placeholder='Enter Instagram Link...'/>
                      

                        </div>
                      </div>
                      <div className='flex items-center justify-between gap-[21px]'>
                        <div className='w-full'>
                          <h1 className="text-gray-400 text-xs mb-[9px]">Youtube</h1>
                          <input className='block w-full bg-light text-black border rounded-[6px] py-3 px-4 leading-tight focus:outline-none focus:bg-white text-xs' id='youtube' value={formik.values.youtube} onChange={(e) => formik.setFieldValue('youtube', e.target.value)} type='text' placeholder='Enter Youtube Link...'/>

                        </div>
                        <div className='w-full'>
                          <h1 className="text-gray-400 text-xs mb-[9px]">Twitter</h1>
                          <input className='block w-full bg-light text-black border rounded-[6px] py-3 px-4 leading-tight focus:outline-none focus:bg-white text-xs' id='twitter' value={formik.values.twitter} onChange={(e) => formik.setFieldValue('twitter', e.target.value)} type='text' placeholder='Enter Twitter Link...'/>

                        </div>
                      </div>
                      <div className='flex items-center justify-between gap-[21px]'>
                        <div className='w-1/2'>
                          <h1 className="text-gray-400 text-xs mb-[9px]">Tiktok</h1>
                          <input className='block w-full bg-light text-black border rounded-[6px] py-3 px-4 leading-tight focus:outline-none focus:bg-white text-xs' id='tiktok' value={formik.values.tiktok} onChange={(e) => formik.setFieldValue('tiktok', e.target.value)} type='text' placeholder='Enter Tiktok Link...'/>

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='flex gap-6 justify-end mt-[50px]'>
                  {/* <button
                    type='button'
                    className='bg-[#EDEEF1] px-8 py-2 font-bold rounded-[10px] text-md text-[#25272C]'
                    onClick={() => navigate(-1)}>
                    Cancel
                  </button> */}
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
          {/* Modal Disini */}
          {modalAddVideo && (
            <>
            <div className='fixed top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center w-full h-auto bg-opacity-50 bg-slate-800'>
              <div class='bg-white w-[729px] px-[59px] py-[30px] rounded-lg text-center'>
                <div className='flex justify-end items-center mb-[18px]'>
                  <button type='button' onClick={() => {setModalAddVideo(false);}}>
                    <img src={IconClose} alt='IconClose'/>
                  </button>
                </div>
                <h1 className="text-zinc-800 text-2xl font-bold mb-[38px]">Add Video</h1>
                <div className='space-y-[16px] mb-[50px]'>
                    <div>
                      <div className="text-zinc-700 text-xs font-bold mb-[8px] text-start">Video Title</div>
                      <input className='block w-full bg-light text-black border rounded-[6px] py-3 px-4  leading-tight focus:outline-none focus:bg-white text-xs' id='title' value={videoTittle} onChange={(e) => setVideoTittle(e.target.value)} type='text' placeholder='Enter Video Title...'/>
                    </div>
                    <div>
                      <div className="text-zinc-700 text-xs font-bold mb-[8px] text-start">Link Video</div>
                      <input className='block w-full bg-light text-black border rounded-[6px] py-3 px-4  leading-tight focus:outline-none focus:bg-white text-xs' id='link' value={linkVideo} onChange={(e) => setLinkVideo(e.target.value)} type='text' placeholder='Enter Video link...'/>
                    </div>
                </div>

                <div className='flex justify-center gap-6'>
                <button
                  type='button'
                  className='bg-[#EE393E] px-8 py-2 font-bold rounded-[10px] text-md text-white'
                  onClick={() => {
                    setModalAddVideo(false);
                  }}>
                  Add
                </button>
                <button
                  type='button'
                  className='bg-[#EDEEF1] px-8 py-2 font-bold rounded-[10px] text-md text-[#25272C]'
                  onClick={() => setModalAddVideo(false)}>
                  Cancel
                </button>
              </div>
              </div>
            </div>

            </>
          )}
        </div>
      </form>
    )
}

export default HeaderSetting