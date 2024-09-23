import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Navbar } from '../../../components/Navbar.jsx';

// Icons
import { IoMdCheckmark, IoLogoWhatsapp } from 'react-icons/io';
import { FiChevronsDown, FiDownload, FiDownloadCloud } from 'react-icons/fi';
import { BiSolidPhoneCall } from 'react-icons/bi';
import { FaFacebookF } from 'react-icons/fa';

// Image
import bgPostOverlay from '../../../assets/images/webp/postOverlay.webp';

export const PostDetailBigSize = ({ postData, viewPdf, handleDownload }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { pID } = useParams(); // Destructure pID from useParams
    const postID = pID;
    // Create a WhatsApp share URL with an image link
    const thisUrl = window.location.href
    const whatsappMessage = `ສົນໃຈທຶນນີ້: ${thisUrl}`;
    const whatsappUrl = `https://api.whatsapp.com/send?phone=8562092111722&text=${encodeURIComponent(whatsappMessage)}`;

    return (
        <Navbar>
            <div className='pt-[0px] w-full h-full'>
                <div className='pt-[80px] container max-w-[350px] mx-auto sm:max-w-[600px] md:max-w-[720px] lg:max-w-[900px] xl:max-w-[1200px] pb-10'>
                    {postData?.map((item, index) => (
                        item?.id === pID && (
                            <div key={index} className='w-full h-[550px] rounded-lg'>
                                <img
                                    src={`https://saiyfonbroker.s3.ap-southeast-1.amazonaws.com/images/${item.image}`}
                                    alt=""
                                    className='w-full h-full rounded-lg object-cover'
                                />
                            </div>
                        )
                    ))}
                    <div className='grid grid-cols-12 gap-x-10 mt-10 sm:gap-x-3 xl:gap-x-4'>
                        {postData?.map((item, index) => (
                            item?.id === pID && (
                                <div key={index} className='lg:col-span-9 col-span-8'>
                                    <div className=' flex flex-col gap-y-1 mb-5'>
                                        <h1 className=' sm:text-[18px] md:text-[22px] font-medium'>
                                            ຫົວຂໍ້:
                                        </h1>
                                        <p className=' sm:text-[12px] text-[14px]  lg:text-[18px] font-semibold'>
                                            {
                                                item?.title
                                            }
                                        </p>
                                    </div>
                                    <div className='flex flex-col gap-y-1'>
                                        <h1 className='sm:text-[18px] md:text-[20px] font-medium'>
                                            ລາຍລະອຽດກ່ຽວກັບທຶນ:
                                        </h1>
                                        <p className='sm:text-[12px] text-[14px]'>
                                            {item.description}
                                        </p>
                                    </div>
                                    <div className='mt-10'>
                                        <h1 className='sm:text-[18px] md:text-[20px] font-medium mb-2'>
                                            ປະເພດທຶນ
                                        </h1>
                                        <div className=' grid grid-cols-12 gap-x-10 gap-y-5'>
                                            {item?.typescholarship?.map((doc, i) => (
                                                <div key={i} className=' col-span-6 flex items-center gap-x-4'>
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
                                        <h1 className='sm:text-[18px] md:text-[20px] font-medium mb-2'>
                                            ເອກະສານທີ່ຕ້ອງກຽມ
                                        </h1>
                                        <div className=' grid grid-cols-12 gap-x-10  gap-y-5'>
                                            {item?.document?.map((type, i) => (
                                                <div key={i} className=' col-span-6 flex items-center gap-x-4'>
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
                                    className='absolute z-0 w-full h-full object-cover opacity-25'
                                />
                                <div className='relative z-20 h-full flex flex-col sm:gap-y-3 md:gap-y-5 justify-center text-white px-5'>
                                    <h2 className='sm:text-[16px] md:text-[18px] lg:text-[20px]'>
                                        ຖ້າທ່ານມີຄຳຖາມກະລຸນາຕິດຕໍ່
                                    </h2>
                                    <p className=' sm:text-[12px] md:text-[14px] lg:text-[14px]'>
                                        ບໍລິສັດ ບີທີພີ ຈຳກັດ ຜູ້ດຽວ, ຫຼື ບີທີພີ (BTP) <br /> ໄດ້ທີ່ຊ່ອງທາງຕິດຕໍ່ດ້ານລຸ່ມນີ້:
                                    </p>
                                    <div className='flex flex-col gap-y-3'>
                                        <div className='flex items-center gap-x-3 md:text-[16px]'>
                                            <BiSolidPhoneCall className='text-[16px] md:text-[20px]' />
                                            <p className='sm:text-[13px] md:text-[14px]'>20 9211 1722</p>
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
                        <div className="relative inline-block text-left">
                            <div>
                                <button
                                    type="button"
                                    className="inline-flex justify-center w-full rounded-md border-2 border-[#13BBB6] px-4 py-2 bg-white text-sm font-medium text-[#13BBB6] hover:bg-gray-50 focus:outline-none "
                                    id="options-menu"
                                    aria-haspopup="true"
                                    aria-expanded="true"
                                    onClick={() => setIsOpen(!isOpen)}
                                >
                                    ດາວໂຫຼດຟອມ
                                    <FiChevronsDown className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
                                </button>
                            </div>

                            {isOpen && (
                                <div className="origin-top-right z-[9999999] absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                    <div className=" p-2" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                        {viewPdf[0].slice(0, 8).map((item, index) => (
                                            <a
                                                key={index}
                                                onClick={handleDownload}
                                                href={`https://saiyfonbroker.s3.ap-southeast-1.amazonaws.com/pdfs/${encodeURIComponent(item)}`}
                                                download={`${item}`} // ชื่อไฟล์ที่จะแสดงเมื่อดาวน์โหลด
                                                className="block px-4 py-2.5 rounded-md duration-200 text-sm text-gray-700 hover:bg-[#13BBB6] hover:text-white"
                                                role="menuitem"
                                            >
                                                <FiDownloadCloud className="inline-block mr-2" />
                                                ດາວໂຫຼດຟອມ {index + 1}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                        <a href={whatsappUrl}
                            className='flex flex-col items-center'>
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
