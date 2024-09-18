import React, { useEffect, useState } from 'react';
import { ContactNavbar } from './components/ContactNavbar';
import logo from '../../assets/images/logo.webp';
import { ContactBigSize } from './components/ContactBigSize';
import Swal from 'sweetalert2';
import { addContactApi } from '../../api/contact';
// import { addContactApi } from '../../../api/contact'; 

export const Contact = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        comment: ''
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const validateForm = () => {
        let newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'ກະລຸນາປ້ອນຊື່';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'ກະລຸນາປ້ອນອີເມລ';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'ກະລຸນາປ້ອນອີເມລທີ່ຖືກຕ້ອງ';
        }

        if (!formData.phoneNumber.trim()) {
            newErrors.phoneNumber = 'ກະລຸນາປ້ອນເບີໂທ';
        } else if (!/^\d{8,}$/.test(formData.phoneNumber)) {
            newErrors.phoneNumber = 'ກະລຸນາປ້ອນເບີໂທທີ່ຖືກຕ້ອງ (ຢ່າງໜ້ອຍ 8 ຕົວເລກ)';
        }

        if (!formData.comment.trim()) {
            newErrors.comment = 'ກະລຸນາປ້ອນຂໍ້ຄວາມ';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            handleSaveData();
        } else {
            //console.log('Form has errors');
        }
    };

    const handleSaveData = async () => {
        Swal.fire({
            title: "ທ່ານຕ້ອງການສົ່ງຂໍ້ຄວາມນີ້ແມ່ນບໍ່?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "ຕົກລົງ",
            cancelButtonText: 'ຍົກເລີກ'
        }).then(async (result) => {
            if (result.isConfirmed) {
                setLoading(true)
                const response = await addContactApi(formData);
                if (response) {
                    Swal.fire({
                        title: "ສົ່ງສຳເລັດ!",
                        icon: "success"
                    });
                    setFormData({
                        name: '',
                        email: '',
                        phoneNumber: '',
                        comment: ''
                    });
                    setLoading(false)
                }
            }
        });
    };

    return (
        <ContactNavbar>
            {
                windowWidth < 640 ? (
                    <div className='w-full h-full bg-white'>
                        <div className='pt-[70px]'>
                            <div className='relative bg-[#AFE7FF] h-[100px]'>
                                <img src={logo} alt=""
                                    className='w-[120px] absolute left-[50%] -translate-x-1/2 -bottom-[60px]'
                                />
                            </div>
                        </div>
                        <div className='w-full container max-w-[350px] mx-auto sm:max-w-[600px] md:max-w-[720px] lg:max-w-[900px] mt-7 pb-20'>
                            <div className='flex flex-col items-center mt-24'>
                                <h4 className='text-[16px] sm:text-[18px] font-medium'>ເບີໂທຕິດຕໍ່ 020 9211 1722 </h4>
                                <h6 className='font-medium sm:text-[16px]'>ບີທີພີ ທຶນຮຽນຕໍ່ຕ່າງປະເທດ</h6>
                            </div>
                            <form onSubmit={handleSubmit} className='mt-10'>
                                <h2 className='text-[18px] font-semibold'>
                                    Contact us
                                </h2>
                                <div className='mt-3'>
                                    <div className='flex flex-col gap-y-7'>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder='Name'
                                            className='border-b-2 border-[#D8D8D8] w-full py-2 outline-none'
                                        />
                                        {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
                                        <input
                                            type="text"
                                            name="phoneNumber"
                                            value={formData.phoneNumber}
                                            onChange={handleChange}
                                            placeholder='Phone'
                                            className='border-b-2 border-[#D8D8D8] w-full py-2 outline-none'
                                        />
                                        {errors.phoneNumber && <span className="text-red-500 text-sm">{errors.phoneNumber}</span>}
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder='Email'
                                            className='border-b-2 border-[#D8D8D8] w-full py-2 outline-none'
                                        />
                                        {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
                                        <textarea
                                            rows="7"
                                            name="comment"
                                            value={formData.comment}
                                            onChange={handleChange}
                                            placeholder='Comment'
                                            className='resize-none border-b-2 border-[#D8D8D8] w-full py-2 outline-none'
                                        ></textarea>
                                        {errors.comment && <span className="text-red-500 text-sm">{errors.comment}</span>}
                                    </div>
                                    <button
                                        type="submit"
                                        className='mt-12 bg-[#01A7B1] w-full py-3 rounded-lg text-[18px] text-white font-medium'
                                        disabled={loading}
                                    >
                                        {
                                            loading ? <p className=' flex items-center justify-center gap-x-3'>ກຳລັງສົ່ງ <span className="loader"></span></p> : "ສົ່ງ"
                                        }
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                ) : (
                    <ContactBigSize loading={loading} />
                )
            }
        </ContactNavbar>
    );
};
