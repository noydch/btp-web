import React, { useState } from 'react';
import { PostNavbar } from '../../post/components/PostNavbar.jsx.jsx';
import { useParams } from 'react-router-dom';

import { LuDot } from "react-icons/lu";
import { GoDotFill } from "react-icons/go";
import { IoMdCheckmark, IoMdPin } from 'react-icons/io';
import { IoLogoWhatsapp } from "react-icons/io";
import { BiSolidPhoneCall } from "react-icons/bi";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { FiDownload } from "react-icons/fi";

import bgPostOverlay from '../../../assets/images/webp/postOverlay.webp';
import { FaFacebook, FaFacebookF } from 'react-icons/fa';

import { NewsNavbar } from './NewsNavbar.jsx';
import { Navbar } from '../../../components/Navbar.jsx';
import { useSpring, animated } from 'react-spring'; // Import useSpring and animated from react-spring

export const NewsDetailBigSize = ({ newsData, viewPdf, handleDownload }) => {
    const id = useParams();
    const postID = id.nID;

    const imageLink = newsData.find(item => item?.id === postID)?.image;
    const whatsappMessage = `ຄຼິກທີ່ນີ້ເພື່ອເບິ່ງຮູບ: ${imageLink}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(whatsappMessage)}`;

    const filteredNewsData = newsData.filter(item => item.id === postID);

    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewIndex, setPreviewIndex] = useState(0);
    const [showAllImages, setShowAllImages] = useState(false);
    const imagesPerRow = 6; // Assuming 6 images per row based on the grid layout
    const initialRowsToShow = 2;

    const toggleShowAllImages = () => {
        setShowAllImages(!showAllImages);
    };

    const handlePreview = (index, image) => {
        setPreviewVisible(true);
        setPreviewImage(`https://saiyfonbroker.s3.ap-southeast-1.amazonaws.com/images/${image}`);
        setPreviewIndex(index);
    };

    const handleClose = () => {
        setPreviewVisible(false);
    };

    const handlePrev = () => {
        const newIndex = (previewIndex - 1 + filteredNewsData[0].image.length) % filteredNewsData[0].image.length;
        setPreviewImage(`https://saiyfonbroker.s3.ap-southeast-1.amazonaws.com/images/${filteredNewsData[0].image[newIndex]}`);
        setPreviewIndex(newIndex);
    };

    const handleNext = () => {
        const newIndex = (previewIndex + 1) % filteredNewsData[0].image.length;
        setPreviewImage(`https://saiyfonbroker.s3.ap-southeast-1.amazonaws.com/images/${filteredNewsData[0].image[newIndex]}`);
        setPreviewIndex(newIndex);
    };

    // Animation for the preview modal
    const modalAnimation = useSpring({
        opacity: previewVisible ? 1 : 0,
        transform: previewVisible ? 'scale(1)' : 'scale(0.8)',
        config: { tension: 120, friction: 14 },
    });

    return (
        <Navbar>
            <div className='pt-[80px] container max-w-[350px] mx-auto sm:max-w-[600px] md:max-w-[720px] lg:max-w-[900px] xl:max-w-[1200px] pb-10'>
                {
                    newsData.map((item, index) => (
                        item.id == postID && (
                            <div key={index}>
                                <img src={`https://saiyfonbroker.s3.ap-southeast-1.amazonaws.com/images/${item.cover_image}`} alt=""
                                    className=' h-[500px] w-full object-cover rounded-lg'
                                    onClick={() => handlePreview(0, item.cover_image)} // Add onClick to open the preview
                                />
                                <div></div>
                            </div>
                        )
                    ))
                }
                {/* list image */}
                <div className='w-full mt-5 mb-10'>
                    <div className='grid grid-cols-12 place-items-center sm:gap-3 md:gap-3 lg:gap-3 xl:gap-5 w-full'>
                        {filteredNewsData.map((item) => {
                            const imagesToShow = showAllImages ? item.image : item.image.slice(0, imagesPerRow * initialRowsToShow);
                            return imagesToShow.map((image, index) => (
                                <div
                                    className='sm:col-span-4 md:col-span-3 lg:col-span-3 xl:col-span-2 sm:w-[190px] sm:h-[150px] md:w-[170px] md:h-[130px] lg:w-[210px] xl:w-[190px] lg:h-[160px] rounded-lg'
                                    key={index}
                                    onClick={() => handlePreview(index + 1, image)}
                                >
                                    <img
                                        src={`https://saiyfonbroker.s3.ap-southeast-1.amazonaws.com/images/${image}`}
                                        className='w-full h-full object-cover rounded-lg'
                                        alt=""
                                    />
                                </div>
                            ));
                        })}
                    </div>
                    {filteredNewsData[0]?.image.length > imagesPerRow * initialRowsToShow && (
                        <div className="flex justify-center mt-4">
                            <button
                                onClick={toggleShowAllImages}
                                className="bg-[#01A7B1] text-white px-4 py-2 rounded-lg hover:bg-[#018a92] transition-colors"
                            >
                                {showAllImages ? 'ສະແດງໜ້ອຍລົງ' : 'ສະແດງເພີ່ມເຕີມ'}
                            </button>
                        </div>
                    )}
                </div>
                <div className=' grid grid-cols-12 gap-x-10 mt-10 sm:gap-x-3 xl:gap-x-4'>
                    {
                        newsData?.map((item, index) => (
                            item?.id == postID && (
                                <div key={index} className=' lg:col-span-9 col-span-8 '>
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
                                    <div className=' flex flex-col gap-y-1'>
                                        <h1 className=' sm:text-[18px] md:text-[20px] font-medium'>
                                            ລາຍລະອຽດ:
                                        </h1>
                                        <p className=' sm:text-[12px] text-[14px]  lg:text-[16px]'>
                                            {
                                                item?.detail
                                            }
                                        </p>
                                    </div>
                                </div>
                            )
                        ))
                    }

                    <div className='lg:col-span-3 col-span-4'>
                        <div className='relative z-10 sm:h-[200px] md:h-[250px] sm:mt-5 w-full bg-[#01A7B1] rounded-lg'>
                            <img
                                src={bgPostOverlay}
                                alt="Background Overlay"
                                className='absolute z-0 w-full h-full object-cover opacity-25'
                            />
                            <div className='relative z-20 h-full flex flex-col sm:gap-y-3 md:gap-y-5 justify-center text-white px-5'>
                                <h2 className=' sm:text-[16px] md:text-[18px] lg:text-[20px]'>
                                    ຖ້າທ່ານມີຄຳຖາມກະລຸນາຕິດຕໍ່
                                </h2>
                                <p className=' sm:text-[12px] md:text-[14px] lg:text-[14px]'>
                                    ບໍລິສັດ ບີທີພີ ຈຳກັດ ຜູ້ດຽວ, ຫຼື ບີທີພີ (BTP) <br /> ໄດ້ທີ່ຊ່ອງທາງຕິດຕໍ່ດ້ານລຸ່ມນີ້:
                                </p>
                                <div className=' flex flex-col gap-y-3'>
                                    <div className=' flex items-center gap-x-3 md:text-[16px]'>
                                        <BiSolidPhoneCall className=' text-[16px] md:text-[20px]' />
                                        <p className=' sm:text-[13px] md:text-[14px]'>20 9211 1722</p>
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
            </div>
        </Navbar>
    );
};