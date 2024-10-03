import React, { useEffect, useState } from 'react';
import { PostNavbar } from '../../post/components/PostNavbar.jsx';
import { useNavigate, useParams } from 'react-router-dom';
import { Skeleton } from 'antd';
import { LuDot } from "react-icons/lu";
import { GoDotFill } from "react-icons/go";
import { IoMdPin } from 'react-icons/io';
import { IoLogoWhatsapp } from "react-icons/io";
import { FiDownload } from "react-icons/fi"
import { NewsNavbar } from './NewsNavbar.jsx';
import { NewsDetailBigSize } from './NewsDetailBigSize.jsx';
import { getNewsApi } from '../../../api/news.js';
import { Navbar } from '../../../components/Navbar.jsx';
import { addDownloadTotalApi } from '../../../api/download.js';
import { useSpring, animated } from 'react-spring';
import { useQuery } from '@tanstack/react-query';

export const NewsDetail = () => {
    const navigate = useNavigate();
    // const [loading, setLoading] = useState(false);
    // const [newsData, setNewsData] = useState([]);
    const id = useParams();
    const postID = id.nID;
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [showAllImages, setShowAllImages] = useState(false);
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewIndex, setPreviewIndex] = useState(0);
    const { data: newsData = [], isLoading: loading } = useQuery({
        queryKey: ["news"],
        queryFn: getNewsApi,
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false
    });

    // const fetchData = async () => {
    //     setLoading(true);
    //     try {
    //         const response = await getNewsApi();
    //         setNewsData(response);
    //         setLoading(false);
    //     } catch (error) {
    //         console.error("Error: cannot fetch news data from API", error);
    //         setLoading(false);
    //     }
    // };

    // useEffect(() => {
    //     fetchData();
    // }, []);

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

    const handlePreview = (index, image) => {
        setPreviewVisible(true);
        setPreviewImage(`https://saiyfonbroker.s3.ap-southeast-1.amazonaws.com/images/${image}`);
        setPreviewIndex(index);
    };

    const handleClose = () => {
        setPreviewVisible(false);
    };

    const handlePrev = () => {
        const currentItem = newsData.find(item => item.id === postID);
        const newIndex = (previewIndex - 1 + currentItem.image.length) % currentItem.image.length;
        setPreviewImage(`https://saiyfonbroker.s3.ap-southeast-1.amazonaws.com/images/${currentItem.image[newIndex]}`);
        setPreviewIndex(newIndex);
    };

    const handleNext = () => {
        const currentItem = newsData.find(item => item.id === postID);
        const newIndex = (previewIndex + 1) % currentItem.image.length;
        setPreviewImage(`https://saiyfonbroker.s3.ap-southeast-1.amazonaws.com/images/${currentItem.image[newIndex]}`);
        setPreviewIndex(newIndex);
    };

    const modalAnimation = useSpring({
        opacity: previewVisible ? 1 : 0,
        transform: previewVisible ? 'scale(1)' : 'scale(0.8)',
        config: { tension: 120, friction: 14 },
    });

    const viewPdf = newsData
        .filter((item) => item?.id === postID)
        .map((item) => item?.file_url);

    const imageLink = newsData.find(item => item?.id === postID)?.image;
    const whatsappMessage = `ຄຼິກທີ່ນີ້ເພື່ອເບິ່ງຮູບ: ${imageLink}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(whatsappMessage)}`;

    return (
        <>
            {windowWidth <= 480 ? (
                <NewsNavbar>
                    <div className='pt-[65px] w-full'>
                        {loading ? (
                            <Skeleton active />
                        ) : (
                            <div>
                                {newsData?.map((item, index) => (
                                    item?.id == postID && (
                                        <div key={index}>
                                            <img
                                                src={`https://saiyfonbroker.s3.ap-southeast-1.amazonaws.com/images/${item?.cover_image}`}
                                                alt=""
                                                className='h-[300px] w-full object-cover'
                                                onClick={() => handlePreview(0, item.cover_image)}
                                            />
                                        </div>
                                    )
                                ))}
                            </div>
                        )}
                    </div>
                    {!loading && (
                        <div className='container max-w-[350px] mx-auto sm:max-w-[600px] md:max-w-[720px] lg:max-w-[900px] xl:max-w-[1200px] pb-10'>
                            {newsData?.map((item, index) => (
                                item?.id == postID && (
                                    <div key={index}>
                                        <div className='place-items-center grid grid-cols-12 w-full mt-5 gap-3'>
                                            {
                                                item.image.slice(0, showAllImages ? item.image.length : 6).map((image, index) => (
                                                    <div
                                                        className='w-[110px] h-[100px] col-span-4 sm:col-span-4 md:col-span-3 lg:col-span-3 xl:col-span-2 sm:w-[190px] sm:h-[150px] md:w-[170px] md:h-[130px] lg:w-[210px] xl:w-[190px] lg:h-[160px] rounded-lg'
                                                        key={index}
                                                        onClick={() => handlePreview(index + 1, image)}
                                                    >
                                                        <img src={`https://saiyfonbroker.s3.ap-southeast-1.amazonaws.com/images/${image}`}
                                                            className='w-full h-full object-cover rounded-lg'
                                                            alt="" />
                                                    </div>
                                                ))
                                            }
                                        </div>
                                        {item.image.length > 6 && (
                                            <div className="flex justify-center mt-4">
                                                <button
                                                    onClick={() => setShowAllImages(!showAllImages)}
                                                    className="px-4 py-2 bg-[#13BBB6] text-white rounded-md"
                                                >
                                                    {showAllImages ? 'ສະແດງໜ້ອຍລົງ' : 'ສະແດງເພີ່ມເຕີມ'}
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                )
                            ))}
                            <div className='mt-3 flex items-center text-[#DEAD00]'>
                                <GoDotFill className='text-[12px]' />
                                <h1 className='text-[20px] sm:text-[22px] font-medium pl-2 py-2.5 border-b border-[#DEAD00]'>
                                    {newsData?.map((item, index) => (
                                        item?.id == postID && (
                                            <span>{item?.title}</span>
                                        ))
                                    )}
                                </h1>
                            </div>
                            <ul className='mt-3 flex items-center gap-x-5'>
                                <li className='font-medium text-[16px]'>- ລາຍລະອຽດ</li>
                            </ul>
                            {newsData?.map((item, index) => (
                                item?.id == postID && (
                                    <div key={index} className='grid grid-cols-12 gap-x-5 mt-2 list-inside list-disc px-2'>
                                        <div className='flex flex-col col-span-5 gap-y-3 font-medium'>
                                            <div key={index} className='flex items-center gap-x-2'>
                                                <GoDotFill className='text-[7px]' />
                                                <p className='sm:text-[16px]'>{item?.detail}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            ))}
                            <div className='mt-5'>
                                <div className='flex gap-x-1'>
                                    <IoMdPin className='text-[18px] text-[#F7C208]' />
                                    <div>
                                        <p className='text-[12px]'>
                                            ສຳນັກງານຫ້ອງການຕັ້ງຢູ່: ບ້ານໂນນວາຍ ເມືອງໄຊເສດຖາ ນະຄວນຫຼວງວຽງຈັນ
                                        </p>
                                        <p className='text-[12px]'>20 9211 1722</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {previewVisible && (
                        <animated.div style={modalAnimation} className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
                            <div className="relative">
                                <img src={previewImage} alt="" className="max-h-[80vh] max-w-[80vw]" />
                                <div onClick={handleClose} className="absolute bottom-[-40px] left-[50%] -translate-x-1/2 text-white bg-black/60 w-[30px] h-[30px] rounded-full text-2xl flex items-center justify-center cursor-pointer">
                                    &times;
                                </div>
                                <div onClick={handlePrev} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white bg-black/60 w-[30px] h-[30px] rounded-full text-2xl flex items-center justify-center cursor-pointer">
                                    &lt;
                                </div>
                                <div onClick={handleNext} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white bg-black/60 w-[30px] h-[30px] rounded-full text-2xl flex items-center justify-center cursor-pointer">
                                    &gt;
                                </div>
                            </div>
                        </animated.div>
                    )}
                </NewsNavbar>
            ) : (
                <NewsDetailBigSize newsData={newsData} viewPdf={viewPdf} handleDownload={handleDownload} />
            )}
        </>
    );
};