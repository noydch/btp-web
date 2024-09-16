import React, { useEffect, useState } from 'react';
import { Modal, Button, Skeleton, Empty } from 'antd'; // Import Empty component for empty state
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';

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
    const [loading, setLoading] = useState(false);
    const [banners, setBanners] = useState([]);
    const [error, setError] = useState(null); // Add error state

    const fetchData = async () => {
        setLoading(true);
        setError(null); // Reset error state before fetching
        try {
            const response = await getBannerApi();
            if (response && response.length > 0) {
                setBanners(response);
            } else {
                setError('No banners available'); // Set error if no banners found
            }
        } catch (err) {
            setError('Error fetching banners'); // Set error on API failure
            console.error('Error fetching banner data:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleModalClose = (e) => {
        if (e && e.target.className.includes('ant-modal-close')) {
            onClose();
        }
    };

    console.log(banners.map(item => item.image));
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
                    {loading ? (
                        <Skeleton active className="h-[400px] sm:h-[500px] lg:h-[600px]" />
                    ) : error ? ( // Show error message if there's an error
                        <div className="text-center py-10">
                            <p>{error}</p>
                        </div>
                    ) : banners?.length > 0 ? ( // Check if banners exist before rendering the Swiper
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
                            {banners?.map((item, index) => (
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
                        <Empty description="No banners available" /> // Show empty state if no banners
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
