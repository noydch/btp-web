import React from 'react';
import { useParams } from 'react-router-dom';
import { Navbar } from '../../../components/Navbar.jsx';

// Icons
import { IoMdCheckmark, IoLogoWhatsapp } from 'react-icons/io';
import { FiDownload } from 'react-icons/fi';
import { BiSolidPhoneCall } from 'react-icons/bi';
import { FaFacebookF } from 'react-icons/fa';

// Image
import bgPostOverlay from '../../../assets/images/webp/postOverlay.webp';

export const PostDetailBigSize = ({ postData, viewPdf }) => {
    const { pID } = useParams();

    return (
        <Navbar>
            <div className='pt-[80px] w-full h-full'>
                <div className='container h-full max-w-[350px] mx-auto sm:max-w-[600px] md:max-w-[720px] xl:max-w-[1200px] pb-10'>
                    {postData?.map((item, index) => (
                        item?.id === pID && (
                            <div key={index} className='w-full h-[550px] rounded-lg'>
                                <img
                                    src={item.image}
                                    alt=""
                                    className='w-full h-full rounded-lg object-cover'
                                />
                            </div>
                        )
                    ))}
                    <div className='grid grid-cols-12 mt-20 sm:gap-x-3 xl:gap-x-4'>
                        {postData?.map((item, index) => (
                            item?.id === pID && (
                                <div key={index} className='lg:col-span-9 col-span-8'>
                                    <div className='flex flex-col gap-y-5'>
                                        <h1 className='sm:text-[18px] md:text-[22px] font-medium'>
                                            ລາຍລະອຽດກ່ຽວກັບທຶນ
                                        </h1>
                                        <p className='sm:text-[12px] text-[14px]'>
                                            {item.description}
                                        </p>
                                    </div>
                                    <div className='mt-10'>
                                        <h1 className='sm:text-[18px] md:text-[22px] font-medium mb-2'>
                                            ຂໍ້ມູນຂອງທຶນ
                                        </h1>
                                        <div className='flex flex-col gap-y-3'>
                                            {item?.document?.map((doc, i) => (
                                                <div key={i} className='flex items-center gap-x-4'>
                                                    <div className='w-[20px] h-[20px] flex items-center justify-center rounded-full bg-[#01a7b1]'>
                                                        <IoMdCheckmark className='text-[16px] text-white' />
                                                    </div>
                                                    <p className='sm:text-[12px] md:text-[14px]'>
                                                        {doc}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className='mt-10'>
                                        <h1 className='sm:text-[18px] md:text-[22px] font-medium mb-2'>
                                            ເອກະສານທີ່ຕ້ອງກຽມ
                                        </h1>
                                        <div className='flex flex-col gap-y-3'>
                                            {item?.typescholarship?.map((type, i) => (
                                                <div key={i} className='flex items-center gap-x-4'>
                                                    <div className='w-[20px] h-[20px] flex items-center justify-center rounded-full bg-[#01a7b1]'>
                                                        <IoMdCheckmark className='text-[16px] text-white' />
                                                    </div>
                                                    <p className='sm:text-[12px] md:text-[14px]'>
                                                        {type}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )
                        ))}

                        <div className='lg:col-span-3 col-span-4'>
                            <div className='relative z-10 sm:h-[200px] md:h-[250px] sm:mt-5 w-full bg-[#01A7B1] rounded-lg'>
                                <img
                                    src={bgPostOverlay}
                                    alt="Background Overlay"
                                    className='absolute z-0 w-full h-full object-cover opacity-30'
                                />
                                <div className='relative z-20 h-full flex flex-col sm:gap-y-3 md:gap-y-5 justify-center text-white px-5'>
                                    <h2 className='sm:text-[16px] md:text-[18px] lg:text-[20px]'>
                                        ຖ້າທ່ານມີຄຳຖາມກະລຸນາຕິດຕໍ່
                                    </h2>
                                    <p className='sm:text-[12px] md:text-[14px]'>
                                        Lorem ipsum dolor sit amet, <br /> consectetur adipiscing
                                    </p>
                                    <div className='flex flex-col gap-y-3'>
                                        <div className='flex items-center gap-x-3 md:text-[16px]'>
                                            <BiSolidPhoneCall className='text-[16px] md:text-[20px]' />
                                            <p className='sm:text-[13px] md:text-[14px]'>20 xxxx xx00</p>
                                        </div>
                                        <div className='flex items-center gap-x-3 md:text-[16px]'>
                                            <FaFacebookF className='text-[16px] md:text-[20px]' />
                                            <p className='sm:text-[13px] md:text-[14px]'>
                                                ບີທີພີ ທຶນຮຽນຕໍ່ຕ່າງປະເທດ
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className='flex flex-row-reverse mt-5 gap-x-14 items-center'>
                        <a
                            target='_blank'
                            rel="noopener noreferrer"
                            href={`https://docs.google.com/gview?embedded=true&url=${viewPdf}`}
                            className='flex items-center gap-x-2 px-2 py-2 text-[#13BBB6] font-medium rounded-md border-2 border-[#13BBB6]'
                        >
                            <FiDownload />
                            ດາວໂຫຼດຟອມ
                        </a>
                        <a
                            href='https://wa.me/message/VKTNJ4453J46P1'
                            className='flex flex-col items-center'
                        >
                            <IoLogoWhatsapp className='text-[#0FC146] text-[28px]' />
                            <span className='text-[#13BBB6] text-[14px] font-semibold'>
                                ສົນໃຈ
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        </Navbar>
    );
};
