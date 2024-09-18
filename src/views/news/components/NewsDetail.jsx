import React, { useEffect, useState } from 'react';
import { PostNavbar } from '../../post/components/PostNavbar.jsx';
import { useNavigate, useParams } from 'react-router-dom';
import { Skeleton } from 'antd'; // Import Skeleton from Ant Design
import { LuDot } from "react-icons/lu";
import { GoDotFill } from "react-icons/go";
import { IoMdPin } from 'react-icons/io';
import { IoLogoWhatsapp } from "react-icons/io";
import { FiDownload } from "react-icons/fi";
import { newsData } from '../newsData.jsx';
import { NewsNavbar } from './NewsNavbar.jsx';
import { NewsDetailBigSize } from './NewsDetailBigSize.jsx';
import { getNewsApi } from '../../../api/news.js';
import { Navbar } from '../../../components/Navbar.jsx';
import { addDownloadTotalApi } from '../../../api/download.js';

export const NewsDetail = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [newsData, setNewsData] = useState([]);
    const id = useParams();
    const postID = id.nID;
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await getNewsApi();
            setNewsData(response);
            setLoading(false);
        } catch (error) {
            console.error("Error: cannot fetch news data from API", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        console.log(newsData);
    }, []);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleDownload = async () => {
        const data = {
            type: "news"
        }
        const response = await addDownloadTotalApi(data)
        return response
    }
    // dd

    const viewPdf = newsData
        .filter((item) => item?.id === postID)
        .map((item) => item?.file_url);
    console.log("view=", viewPdf[0]);

    const imageLink = newsData.find(item => item?.id === postID)?.image;
    const whatsappMessage = `ຄຼິກທີ່ນີ້ເພື່ອເບິ່ງຮູບ: ${imageLink}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(whatsappMessage)}`;

    return (
        <>
            {windowWidth <= 480 ? (
                <NewsNavbar>
                    <div className='pt-[65px] w-full'>
                        {loading ? (
                            <Skeleton active /> // Display skeleton loader if loading is true
                        ) : (
                            <div>
                                {newsData?.map((item, index) => (
                                    item?.id == postID && (
                                        <div key={index}>
                                            <img src={item?.image} alt="" />
                                            <div></div>
                                        </div>
                                    )
                                ))}
                            </div>
                        )}
                    </div>
                    {!loading && (
                        <div className='container max-w-[350px] mx-auto sm:max-w-[600px] md:max-w-[720px] lg:max-w-[900px] xl:max-w-[1200px] pb-10'>
                            <div className='mt-3 flex items-center text-[#DEAD00]'>
                                <GoDotFill className='text-[12px]' />
                                <h1 className='text-[20px] sm:text-[22px] font-medium pl-2 py-2.5 border-b border-[#DEAD00]'>
                                    ປະກາດເປີດຮັບສະໝັກທຶນ <span className='font-bold text-[20px]'>2024</span>
                                </h1>
                            </div>
                            <ul className='mt-3 flex items-center gap-x-5'>
                                <li className='font-medium text-[16px]'>- ທຶນການສຶກສາ</li>
                                <li className='font-medium text-[16px]'># ເງື່ອນໄຂທີ່ຄຸ້ມຄ່າທີ່ສຸດ</li>
                            </ul>
                            {newsData?.map((item, index) => (
                                item?.id == postID && (
                                    <div key={index} className='grid grid-cols-12 gap-x-5 mt-2 list-inside list-disc px-2'>
                                        <div className='flex flex-col col-span-5 gap-y-3 font-medium'>
                                            {item?.typescholarship?.map((scholarshipItem, i) => (
                                                <div key={i} className='flex items-center gap-x-2'>
                                                    <GoDotFill className='text-[7px]' />
                                                    <p className='sm:text-[16px]'>{scholarshipItem}</p>
                                                </div>
                                            ))}
                                        </div>
                                        <div className='flex flex-col col-span-7 gap-y-3 font-medium'>
                                            {item?.document?.map((documentItem, i) => (
                                                <div key={i} className='flex items-center gap-x-2'>
                                                    <GoDotFill className='text-[7px]' />
                                                    <p className='sm:text-[16px]'>{documentItem}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )
                            ))}
                            <div className='mt-5'>
                                <div className='flex gap-x-1'>
                                    <IoMdPin className='text-[18px] text-[#F7C208]' />
                                    <div>
                                        <p className='text-[12px]'>
                                            ສຳນັກງານຫ້ອງການຕັ້ງຢູ່: ບ້ານໂນນຫວາຍ ເມືອງໄຊເສດຖາ ນະຄວນຫຼວງວຽງຈັນ
                                        </p>
                                        <p className='text-[12px]'>20 9211 1722</p>
                                    </div>
                                </div>
                                {/* <div className='flex flex-row-reverse mt-5 gap-x-14 items-center'>
                                    <a
                                        onClick={handleDownload}
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
                                </div> */}
                            </div>
                        </div>
                    )}
                </NewsNavbar>
            ) : (
                <NewsDetailBigSize newsData={newsData} viewPdf={viewPdf} handleDownload={handleDownload} />
            )}
        </>
    );
};
