import { useFormik } from 'formik';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { shallow } from 'zustand/shallow';

import { BackgroundAuth, IconEmail, IconPassword, IlustrasiLogin } from '../../../assets';
import { usePostLogin } from '../../../hooks/fetch/usePostLogin';
import { showToastMessage } from '../../../lib/toast';
import { useTokenStore } from '../../../stores';

const loginSchema = z.object({
  email: z.string({ required_error: 'Email tidak boleh kosong' })
    .email('Masukkan email yang valid')
    .refine(
      (email) => email === email.toLowerCase(),
      "Email tidak boleh mengandung huruf kapital"
    ),
  password: z
    .string({ required_error: 'Password tidak boleh kosong' })
    .min(8, 'Password harus berisi minimal 8 karakter'),
});

const initialValues = {
  email: '',
  password: '',
};

const Login = () => {
  const navigate = useNavigate();

  const [token, setToken, removeToken] = useTokenStore((state) => {
    return [state.token, state.setToken, state.removeToken];
  }, shallow);

  const { mutate: login } = usePostLogin({
    onSuccess: (data) => {
      showToastMessage('Login sukses', 'success');
      setToken(data?.data?.results?.data?.token);
      localStorage.setItem('token-npc', data?.data?.results?.data?.token);
      navigate('/dashboard');
    },
    onError: (error) => {
      if (error?.response?.status === 409) {
        showToastMessage('User tidak ditemukan', 'error');
      } else {
        showToastMessage('Periksa kembali inputan anda', 'error');
      }
    },
  });

  const formik = useFormik({
    validationSchema: toFormikValidationSchema(loginSchema),
    initialValues: initialValues,
    onSubmit: () => {
      login(formik.values);
    },
  });

  return (
    <div
      style={{ backgroundImage: `url(${BackgroundAuth})` }}
      className='min-h-screen bg-repeat-y bg-cover'>
      {/* <NavbarAuth onClickBack={() => navigate(-1)} navigateBack/> */}
      <div className='flex items-center justify-center h-screen px-5 lg:px-0'>
        <div
          className='py-[23px] lg:py-10 lg:w-[549px] bg-white/50'
          style={{ boxShadow: `0px 0px 4px 0px rgba(0, 0, 0, 0.25);`, backdropFilter: `blur(10px)`, borderRadius: 20 }}>
          <div className='flex justify-center mt-2.5 items-center'>
            <img
              src={IlustrasiLogin}
              alt='IlustrasiLogin'
            />
          </div>
          <h1
            className='mb-6 text-center text-2xl font-[600] text-white'
            style={{ fontFamily: 'Helvetica Neue' }}>
            Login{' '}
          </h1>
          <form onSubmit={formik.handleSubmit}>
            <div className='px-[22px] lg:px-[75px]'>
              <div className='relative mb-4'>
                <div className='absolute left-[10px] lg:left-[33px] lg:top-4 top-2'>
                  <img
                    src={IconEmail}
                    alt='Icon'
                  />
                </div>
                <input
                  className='bg-white py-2.5 lg:text-sm text-xs text-fill lg:py-4 w-full px-10 lg:px-16 rounded-xl'
                  placeholder='Email'
                  value={formik.values.email}
                  onChange={(e) => formik.setFieldValue('email', e.target.value)}
                />
                <span className='text-red-500'>{formik.errors.email}</span>
              </div>
              <div className='relative mb-7'>
                <div className='absolute left-[10px] lg:left-[33px] lg:top-4 top-2'>
                  <img
                    src={IconPassword}
                    alt='Icon'
                  />
                </div>
                <input
                  type='password'
                  className=' bg-white py-2.5 lg:text-sm text-xs text-fill lg:py-4 w-full px-10 lg:px-16 rounded-xl'
                  placeholder='Password'
                  value={formik.values.password}
                  onChange={(e) => formik.setFieldValue('password', e.target.value)}
                />
                <span className='text-red-500'>{formik.errors.password}</span>
              </div>
              <button
                className='bg-[#EE393E] hover:bg-[#D32F2F] transition duration-300 text-white font-bold py-2.5 lg:py-[14px] w-full text-center rounded-xl text-sm lg:text-base'
                type='submit'>
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
