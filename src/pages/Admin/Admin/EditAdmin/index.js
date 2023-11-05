import { useFormik } from 'formik';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';

import { FooterAdmin, HeaderAdmin, Sidebar } from '../../../../component';
import { useGetAdminById } from '../../../../hooks/fetch/admin/useGetAdminById';
import { usePutAdmin } from '../../../../hooks/fetch/admin/usePutAdmin';
import { showToastMessage } from '../../../../lib/toast';

const EditAdmin = () => {
  const navigate = useNavigate();
  let { state } = useLocation();
  const adminId = state.id;

  const { data: dataAdmin } = useGetAdminById(adminId);

  const { mutate: putAdmin } = usePutAdmin({
    onSuccess: () => {
      showToastMessage('Data berhasil diupdate', 'success');
      navigate(-1);
    },
    onError: () => {
      showToastMessage('Data gagal diupdate', 'error');
    },
  });

  const initialValues = {
    name: dataAdmin?.fullname,
    email: dataAdmin?.email,
    // password: dataAdmin?.password,
    password: '',
  };
  const adminSchema = z.object({
    name: z.string({ required_error: 'Name tidak boleh kosong' }),
    email: z.string({ required_error: 'Email tidak boleh kosong' })
    .refine((email) => email === email.toLowerCase(), 'Email tidak mengandung huruf boleh kapital')
    .refine((email) => {
      // Mengecek apakah email adalah email yang valid menggunakan regex
      const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
      return emailRegex.test(email);
    }, 'Email tidak valid'),
    password: z
      .string({ required_error: 'Password tidak boleh kosong' })
      .min(8, 'Password harus setidaknya terdiri dari 8 karakter'),
  });

  const formik = useFormik({
    validationSchema: toFormikValidationSchema(adminSchema),
    initialValues: initialValues,
    enableReinitialize: true,
    onSubmit: async () => {
      const data = {
        id: adminId,
        fullname: formik.values.name,
        email: formik.values.email,
        password: formik.values.password,
      };
      await putAdmin(data);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className='flex'>
        <Sidebar />
        <div className='w-screen -my-2 overflow-hidden'>
          <HeaderAdmin title='Admin' />
          <div className='px-8 py-[70px] min-h-screen'>
            <div className='py-[33px] px-[34px] shadow-card rounded-[10px]'>
              <h1 className='mb-8 text-xl font-bold'>Edit Admin</h1>
              <div className='mb-4'>
                <h1 className='text-base font-bold text-[#40444C] mb-2.5'>Name</h1>
                <input
                  className='appearance-none block w-full bg-light text-black border rounded-[12px] py-3 px-4 mb-[20px] leading-tight focus:outline-none focus:bg-white md:text-sm text-xs'
                  id='name'
                  type='text'
                  placeholder='Enter Name'
                  value={formik.values.name}
                  onChange={(e) => formik.setFieldValue('name', e.target.value)}
                />
                <span className='text-red-500'>{formik.errors.name}</span>
              </div>
              <div className='mb-4'>
                <h1 className='text-baseE font-bold text-[#40444C] mb-2.5'>Email</h1>
                <input
                  className='appearance-none block w-full bg-light text-black border rounded-[12px] py-3 px-4 mb-[20px] leading-tight focus:outline-none focus:bg-white md:text-sm text-xs'
                  id='name'
                  type='text'
                  placeholder='Enter Email'
                  value={formik.values.email}
                  onChange={(e) => formik.setFieldValue('email', e.target.value)}
                />
                <span className='text-red-500'>{formik.errors.email}</span>
              </div>
              <div className='mb-[50px]'>
                <h1 className='text-base font-bold text-[#40444C] mb-2.5'>New Password</h1>
                <input
                  className='appearance-none block w-full bg-light text-black border rounded-[12px] py-3 px-4 mb-[20px] leading-tight focus:outline-none focus:bg-white md:text-sm text-xs'
                  id='name'
                  type='text'
                  placeholder='Enter Password'
                  value={formik.values.password}
                  onChange={(e) => formik.setFieldValue('password', e.target.value)}
                />
                <span className='text-red-500'>{formik.errors.password}</span>
              </div>
              <div className='flex justify-end gap-6'>
                <button
                  type='submit'
                  className='bg-[#EE393E] px-8 py-2 font-bold rounded-md text-md text-white'>
                  Create
                </button>
                <button
                  onClick={() => {
                    navigate(-1);
                  }}
                  className='bg-[#EDEEF1] px-8 py-2 font-bold rounded-md text-md text-[#25272C]'>
                  Cancel
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

export default EditAdmin;
