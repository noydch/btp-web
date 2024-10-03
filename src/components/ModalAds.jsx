import React from 'react';
import { Modal, Button, Skeleton, Empty } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useQuery } from '@tanstack/react-query';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';

import './styles.css';

// import required modules
import { Scrollbar, Autoplay } from 'swiper/modules';

import { getBannerApi } from '../api/banner';

const ModalAds = ({ show, onClose }) => {
    const navigate = useNavigate();

    const { data: banners = [], isLoading, error } = useQuery({
        queryKey: ["bannerList"],
        queryFn: getBannerApi,
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
    });

    const handleModalClose = (e) => {
        if (e && e.target.className.includes('ant-modal-close')) {
            onClose();
        }
    };

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${show ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        >
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>

            <Modal
                title={null}
                open={show}
                onCancel={handleModalClose}
                footer={null}
                closable={false}
                centered
                mask={false}
            >
                <div className="relative bg-white rounded-lg h-full w-full">
                    {isLoading ? (
                        <Skeleton active className="h-[400px] sm:h-[500px] lg:h-[600px]" />
                    ) : error ? (
                        <div className="text-center py-10">
                            <p>{error.message || 'Error fetching banners'}</p>
                        </div>
                    ) : banners.length > 0 ? (
                        <Swiper
                            scrollbar={{
                                hide: true,
                            }}
                            modules={[Scrollbar, Autoplay]}
                            autoplay={{
                                delay: 3000,
                                disableOnInteraction: false,
                            }}
                            className="mySwiper"
                        >
                            {banners.map((item, index) => (
                                item?.isPublished && (
                                    <SwiperSlide key={index} className='h-full w-full'>
                                        <div onClick={() => navigate(`/adsDetail/${item?.id}`)} className="cursor-pointer w-full h-[400px] sm:h-[500px] lg:h-[600px]">
                                            <img src={`https://saiyfonbroker.s3.ap-southeast-1.amazonaws.com/images/${item?.image}`} alt="Advertisement" className="w-full h-full object-cover" />
                                        </div>
                                    </SwiperSlide>
                                )
                            ))}
                        </Swiper>
                    ) : (
                        <Empty description="No banners available" />
                    )}
                </div>
                <Button
                    onClick={onClose}
                    className="absolute z-50 top-2 right-2 bg-white text-black rounded-full"
                    shape="circle"
                >
                    ✕
                </Button>
            </Modal>
        </div>
    );
};

export default ModalAds;