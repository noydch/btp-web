import React from 'react';
import { Modal, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

import adsImg from '../assets/images/ads.jpg';

const ModalAds = ({ show, onClose }) => {
    const navigate = useNavigate();

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${show ? 'opacity-100 visible' : 'opacity-0 invisible'
                }`}
        >
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>

            <Modal
                title={null}
                open={show}
                onCancel={onClose}
                footer={null}
                closable={false}
                centered
                mask={false}
            // bodyStyle={{ padding: 0, borderRadius: '0.375rem', overflow: 'hidden' }}
            // className="relative w-[90%] sm:w-[70%] md:w-[60%] lg:w-[50%] xl:w-[40%] max-w-none bg-transparent shadow-none"
            >
                <div className="relative bg-white rounded-lg">
                    <div onClick={() => navigate('/adsDetail')} className="cursor-pointer">
                        <img src={adsImg} alt="Advertisement" className="w-full object-cover" />
                    </div>
                </div>
                <Button
                    onClick={onClose}
                    className="absolute top-2 right-2 bg-white text-black rounded-full"
                    shape="circle"
                >
                    ✕
                </Button>
            </Modal>
        </div>
    );
};

export default ModalAds;
