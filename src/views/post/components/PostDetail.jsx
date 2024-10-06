import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { LuDot } from "react-icons/lu";
import { GoDotFill } from "react-icons/go";
import { IoMdPin } from 'react-icons/io';
import { IoLogoWhatsapp } from "react-icons/io";
import { FiChevronsDown, FiDownload, FiDownloadCloud } from "react-icons/fi";
import { cardPostData } from '../cardPostData';
import { PostDetailBigSize } from './PostDetailBigSize';
import { getService } from '../../../api/serivce';
import Swal from 'sweetalert2';
import { PostNavbar } from './PostNavbar.jsx';
import { Skeleton, message } from 'antd'; // Import Skeleton
import { addDownloadTotalApi } from '../../../api/download.js';
import { useQuery } from '@tanstack/react-query';

export const PostDetail = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const { pID } = useParams(); // Destructure pID from useParams
    const postID = pID;

    const { data: postData = [], isLoading: loading } = useQuery({
        queryKey: ["news"],
        queryFn: getService,
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false
    });


    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleDownload = async () => {
        // แสดงข้อความเตือนเมื่อเริ่มดาวน์โหลด
        message.warning("ກຳລັງດາວໂຫຼດ!");

        // หน่วงเวลา 1 วินาที (1000 มิลลิวินาที) ก่อนที่จะแสดงข้อความสำเร็จ
        setTimeout(async () => {
            // ข้อมูลที่ใช้ในการบันทึกดาวน์โหลด
            const data = { type: "service" };

            // ส่งข้อมูลไปยัง API เพื่อบันทึกจำนวนดาวน์โหลด
            const response = await addDownloadTotalApi(data);

            // แสดงข้อความสำเร็จหลังจากดาวน์โหลดเสร็จ
            //message.success("ດາວໂຫຼດສຳເລັດ!");

            return response;
        }, 700);
    };

    const viewPdf = postData
        .filter((item) => item?.id === pID)
        .map((item) => item?.file_url);

    const thisUrl = window.location.href
    //console.log(thisUrl);
    const whatsappMessage = `ສົນໃຈທຶນນີ້: ${thisUrl}`;
    const whatsappUrl = `https://api.whatsapp.com/send?phone=8562092111722&text=${encodeURIComponent(whatsappMessage)}`;

    return (
        <>
            {windowWidth <= 480 ? (
                <PostNavbar>
                    <div className='pt-[65px] w-full'>
                        {loading ? (
                            <Skeleton active />
                        ) : (
                            postData?.map((item, index) => (
                                item?.id === postID && (
                                    <div key={index}>
                                        <img src={`https://saiyfonbroker.s3.ap-southeast-1.amazonaws.com/images/${item?.image}`} alt="" />
                                        <div></div>
                                    </div>
                                )
                            ))
                        )}
                    </div>
                    <div className='container max-w-[350px] mx-auto sm:max-w-[600px] md:max-w-[720px] pb-10'>
                        <div className='mt-3 flex items-center text-[#DEAD00]'>
                            <GoDotFill className='text-[12px]' />
                            <h1 className='text-[20px] font-medium pl-2 py-2.5 border-b border-[#DEAD00]'>
                                {
                                    postData?.map((item, index) => (
                                        item?.id === postID && (
                                            <span key={index} className='font-bold text-[20px] sm:text-[22px]'>
                                                {item?.title}
                                            </span>
                                        )
                                    ))
                                }
                            </h1>
                        </div>
                        <ul className='mt-3 grid grid-cols-12 gap-x-5'>
                            <li className='font-medium col-span-5 text-[16px] sm:text-[18px]'>
                                - ປະເພດທຶນ
                            </li>
                            <li className='font-medium col-span-7 text-[16px] sm:text-[18px]'>
                                # ເອກະສານ
                            </li>
                        </ul>
                        {loading ? (
                            <Skeleton active />
                        ) : (
                            postData?.map((item, index) => (
                                item?.id === postID && (
                                    <div key={index} className='grid grid-cols-12 gap-x-5 mt-2 list-inside list-disc px-2'>
                                        <div className='flex flex-col col-span-5 gap-y-3 font-medium'>
                                            {item?.typescholarship?.map((type, i) => (
                                                <div key={i} className='flex items-center gap-x-2'>
                                                    <GoDotFill className='text-[7px]' />
                                                    <p className='sm:text-[16px]'>{type}</p>
                                                </div>
                                            ))}
                                        </div>
                                        {/* <div className='flex flex-col col-span-7 gap-y-3 font-medium'>
                                            {item?.document?.map((doc, i) => (
                                                <div key={i} className='flex items-center gap-x-2'>
                                                    <GoDotFill className='text-[7px]' />
                                                    <p className='sm:text-[16px]'>{doc}</p>
                                                </div>
                                            ))}
                                        </div> */}
                                    </div>
                                )
                            ))
                        )}
                        <div className='mt-5 sm:mt-10'>
                            <div className='flex gap-x-1'>
                                <IoMdPin className='text-[18px] text-[#F7C208]' />
                                <div>
                                    <p className='text-[12px] sm:text-[14px]'>
                                        ສຳນັກງານຫ້ອງການຕັ້ງຢູ່: ບ້ານໂນນວາຍ ເມືອງໄຊເສດຖາ ນະຄວນຫຼວງວຽງຈັນ
                                    </p>
                                    <p className='text-[12px] sm:text-[14px]'>20 9211 1722</p>
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
                                                {viewPdf[0]?.slice(0, 8)?.map((item, index) => (
                                                    <a
                                                        key={index}
                                                        onClick={handleDownload}
                                                        href={`https://saiyfonbroker.s3.ap-southeast-1.amazonaws.com/pdfs/${encodeURIComponent(item)}`}
                                                        download={`${item}`}
                                                        className="block px-4 py-2.5 rounded-md duration-200 text-sm text-gray-700 hover:bg-[#13BBB6] hover:text-white"
                                                        role="menuitem"
                                                    >
                                                        <FiDownloadCloud className="inline-block mr-2" />
                                                        ດາວໂຫຼດຟອມ {index + 1}
                                                    </a>
                                                ))}
                                                {/*  */}
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <a href={whatsappUrl}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className='flex flex-col items-center'>
                                    <IoLogoWhatsapp className='text-[#0FC146] text-[28px]' />
                                    <span className='text-[#13BBB6] text-[14px] font-semibold'>
                                        ສົນໃຈ
                                    </span>
                                </a>
                            </div>
                        </div>
                    </div>
                </PostNavbar>
            ) : (
                <PostDetailBigSize postData={postData} viewPdf={viewPdf} handleDownload={handleDownload} />
            )}
        </>
    );
};
