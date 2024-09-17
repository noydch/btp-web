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
import { Skeleton } from 'antd'; // Import Skeleton
import { addDownloadTotalApi } from '../../../api/download.js';

export const PostDetail = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [postData, setPostData] = useState([]);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const { pID } = useParams(); // Destructure pID from useParams
    const postID = pID;

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await getService();
                if (!response) {
                    throw new Error('No response from API');
                }
                setPostData(response);
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: "ເກີດຂໍ້ຜິດພາດ",
                    text: "ບໍ່ສາມາດດຶງຂໍ້ມູນໄດ້",
                });
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleDownload = async () => {
        const data = {
            type: "service"
        }
        const response = await addDownloadTotalApi(data)
        return response
    }

    const viewPdf = postData
        .filter((item) => item?.id === pID)
        .map((item) => item?.file_url);

    const thisUrl = window.location.href
    console.log(thisUrl);
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
                                ປະກາດເປີດຮັບສະໝັກທຶນ <span className='font-bold text-[20px] sm:text-[22px]'>2024</span>
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
                                    <p className='text-[12px] sm:text-[14px]'>20xxxxxxx 20xxxxxxx</p>
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
                                                        target="_blank"
                                                        href={`https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(item)}`}
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
