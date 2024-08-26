import React from 'react'
import { ContactNavbar } from './ContactNavbar'

import logo from '../../../assets/images/webp/logoBig.webp'
import bgOverlay from '../../../assets/images/webp/postOverlay.webp'
import { BiSolidPhoneCall } from 'react-icons/bi'
import { FaFacebookF } from 'react-icons/fa'

export const ContactBigSize = () => {
    return (
        <div>
            <div className='  w-full h-full'>
                <div className=' pt-[70px]'>
                    <div className='relative bg-[#AFE7FF] h-[200px]'>
                        <img src={logo} alt=""
                            className=' w-[240px] absolute left-[50%] -translate-x-1/2 -bottom-[120px]'
                        />
                    </div>
                </div>
                <div className='w-full container max-w-[350px] mx-auto sm:max-w-[600px] md:max-w-[720px] lg:max-w-[900px] sm:mt-44 md:mt-52 pb-20'>
                    <div className=' rounded-lg bg-white shadow-[0px_-2px_24.7px_0px_#00000024]'>
                        <div className=' p-4 flex gap-x-10 items-center sm:h-[400px] md:h-[480px]'>
                            <div className=' flex-[2] h-full'>
                                <div className=' w-full bg-[#01A7B1] h-full relative z-10 rounded-lg'>
                                    <img src={bgOverlay} alt=""
                                        className=' absolute z-0 w-full h-full opacity-20 object-cover rounded-lg'
                                    />
                                    <div className='relative z-20 h-full flex flex-col gap-y-5  text-white px-5'>
                                        <h2 className=' sm:text-[16px] lg:text-[24px] mt-10 lg:mt-20'>
                                            ຖ້າທ່ານມີຄຳຖາມກະລຸນາຕິດຕໍ່
                                        </h2>
                                        <p>
                                            Lorem ipsum dolor sit amet,  consectetur adipiscing elit, <br /> sed do eiusmod tempor
                                        </p>
                                        <div className=' flex flex-col gap-y-3 lg:gap-y-7 mt-5'>
                                            <div className=' flex items-center gap-x-3 text-[16px]'>
                                                <BiSolidPhoneCall className=' sm:text-[24px] md:text-[30px]' />
                                                <p className=' sm:text-[12px] lg:text-[18px]'>20 xxxx xx00</p>
                                            </div>
                                            <div className=' flex items-center gap-x-3 text-[16px]'>
                                                <FaFacebookF className=' sm:text-[24px] md:text-[30px]' />
                                                <p className=' sm:text-[12px] lg:text-[18px]'>ບີທີພີ ທຶນຮຽນຕໍ່ຕ່າງປະເທດ</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className=' flex-[3]'>
                                <div className=' flex gap-x-5'>
                                    <div className=' flex flex-col w-full gap-y-2'>
                                        <label htmlFor="fullname">
                                            ຊື່ ແລະ ນາມສະກຸນ
                                        </label>
                                        <input type="text"
                                            className=' border rounded-md w-full text-[16px] pl-6 py-2 placeholder:text-[14px] outline-[#01A7B1]'
                                            placeholder='ປ້ອນຊື່ ແລະ ນາມສະກຸນ'
                                        />
                                    </div>
                                    <div className=' flex flex-col w-full gap-y-2'>
                                        <label htmlFor="email">
                                            Email
                                        </label>
                                        <input type="email"
                                            className=' border rounded-md w-full text-[16px] pl-6 py-2 placeholder:text-[14px] outline-[#01A7B1]'
                                            placeholder='ປ້ອນອີເມລ'
                                        />
                                    </div>
                                </div>
                                <div className=' mt-7 w-full'>
                                    <label htmlFor="email">
                                        ເບີໂທ
                                    </label>
                                    <input type="email"
                                        className=' border rounded-md w-full text-[16px] pl-6 py-2 placeholder:text-[14px] outline-[#01A7B1]'
                                        placeholder='ປ້ອນເບີໂທ'
                                    />
                                </div>

                                <div className=' mt-7 w-full'>
                                    <h4 className=' font-medium text-[#01A7B1] mb-2'>
                                        Message
                                    </h4>
                                    <textarea rows="5"
                                        placeholder='Write here the Message'
                                        className=' border-b-2 w-full resize-none'
                                    ></textarea>
                                </div>
                                <div className=' mt-10'>
                                    <button className=' bg-[#01A7B1] px-6 py-2 rounded-md text-white font-normal'>
                                        ສົ່ງຂໍ້ຄວາມ
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
