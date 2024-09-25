import React, { useEffect, useState } from 'react';
import { AboutNavbar } from './AboutNavbar';
import { useSpring, animated } from 'react-spring';
import { Skeleton, Empty } from 'antd';

// images
import aboutImg from '../../assets/images/about.webp';
import logo from '../../assets/images/logo.webp';
import { getAboutApi, getCompanyDataApi, getCoverImageApi } from '../../api/about';

export const About = () => {
    const [preloadedImages, setPreloadedImages] = useState([]);
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewIndex, setPreviewIndex] = useState(0);
    const [coverImgData, setCoverImgData] = useState();
    const [aboutData, setAboutData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [companyData, setCompanyData] = useState([]);
    const [isCoverPreview, setIsCoverPreview] = useState(false);

    // Fetch cover image data
    const fetchDataCoverImg = async () => {
        setLoading(true);
        try {
            const response = await getCoverImageApi();
            setCoverImgData(response);
        } catch (error) {
            console.error("Failed to fetch cover image data", error);
        } finally {
            setLoading(false);
        }
    };

    // Fetch about data
    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await getAboutApi();
            setAboutData(response);
        } catch (error) {
            console.error("Failed to fetch about data", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchDataCompany = async () => {
        setLoading(true);
        try {
            const response = await getCompanyDataApi();
            setCompanyData(response);
        } catch (error) {
            console.error("Failed to fetch company data", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDataCoverImg();
        fetchData();
        fetchDataCompany();
    }, []);

    useEffect(() => {
        if (aboutData.length > 0) {
            const preloadImages = async () => {
                const loadedImages = await Promise.all(
                    aboutData.map((item) => {
                        return new Promise((resolve, reject) => {
                            const img = new Image();
                            img.src = `https://saiyfonbroker.s3.ap-southeast-1.amazonaws.com/images/${item.images}`;
                            img.onload = () => resolve(`https://saiyfonbroker.s3.ap-southeast-1.amazonaws.com/images/${item.images}`);
                            img.onerror = reject;
                        });
                    })
                );
                setPreloadedImages(loadedImages);
            };

            preloadImages();
        }
    }, [aboutData]);

    const handlePreview = (index) => {
        setPreviewVisible(true);
        setPreviewImage(`https://saiyfonbroker.s3.ap-southeast-1.amazonaws.com/images/${aboutData[index].images}`);
        setPreviewIndex(index);
        setIsCoverPreview(false);
    };

    const handleCoverPreview = () => {
        setPreviewVisible(true);
        setPreviewImage(`https://saiyfonbroker.s3.ap-southeast-1.amazonaws.com/images/${coverImg}`);
        setIsCoverPreview(true);
    };

    const handleClose = () => {
        setPreviewVisible(false);
        setIsCoverPreview(false);
    };

    const handlePrev = () => {
        if (isCoverPreview) {
            const lastIndex = aboutData.length - 1;
            setPreviewImage(`https://saiyfonbroker.s3.ap-southeast-1.amazonaws.com/images/${aboutData[lastIndex].images}`);
            setPreviewIndex(lastIndex);
            setIsCoverPreview(false);
        } else {
            const newIndex = (previewIndex - 1 + aboutData.length) % aboutData.length;
            setPreviewImage(`https://saiyfonbroker.s3.ap-southeast-1.amazonaws.com/images/${aboutData[newIndex].images}`);
            setPreviewIndex(newIndex);
        }
    };

    const handleNext = () => {
        if (isCoverPreview) {
            setPreviewImage(`https://saiyfonbroker.s3.ap-southeast-1.amazonaws.com/images/${aboutData[0].images}`);
            setPreviewIndex(0);
            setIsCoverPreview(false);
        } else {
            const newIndex = (previewIndex + 1) % aboutData.length;
            if (newIndex === 0) {
                setPreviewImage(`https://saiyfonbroker.s3.ap-southeast-1.amazonaws.com/images/${coverImg}`);
                setIsCoverPreview(true);
            } else {
                setPreviewImage(`https://saiyfonbroker.s3.ap-southeast-1.amazonaws.com/images/${aboutData[newIndex].images}`);
                setPreviewIndex(newIndex);
            }
        }
    };

    // Animation for the preview modal
    const modalAnimation = useSpring({
        opacity: previewVisible ? 1 : 0,
        transform: previewVisible ? 'scale(1)' : 'scale(0.8)',
        config: { tension: 120, friction: 14 },
    });

    const coverImg = coverImgData?.image ? coverImgData.image : aboutImg;

    return (
        <AboutNavbar>
            <div className='bg-white'>
                <div className='h-[360px] w-full md:h-[460px] lg:h-[470px] pt-[70px]'>
                    <div className='h-[300px] md:h-[400px] lg:h-[400px] w-full flex justify-center items-center'>
                        {loading ? (
                            <Skeleton.Image className='' />
                        ) : (
                            <img
                                src={`https://saiyfonbroker.s3.ap-southeast-1.amazonaws.com/images/${coverImg}`}
                                alt="Cover"
                                className='h-full w-full object-cover cursor-pointer'
                                onClick={handleCoverPreview}
                            />
                        )}
                    </div>
                </div>
                <div className='w-full container max-w-[350px] mx-auto sm:max-w-[600px] md:max-w-[720px] lg:max-w-[900px] xl:max-w-[1200px] mt-7 pb-20'>
                    {loading ? (
                        <Skeleton active />
                    ) : companyData?.length > 0 ? (
                        companyData?.map((item, index) => (
                            <div key={index} className='flex sm:justify-between items-center gap-y-5 sm:gap-x-5'>
                                <div className='w-ful flex-1 sm:flex-[2] lg:flex-1 xl:flex-[2] flex sm:items-center justify-center sm:justify-end gap-x-3'>
                                    <img src={`https://saiyfonbroker.s3.ap-southeast-1.amazonaws.com/images/${item?.icon}`} alt="Logo"
                                        className='w-[100px] h-[100px] rounded-full sm:w-[150px] sm:h-[150px] lg:h-[200px] lg:w-[200px] object-cover' />
                                </div>
                                <div className='w-full flex-[2] sm:flex-[2] lg:flex-[2] xl:flex-[2]'>
                                    <div className='flex flex-col mb-1 sm:mb-2'>
                                        <h2 className='text-[16px] sm:text-[20px] lg:text-[22px] font-medium'>
                                            {item?.title}
                                        </h2>
                                    </div>
                                    <p className='text-start text-[10px] sm:text-[12px] lg:text-[14px] sm:w-[400px]'>
                                        {item?.description}
                                    </p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <Empty description="ບໍ່ມີຂໍໍມູນກ່ຽວກັບບໍລິສັດ" />
                    )}
                    <div>
                        <div className='mt-5 py-2 flex items-center justify-center border-b border-[#C1C1C1]'>
                            <h4 className='text-[14px] sm:text-[16px] font-semibold'>
                                ຮູບພາບ
                            </h4>
                        </div>
                        <div className='grid grid-cols-12 sm:grid-cols-12 xl:grid-cols-5 gap-x-4 gap-y-5 md:gap-y-4 xl:gap-y-6 mt-5 place-items-center'>
                            {loading ? (
                                <Skeleton.Image className='w-[100px] h-[100px] sm:w-[140px] sm:h-[140px] md:h-[150px] md:w-[170px] lg:h-[190px] lg:w-[210px] xl:w-[220px]' />
                            ) : aboutData?.length > 0 ? (
                                aboutData?.map((item, index) => (
                                    <div key={index} className='sm:col-span-3 xl:col-span-1 col-span-4 w-[100px] h-[100px] sm:w-[140px] sm:h-[140px] md:h-[150px] md:w-[170px] lg:h-[190px] lg:w-[210px] xl:w-[220px] cursor-pointer' onClick={() => handlePreview(index)}>
                                        <img src={`https://saiyfonbroker.s3.ap-southeast-1.amazonaws.com/images/${item?.images}`} alt="" className='h-full w-full object-cover rounded-lg' />
                                    </div>
                                ))
                            ) : (
                                <Empty description="ບໍ່ມີຂໍໍມູນຮູບພາບ" />
                            )}
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
        </AboutNavbar>
    );
};