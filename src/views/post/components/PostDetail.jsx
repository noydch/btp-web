import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { LuDot } from "react-icons/lu";
import { GoDotFill } from "react-icons/go";
import { IoMdPin } from 'react-icons/io';
import { IoLogoWhatsapp } from "react-icons/io";
import { FiDownload } from "react-icons/fi";
import { cardPostData } from '../cardPostData';
import { PostDetailBigSize } from './PostDetailBigSize';
import { getService } from '../../../api/serivce';
import Swal from 'sweetalert2';
import { PostNavbar } from './PostNavbar.jsx';
import { Skeleton } from 'antd'; // Import Skeleton

export const PostDetail = () => {
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

    const viewPdf = postData
        .filter((item) => item?.id === pID)
        .map((item) => item?.file_url);

    // Create a WhatsApp share URL with an image link
    const imageLink = postData.find(item => item?.id === postID)?.image;
    const whatsappMessage = `Check out this image: ${imageLink}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(whatsappMessage)}`;

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
                                        <img src={item?.image} alt="" />
                                        <div></div>
                                    </div>
                                )
                            ))
                        )}
                    </div>
                    <div className='container max-w-[360px] mx-auto sm:max-w-[600px] md:max-w-[720px] pb-10'>
                        <div className='mt-3 flex items-center text-[#DEAD00]'>
                            <GoDotFill className='text-[12px]' />
                            <h1 className='text-[20px] font-medium pl-2 py-2.5 border-b border-[#DEAD00]'>
                                ປະກາດເປີດຮັບສະໝັກທຶນ <span className='font-bold text-[20px] sm:text-[22px]'>2024</span>
                            </h1>
                        </div>
                        <ul className='mt-3 grid grid-cols-12'>
                            <li className='font-medium col-span-5 text-[16px] sm:text-[18px]'>
                                - ຂໍ້ມູນທຶນ
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
                                    <div key={index} className='grid grid-cols-12 mt-2 list-inside list-disc px-2'>
                                        <div className='flex flex-col col-span-5 gap-y-3 font-medium'>
                                            {item?.typescholarship?.map((type, i) => (
                                                <div key={i} className='flex items-center gap-x-2'>
                                                    <GoDotFill className='text-[7px]' />
                                                    <p className='sm:text-[16px]'>{type}</p>
                                                </div>
                                            ))}
                                        </div>
                                        <div className='flex flex-col col-span-7 gap-y-3 font-medium'>
                                            {item?.document?.map((doc, i) => (
                                                <div key={i} className='flex items-center gap-x-2'>
                                                    <GoDotFill className='text-[7px]' />
                                                    <p className='sm:text-[16px]'>{doc}</p>
                                                </div>
                                            ))}
                                        </div>
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
                                <a
                                    target='_blank'
                                    href={`https://docs.google.com/gview?embedded=true&url=${viewPdf}`}
                                    className='flex items-center gap-x-2 px-2 py-2 text-[#13BBB6] font-medium rounded-md border-2 border-[#13BBB6]'>
                                    <FiDownload />
                                    ດາວໂຫຼດຟອມ
                                </a>
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
                <PostDetailBigSize postData={postData} viewPdf={viewPdf} />
            )}
        </>
    );
};
