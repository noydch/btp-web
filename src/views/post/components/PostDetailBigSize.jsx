import React, { useEffect, useState } from 'react'
import { PostNavbar } from '../../post/components/PostNavbar.jsx.jsx'
import { useParams } from 'react-router-dom';
import { cardPostData } from '../cardPostData.jsx';
import { Navbar } from '../../../components/Navbar.jsx';

import { LuDot } from "react-icons/lu";
import { GoDotFill } from "react-icons/go";
import { IoMdCheckmark, IoMdPin } from 'react-icons/io';
import { IoLogoWhatsapp } from "react-icons/io";
import { FiDownload } from "react-icons/fi";
import { BiSolidPhoneCall } from "react-icons/bi";
import { IoMdCheckmarkCircle } from "react-icons/io";

// image
import bgPostOverlay from '../../../assets/images/webp/postOverlay.webp'
import { FaFacebook, FaFacebookF } from 'react-icons/fa';

export const PostDetailBigSize = ({ postData }) => {
    const id = useParams()
    const postID = id.pID;


    return (
        <Navbar>
            <div className=' pt-[80px] w-full h-full '>
                <div className='container h-full max-w-[350px] mx-auto sm:max-w-[600px] md:max-w-[720px] xl:max-w-[1200px] pb-10'>
                    {
                        postData.map((item, index) => (
                            item.id == postID && (
                                <div key={index}
                                    className=' w-full h-[550px] rounded-lg'
                                >
                                    <img src={item.image} alt=""
                                        className=' w-full h-full rounded-lg object-cover'
                                    />
                                </div>
                            )
                        ))
                    }
                    <div className=' grid grid-cols-12 mt-20 sm:gap-x-3 xl:gap-x-4'>
                        <div className=' lg:col-span-9 col-span-8 '>
                            <div className=' flex flex-col gap-y-5'>
                                <h1 className=' sm:text-[18px] md:text-[22px] font-medium'>
                                    ລາຍລະອຽດກ່ຽວກັບທຶນ
                                </h1>
                                <p className=' sm:text-[12px] text-[14px]'>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                </p>
                            </div>
                            <div className=' mt-14'>
                                <h1 className='sm:text-[18px] md:text-[22px] font-medium mb-5'>
                                    ຂໍ້ມູນຂອງທຶນ
                                </h1>
                                <div className=' flex items-center gap-x-10'>
                                    <div className=' flex flex-col gap-y-5'>
                                        <div className=' flex items-center gap-x-4'>
                                            <div className=' w-[10px] h-[10px] flex items-center justify-center rounded-full bg-[#01a7b1]'>
                                                <IoMdCheckmark className=' text-[20px] text-white' />
                                            </div>
                                            <p className=' sm:text-[12px] md:text-[14px]'>
                                                Basic communication in English in
                                                everyday situations.
                                            </p>
                                        </div>
                                        <div className=' flex items-center gap-x-4'>
                                            <div className=' w-[10px] h-[10px] flex items-center justify-center rounded-full bg-[#01a7b1]'>
                                                <IoMdCheckmark className=' text-[20px] text-white' />
                                            </div>
                                            <p className=' sm:text-[12px] md:text-[14px]'>
                                                Basic communication in English in
                                                everyday situations.
                                            </p>
                                        </div>
                                        <div className=' flex items-center gap-x-4'>
                                            <div className=' w-[10px] h-[10px] flex items-center justify-center rounded-full bg-[#01a7b1]'>
                                                <IoMdCheckmark className=' text-[20px] text-white' />
                                            </div>
                                            <p className=' sm:text-[12px] md:text-[14px]'>
                                                Basic communication in English in
                                                everyday situations.
                                            </p>
                                        </div>
                                    </div>
                                    <div className=' flex flex-col gap-y-5'>
                                        <div className=' flex items-center gap-x-4'>
                                            <div className=' w-[10px] h-[10px] flex items-center justify-center rounded-full bg-[#01a7b1]'>
                                                <IoMdCheckmark className=' text-[20px] text-white' />
                                            </div>
                                            <p className=' sm:text-[12px] md:text-[14px]'>
                                                Basic communication in English in
                                                everyday situations.
                                            </p>
                                        </div>
                                        <div className=' flex items-center gap-x-4'>
                                            <div className=' w-[10px] h-[10px] flex items-center justify-center rounded-full bg-[#01a7b1]'>
                                                <IoMdCheckmark className=' text-[20px] text-white' />
                                            </div>
                                            <p className=' sm:text-[12px] md:text-[14px]'>
                                                Basic communication in English in
                                                everyday situations.
                                            </p>
                                        </div>
                                        <div className=' flex items-center gap-x-4'>
                                            <div className=' w-[10px] h-[10px] flex items-center justify-center rounded-full bg-[#01a7b1]'>
                                                <IoMdCheckmark className=' text-[20px] text-white' />
                                            </div>
                                            <p className=' sm:text-[12px] md:text-[14px]'>
                                                Basic communication in English in
                                                everyday situations.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className=' mt-14'>
                                <h1 className='sm:text-[18px] md:text-[22px] font-medium mb-5'>
                                    ເອກະສານທີ່ຕ້ອງກຽມ
                                </h1>
                                <div className=' flex flex-col gap-y-5'>
                                    <div className=' flex items-center gap-x-4'>
                                        <div className=' w-[10px] h-[10px] flex items-center justify-center rounded-full bg-[#01a7b1]'>
                                            <IoMdCheckmark className=' text-[20px] text-white' />
                                        </div>
                                        <p className=' sm:text-[12px]'>
                                            No previous knowledge of English is necessary.
                                        </p>
                                    </div>
                                    <div className=' flex items-center gap-x-4'>
                                        <div className=' w-[10px] h-[10px] flex items-center justify-center rounded-full bg-[#01a7b1]'>
                                            <IoMdCheckmark className=' text-[20px] text-white' />
                                        </div>
                                        <p className=' sm:text-[12px]'>
                                            For best quality of reception you need good laptop, a tablet or a phone with good speakers or
                                            headphones for correct pronunciation.
                                        </p>
                                    </div>
                                    <div className=' flex items-center gap-x-4'>
                                        <div className=' w-[10px] h-[10px] flex items-center justify-center rounded-full bg-[#01a7b1]'>
                                            <IoMdCheckmark className=' text-[20px] text-white' />
                                        </div>
                                        <p className=' sm:text-[12px]'>
                                            For best quality of reception you need good laptop, a tablet or a phone with good speakers or
                                            headphones for correct pronunciation.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='lg:col-span-3 col-span-4'>
                            <div className='relative z-10 sm:h-[200px] md:h-[250px] sm:mt-5 w-full bg-[#01A7B1] rounded-lg'>
                                <img
                                    src={bgPostOverlay}
                                    alt="Background Overlay"
                                    className='absolute z-0 w-full h-full object-cover opacity-30'
                                />
                                <div className='relative z-20 h-full flex flex-col sm:gap-y-3 md:gap-y-5 justify-center text-white px-5'>
                                    <h2 className=' sm:text-[16px] md:text-[18px] lg:text-[20px]'>
                                        ຖ້າທ່ານມີຄຳຖາມກະລຸນາຕິດຕໍ່
                                    </h2>
                                    <p className=' sm:text-[12px] md:text-[14px]'>
                                        Lorem ipsum dolor sit amet, <br /> consectetur adipiscing
                                    </p>
                                    <div className=' flex flex-col gap-y-3'>
                                        <div className=' flex items-center gap-x-3 md:text-[16px]'>
                                            <BiSolidPhoneCall className=' text-[16px] md:text-[20px]' />
                                            <p className=' sm:text-[13px] md:text-[14px]'>20 xxxx xx00</p>
                                        </div>
                                        <div className=' flex items-center gap-x-3 md:text-[16px]'>
                                            <FaFacebookF className=' text-[16px] md:text-[20px]' />
                                            <p className=' sm:text-[13px] md:text-[14px]'>ບີທີພີ ທຶນຮຽນຕໍ່ຕ່າງປະເທດ</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className=' flex justify-end w-full'>
                        <div className=' flex flex-col items-center gap-y-[2px]'>
                            <IoLogoWhatsapp className='text-[#0FC146] sm:text-[34px] md:text-[40px]' />
                            <p className=' sm:text-[14px] md:text-[18px] font-semibold text-[#13BBB6]'>
                                ສົນໃຈ
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        </Navbar>
    )
}
