import React, { useEffect, useState } from 'react';
import { AboutNavbar } from './AboutNavbar';
import { useSpring, animated } from 'react-spring';

// images
import aboutImg from '../../assets/images/about.webp';
import logo from '../../assets/images/logo.webp';
import about1 from '../../assets/images/webp/about1.webp';
import about2 from '../../assets/images/webp/about2.webp';
import about3 from '../../assets/images/webp/about3.webp';
import about4 from '../../assets/images/webp/about4.webp';
import about5 from '../../assets/images/webp/about5.webp';
import about6 from '../../assets/images/webp/about6.webp';
import about7 from '../../assets/images/webp/about7.webp';
import about8 from '../../assets/images/webp/about8.webp';
import about9 from '../../assets/images/webp/about9.webp';

export const About = () => {
    const [preloadedImages, setPreloadedImages] = useState([]);
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewIndex, setPreviewIndex] = useState(0);

    const dataImage = [
        { id: 1, picture: about1 },
        { id: 2, picture: about2 },
        { id: 3, picture: about3 },
        { id: 4, picture: about4 },
        { id: 5, picture: about5 },
        { id: 6, picture: about6 },
        { id: 7, picture: about7 },
        { id: 8, picture: about8 },
        { id: 9, picture: about9 },
    ];

    useEffect(() => {
        const preloadImages = async () => {
            const loadedImages = await Promise.all(
                dataImage.map((item) => {
                    return new Promise((resolve, reject) => {
                        const img = new Image();
                        img.src = item.picture;
                        img.onload = () => resolve(item.picture);
                        img.onerror = reject;
                    });
                })
            );
            setPreloadedImages(loadedImages);
        };

        preloadImages();
    }, []);

    const handlePreview = (index) => {
        setPreviewVisible(true);
        setPreviewImage(dataImage[index].picture);
        setPreviewIndex(index);
    };

    const handleClose = () => {
        setPreviewVisible(false);
    };

    const handlePrev = () => {
        const newIndex = (previewIndex - 1 + dataImage.length) % dataImage.length;
        setPreviewImage(dataImage[newIndex].picture);
        setPreviewIndex(newIndex);
    };

    const handleNext = () => {
        const newIndex = (previewIndex + 1) % dataImage.length;
        setPreviewImage(dataImage[newIndex].picture);
        setPreviewIndex(newIndex);
    };

    // Animation for the preview modal
    const modalAnimation = useSpring({
        opacity: previewVisible ? 1 : 0,
        transform: previewVisible ? 'scale(1)' : 'scale(0.8)',
        config: { tension: 120, friction: 14 },
    });

    return (
        <AboutNavbar>
            <div className='w-full pt-[70px]'>
                <img src={aboutImg} alt=""
                    className=' xl:w-full'
                />
            </div>
            <div className='w-full container max-w-[340px] mx-auto sm:max-w-[600px] md:max-w-[720px] lg:max-w-[900px] xl:max-w-[1200px] mt-7 pb-20'>
                <div className='a flex flex-col items-center gap-y-5'>
                    <div className='flex items-center justify-center gap-x-3'>
                        <img src={logo} alt="" className='w-[60px]' />
                        <div className='flex flex-col leading-7'>
                            <h2 className='text-[18px] font-semibold'>
                                ບີທີພີ ທຶນຮຽນຕໍ່ຕ່າງປະເທດ
                            </h2>
                            <p className='text-[15px] font-medium tracking-wider'>
                                International Scholarship
                            </p>
                        </div>
                    </div>
                    <div>
                        <h4 className=' text-[20px] font-medium text-center mt-5 mb-2'>
                            ຂໍ້ມູນ
                        </h4>
                        <p className=' text-center'>
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Temporibus dolore enim eum? Temporibus accusantium ab ipsam ex ratione sit corrupti.
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Temporibus dolore enim eum? Temporibus accusantium ab ipsam ex ratione sit corrupti.
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Temporibus dolore enim eum? Temporibus accusantium ab ipsam ex ratione sit corrupti.
                        </p>
                    </div>
                </div>
                <div>
                    <div className='mt-5 py-2 flex items-center justify-center border-b border-[#C1C1C1]'>
                        <h4 className='text-[14px] sm:text-[16px] font-semibold'>
                            ຮູບພາບ
                        </h4>
                    </div>
                    <div className='grid grid-cols-3 sm:grid-cols-12 xl:grid-cols-5 gap-x-4 gap-y-5 md:gap-y-4 xl:gap-y-6 mt-5 place-items-center'>
                        {dataImage.map((item, index) => (
                            <div key={index} className=' sm:col-span-3 xl:col-span-1 w-[100px] h-[100px] sm:w-[140px] sm:h-[140px] md:h-[150px] md:w-[170px] lg:h-[190px] lg:w-[210px] xl:w-[220px]
                            cursor-pointer' onClick={() => handlePreview(index)}>
                                <img src={item.picture} alt=""
                                    className='h-full w-full object-cover rounded-lg'
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {previewVisible && (
                <animated.div style={modalAnimation} className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
                    <div className="relative">
                        <img src={previewImage} alt="" className="max-h-[80vh] max-w-[80vw]" />
                        <div onClick={handleClose} className="absolute bottom-[-40px] left-[50%] -translate-x-1/2 text-white bg-black/60 w-[30px] h-[30px] rounded-full text-2xl flex items-center justify-center">
                            <button>
                                &times;
                            </button>
                        </div>
                        <div onClick={handlePrev} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white bg-black/60 w-[30px] h-[30px] rounded-full text-2xl flex items-center justify-center">
                            <button>
                                &lt;
                            </button>
                        </div>
                        <div onClick={handleNext} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white bg-black/60 w-[30px] h-[30px] rounded-full text-2xl flex items-center justify-center">
                            <button>
                                &gt;
                            </button>
                        </div>
                    </div>
                </animated.div >
            )}
        </AboutNavbar >
    );
};
