import React, { useState } from 'react'
import { FooterAdmin, HeaderAdmin, Sidebar } from '../../../component'
import { BiCloudUpload, BiDownload } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import { IoMdArrowDropdown } from "react-icons/io";
import Api from '../../../lib/axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { showToastMessage } from '../../../lib/toast';

const ImportData = () => {

  const navigate = useNavigate()
    const [namepath, setNamePath] = useState('')
    const [file, setFile] = useState('')
    const [selectedImportFiles, setSelectedImportFiles] = useState('')
    const [selectedImportType, setSelectedImportType] = useState()

    const handleChangeFile = (e) => {
      const maxSize = 0.5 * 1024 * 1024
      const allowedExtensions = ['xlsx', 'xls'];
      const file = e.target.files[0]
      const fileExtension = file.name.split('.').pop().toLowerCase();
      if (file && file.size > maxSize){
          toast.error('file tidak boleh lebih dari 10 MB')
          setFile(null)
      }else if (!allowedExtensions.includes(fileExtension)){
        toast.error('file harus berformat excel')
      } else if (!selectedImportType){
        toast.error('Pilih kategori file yang akan di import terlebih dahulu!')
      } else{
          setNamePath(e.target.files[0].name)
          setFile(e.target.files[0])
          ImportFile(file)
      }
  }


  const ImportFile = async(file) => {
    const dataForm = new FormData();
    dataForm.append('file', file);
    try {
        if (selectedImportType === 'Sport') {
            const response = await Api.post('/import-sports/import-data-sport', dataForm)
            showToastMessage('Data berhasil ditambahkan', 'success');
            navigate('/list-sport')
            console.log(response)
        } else if (selectedImportType === 'News') {
            const response = await Api.post('/import-news/import-data-news', dataForm)
            showToastMessage('Data berhasil ditambahkan', 'success');
            navigate('/list-news')
            console.log(response)
        } else if (selectedImportType === 'Athletes'){
            const response = await Api.post('/import-atheletes/import-data-atheletes', dataForm)
            showToastMessage('Data berhasil ditambahkan', 'success');
            navigate('/list-athletes')
            console.log(response)
        } else {
            const response = await Api.post('/import-event/import-data-event', dataForm)
            showToastMessage('Data berhasil ditambahkan', 'success');
            navigate('/list-event')
            console.log(response)
        }
    } catch (error) {
        toast.error(error.response.data.message)
        console.log(error)
    }
  }



  return (
    <form >
    <div className='flex'>
      <Sidebar />
      <div className='w-screen -my-2 overflow-hidden'>
        <HeaderAdmin title='Import Data' />
        <div className='px-8 py-[70px] min-h-screen'>
          <div className='space-y-[32px] bg-white px-[46px] py-[40px] rounded-[12px] border'>
                      <div className='space-y-1'>
                          <h1 className='text-[#272B30] font-[600] text-[20px]'>Import Data</h1>
                          <h1 className='text-[#737373] text-[14px]'>Import a file to update external data </h1>
                      </div>
                      <div className='space-y-1'>
                          <h1 className='text-[#272B30] text-[16px] font-[600]'>Step :</h1>
                          <h1 className='text-[#464E5F] text-[14px]'>Follow these steps to perform the correct import</h1>
                          <ol className='list-decimal text-[#464E5F] text-[14px] list-outside ml-3'>
                              <li>
                              In the download template section, select the template type according to the correct filling order, Make sure you follow the correct document import sequence, namely:
                              </li>
                          </ol>
                          <ol className='list-decimal text-[#464E5F] text-[14px] list-outside ml-3' start={2}>
                              <li>
                                Then click <span className='font-bold'>‘Download Template’</span>
                              </li>
                              <li>
                                Fill in the data according to the template provided
                              </li>
                              <li>
                                Make sure the data you fill in is correct
                              </li>
                              <li>
                                  After all the data is filled in, click <span className='font-bold'>‘Choose File’</span> to upload, then click <span className='font-bold'>‘Upload File’</span>
                              </li>
                          </ol>
                      </div>
                      <div className='space-y-1'>
                          <h1 className='text-[#272B30] text-[16px] font-[600]'>Download Template :</h1>
                          <div className='flex items-center gap-[8px]'>
                              <div className='relative'>
                                  <select onChange={(e) => setSelectedImportFiles(e.target.value)} className='text-[#6B7280] text-[11px] outline-none font-medium rounded-md w-[227px] border py-[11px] pl-[9px] pr-[16px] shadow-sm appearance-none'>
                                      <option selected className='text-[#6B7280] font-normal '>Select Template Type...</option>
                                      <option className='text-[#25272C]' value="Sport">Sport</option>
                                      <option className='text-[#25272C]' value="News">News</option>
                                      <option className='text-[#25272C]' value="Athletes">Athletes</option>
                                      <option className='text-[#25272C]' value="Event">Event</option>
                                  </select>
                                  <IoMdArrowDropdown className='absolute top-[10px] right-3 text-[#A8A8A8] text-xl'/>
                              </div>
                              <button className='flex bg-[#1479BD] items-center justify-center px-[8px] py-[7px] gap-[4px] rounded-lg text-white font-medium text-[14px]'>
                                  <BiDownload className='text-xl'/>
                                  {selectedImportFiles === 'Sport' ? (
                                    <a href={process.env.REACT_APP_MODE == "dev" ? process.env.REACT_APP_API_IMAGE_URL_STAGING : process.env.REACT_APP_API_IMAGE_URL_PROD  + 'public/assets/templates/Sport.xlsx'}>Download Template</a>
                                  ) : selectedImportFiles === 'News' ? (
                                        <a href={process.env.REACT_APP_MODE == "dev" ? process.env.REACT_APP_API_IMAGE_URL_STAGING : process.env.REACT_APP_API_IMAGE_URL_PROD  + 'public/assets/templates/News.xlsx'}>Download Template</a>
                                  ) : selectedImportFiles === 'Athletes' ? (
                                        <a href={process.env.REACT_APP_MODE == "dev" ? process.env.REACT_APP_API_IMAGE_URL_STAGING : process.env.REACT_APP_API_IMAGE_URL_PROD  + 'public/assets/templates/Athletes.xlsx'}>Download Template</a>
                                  ) :  (
                                    <a href={process.env.REACT_APP_MODE == "dev" ? process.env.REACT_APP_API_IMAGE_URL_STAGING : process.env.REACT_APP_API_IMAGE_URL_PROD  + 'public/assets/templates/Event.xlsx'}>Download Template</a>
                                  )} 
                              </button>
                          </div>
                      </div>
                      <div className='space-y-1'>
                          <h1 className='text-[#272B30] text-[16px] font-[600]'>Upload File <span className='text-[#780000] ml-[4px]'>*</span></h1>
                          <div className='flex items-center gap-[8px]'>
                              <div className='relative'>
                                  <select onChange={(e) => setSelectedImportType(e.target.value)} className='text-[#6B7280] text-[11px] outline-none font-medium rounded-md w-[227px] border py-[11px] pl-[9px] pr-[16px] shadow-sm appearance-none'>
                                      <option selected className='text-[#6B7280] font-normal '>Select Import Type...</option>
                                      <option className='text-[#25272C]' value="Sport">Sport</option>
                                      <option className='text-[#25272C]' value="News">News</option>
                                      <option className='text-[#25272C]' value="Athletes">Athletes</option>
                                      <option className='text-[#25272C]' value="Event">Event</option>
                                  </select>
                                  <IoMdArrowDropdown className='absolute top-[10px] right-3 text-[#A8A8A8] text-xl'/>
                              </div>
                          </div>
                          <h1 className='text-[#C1121F] text-[8px]'>*Upload File max 500 kb</h1>
                          <div className='flex items-center gap-[13px]'>
                              <label htmlFor='upload-file' className='cursor-pointer'>
                                  <div className='border shadow-sm rounded-lg relative text-center justify-center px-[70px] py-[11px] w-[227px]'>
                                      <h1 className='text-[#8E95A2] text-[12px] font-medium'>Choose File</h1>
                                  </div>
                                  <input type='file' id='upload-file' accept=".xlsx, .xls" onChange={(e) => handleChangeFile(e)}  className='rounded-[12px] outline-none border border-[#E3E8F1] w-foll px-[20px] py-[15px] hidden' required/>
                              </label>
                              {/* <button  className='flex bg-[#1479BD] items-center justify-center px-[8px] py-[7px] gap-[4px] rounded-lg text-white font-medium text-[14px]'>
                                  <BiCloudUpload className='text-xl'/>
                                  <h1>Upload File</h1>
                              </button> */}
                          </div>
                          {(namepath && file) && 
                              <div className='py-[6px] px-[8px] bg-[#D8DBDF] rounded flex gap-[8px] justify-between w-fit'>
                                  <h1 className='text-[10px] text-[#737373] truncate'>{namepath}</h1>
                                  <button onClick={() => setFile('')}> <RxCross2 className='text-sm'/></button>
                              </div>
                          }
                      </div>
          </div>
        </div>
        <FooterAdmin />
      </div>
    </div>
  </form>



  )
}

export default ImportData