import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';

import './styles.css';

// import required modules
import { Scrollbar, Autoplay } from 'swiper/modules';

import adsImg from '../assets/images/ads.jpg';
import { getBannerApi } from '../api/banner';

const ModalAds = ({ show, onClose }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [banners, setBanners] = useState([]);

    const fetchData = async () => {
        setLoading(true)
        try {
            const response = await getBannerApi()
            setBanners(response)
        } catch (error) {
            console.error("error response data banner");
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
        console.log("banner js", banners);
    }, [])

    const handleModalClose = (e) => {
        // Only close if the close button is clicked
        if (e && e.target.className.includes('ant-modal-close')) {
            onClose();
        }
    };

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${show ? 'opacity-100 visible' : 'opacity-0 invisible'
                }`}
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
                        {
                            banners.map((item, index) => (
                                item.isPublished == true && (
                                    <SwiperSlide key={index} className=' h-full w-full'>
                                        <div onClick={() => navigate(`/adsDetail/${item.id}`)} className="cursor-pointer w-full h-full">
                                            <img src={item.image} alt="Advertisement" className="w-full h-full object-cover" />
                                        </div>
                                    </SwiperSlide>
                                )
                            ))
                        }
                    </Swiper>
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