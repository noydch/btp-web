import React, { useState } from 'react'
import { ContactNavbar } from './ContactNavbar'
import logo from '../../../assets/images/webp/logoBig.webp'
import bgOverlay from '../../../assets/images/webp/postOverlay.webp'
import { BiSolidPhoneCall } from 'react-icons/bi'
import { FaFacebookF } from 'react-icons/fa'
import Swal from 'sweetalert2'
import { addContactApi } from '../../../api/contact'

export const ContactBigSize = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        comment: ''
    });

    const [errors, setErrors] = useState({});

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
            newErrors.name = 'ກະລຸນາປ້ອນຊື່ ແລະ ນາມສະກຸນ';
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
            console.log('Form has errors');
        }
    };

    const handleSaveData = () => {
        Swal.fire({
            title: "ທ່ານຕ້ອງການບັນທຶກລາຍການນີ້ແມ່ນບໍ່?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "ຕົກລົງ",
            cancelButtonText: 'ຍົກເລີກ'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await addContactApi(formData)
                if (response) {
                    Swal.fire({
                        title: "ບັນທຶກສຳເລັດ!",
                        icon: "success"
                    });
                    // Assuming 'navigate' is defined elsewhere in your component or passed as a prop
                    // navigate('/contactManangement')
                }
            }
        });
    }

    return (
        <div className=' bg-white h-full w-full'>
            <div className='w-full h-full'>
                <div className='pt-[70px]'>
                    <div className='relative bg-[#AFE7FF] h-[200px]'>
                        <img src={logo} alt=""
                            className='w-[240px] absolute left-[50%] -translate-x-1/2 -bottom-[120px]'
                        />
                    </div>
                </div>
                <div className=''>
                    <div className='w-full container max-w-[350px] mx-auto sm:max-w-[600px] md:max-w-[720px] lg:max-w-[900px] sm:mt-44 md:mt-52 pb-20'>
                        <form onSubmit={handleSubmit} className='rounded-lg bg-white shadow-[0px_-2px_24.7px_0px_#00000024]'>
                            <div className='p-4 flex gap-x-10 items-center sm:h-[400px] md:h-[480px]'>
                                <div className='flex-[2] h-full'>
                                    <div className='w-full bg-[#01A7B1] h-full relative z-10 rounded-lg'>
                                        <img src={bgOverlay} alt=""
                                            className='absolute z-0 w-full h-full opacity-20 object-cover rounded-lg'
                                        />
                                        <div className='relative z-20 h-full flex flex-col gap-y-5 text-white px-5'>
                                            <h2 className='sm:text-[16px] lg:text-[24px] mt-10 lg:mt-20'>
                                                ຖ້າທ່ານມີຄຳຖາມກະລຸນາຕິດຕໍ່
                                            </h2>
                                            <p>
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, <br /> sed do eiusmod tempor
                                            </p>
                                            <div className='flex flex-col gap-y-3 lg:gap-y-7 mt-5'>
                                                <div className='flex items-center gap-x-3 text-[16px]'>
                                                    <BiSolidPhoneCall className='sm:text-[24px] md:text-[30px]' />
                                                    <p className='sm:text-[12px] lg:text-[18px]'>20 xxxx xx00</p>
                                                </div>
                                                <div className='flex items-center gap-x-3 text-[16px]'>
                                                    <FaFacebookF className='sm:text-[24px] md:text-[30px]' />
                                                    <p className='sm:text-[12px] lg:text-[18px]'>ບີທີພີ ທຶນຮຽນຕໍ່ຕ່າງປະເທດ</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex-[3]'>
                                    <div className='flex gap-x-5 mt-0'>
                                        <div className='flex flex-col w-full gap-y-2'>
                                            <label htmlFor="name">ຊື່ ແລະ ນາມສະກຸນ</label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                className='border rounded-md w-full text-[16px] pl-6 py-2 placeholder:text-[14px] outline-[#01A7B1]'
                                                placeholder='ປ້ອນຊື່ ແລະ ນາມສະກຸນ'
                                            />
                                            {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
                                        </div>
                                        <div className='flex flex-col w-full gap-y-2'>
                                            <label htmlFor="email">Email</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className='border rounded-md w-full text-[16px] pl-6 py-2 placeholder:text-[14px] outline-[#01A7B1]'
                                                placeholder='ປ້ອນອີເມລ'
                                            />
                                            {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
                                        </div>
                                    </div>
                                    <div className='mt-5 w-full'>
                                        <label htmlFor="phoneNumber">ເບີໂທ</label>
                                        <input
                                            type="text"
                                            name="phoneNumber"
                                            value={formData.phoneNumber}
                                            onChange={handleChange}
                                            className='border rounded-md w-full text-[16px] pl-6 py-2 placeholder:text-[14px] outline-[#01A7B1]'
                                            placeholder='ປ້ອນເບີໂທ'
                                        />
                                        {errors.phoneNumber && <span className="text-red-500 text-sm">{errors.phoneNumber}</span>}
                                    </div>
                                    <div className='mt-4 w-full'>
                                        <h4 className='font-medium text-[#01A7B1] mb-2'>Message</h4>
                                        <textarea
                                            rows="3"
                                            name="comment"
                                            value={formData.comment}
                                            onChange={handleChange}
                                            placeholder='Write here the comment'
                                            className='border-b-2 p-4 w-full resize-none focus:outline-teal-500'
                                        ></textarea>
                                        {errors.comment && <span className="text-red-500 text-sm">{errors.comment}</span>}
                                    </div>
                                    <div className='mt-10'>
                                        <button type="submit" className='bg-[#01A7B1] px-6 py-2 rounded-md text-white font-normal'>
                                            ສົ່ງຂໍ້ຄວາມ
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}