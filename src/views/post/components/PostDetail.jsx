import React, { useEffect, useState } from 'react';
// import { PostNavbar } from '../../post/components/PostNavbar';
import { useNavigate, useParams } from 'react-router-dom';
import { LuDot } from "react-icons/lu";
import { GoDotFill } from "react-icons/go";
import { IoMdPin } from 'react-icons/io';
import { IoLogoWhatsapp } from "react-icons/io";
import { FiDownload } from "react-icons/fi";
import { cardPostData } from '../cardPostData';
import { PostDetailBigSize } from './PostDetailBigSize';
import { getCategoryApi } from '../../../api/category';
import { getService } from '../../../api/serivce';
import Swal from 'sweetalert2';
import { PostNavbar } from './PostNavbar.jsx';

export const PostDetail = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const [postData, setPostData] = useState([]);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const { pID } = useParams(); // Destructure pID from useParams
    const postID = pID;

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await getService();
                if (!response) {
                    throw new Error('No response from API');
                }
                setPostData(response);
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: "ເກີດຂໍ້ຜິດພາດ",
                    text: "ບໍ່ສາມາດດຶງຂໍ້ມູນໄດ້",
                });
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const downloadPDF = (pdfUrl) => {
        const link = document.createElement('a');
        link.href = pdfUrl;
        link.setAttribute('download', 'document.pdf'); // You can set the name of the downloaded file here
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };



    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = 'https://res.cloudinary.com/dq3d5qshp/raw/upload/v1724406425/FILE_1724406415783.pdf'; // Replace with your file URL
        link.download = 'filename.pdf'; // Replace with the desired file name
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <PostNavbar>
            {windowWidth <= 480 ? (
                <div>
                    <div className='pt-[65px] w-full'>
                        {postData.map((item, index) => (
                            item.id == postID && (
                                <div key={index}>
                                    <img src={item.image} alt="" />
                                    <div></div>
                                </div>
                            )
                        ))}
                    </div>
                    <div className='container max-w-[350px] mx-auto sm:max-w-[600px] md:max-w-[720px] pb-10'>
                        <div className='mt-3 flex items-center text-[#DEAD00]'>
                            <GoDotFill className='text-[12px]' />
                            <h1 className='text-[20px] font-medium pl-2 py-2.5 border-b border-[#DEAD00]'>
                                ປະກາດເປີດຮັບສະໝັກທຶນ <span className='font-bold text-[20px] sm:text-[22px]'>2024</span>
                            </h1>
                        </div>
                        <ul className='mt-3 flex items-center gap-x-10'>
                            <li className='font-medium text-[16px] sm:text-[18px]'>
                                - ທຶນການສຶກສາ
                            </li>
                            <li className='font-medium text-[16px] sm:text-[18px]'>
                                # ເງື່ອນໄຂທີ່ຄຸ້ມຄ່າທີ່ສຸດ
                            </li>
                        </ul>
                        <div className='flex gap-x-14 mt-2 list-inside list-disc px-2'>
                            <div className='flex flex-col gap-y-3 font-medium'>
                                <div className='flex items-center gap-x-2'>
                                    <GoDotFill className='text-[7px]' />
                                    <p className='sm:text-[16px]'>
                                        ຄ່າຮຽນຟຣີ
                                    </p>
                                </div>
                                <div className='flex items-center gap-x-2'>
                                    <GoDotFill className='text-[7px]' />
                                    <p className='sm:text-[16px]'>
                                        ຄ່າຮຽນຟຣີ
                                    </p>
                                </div>
                                <div className='flex items-center gap-x-2'>
                                    <GoDotFill className='text-[7px]' />
                                    <p className='sm:text-[16px]'>
                                        ຄ່າຮຽນຟຣີ
                                    </p>
                                </div>
                            </div>
                            <div className='flex flex-col gap-y-3 font-medium'>
                                <div className='flex items-center gap-x-2'>
                                    <GoDotFill className='text-[7px]' />
                                    <p className='sm:text-[16px]'>
                                        ມີອາຈານນຳພາໄປຮອດໂຮງຮຽນ
                                    </p>
                                </div>
                                <div className='flex items-center gap-x-2'>
                                    <GoDotFill className='text-[7px]' />
                                    <p className='sm:text-[16px]'>
                                        ຄ່າ Visa
                                    </p>
                                </div>
                                <div className='flex items-center gap-x-2'>
                                    <GoDotFill className='text-[7px]' />
                                    <p className='sm:text-[16px]'>
                                        ມີເບ້ຍລ້ຽງ 600-1200 ຢວນ/ເດືອນ
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className='mt-5 sm:mt-10'>
                            <div className='flex gap-x-1'>
                                <IoMdPin className='text-[18px] text-[#F7C208]' />
                                <div>
                                    <p className='text-[12px] sm:text-[14px]'>
                                        ສຳນັກງານຫ້ອງການຕັ້ງຢູ່: ບ້ານໂນນວາຍ ເມືອງໄຊເສດຖາ ນະຄວນຫຼວງວຽງຈັນ
                                    </p>
                                    <p className='text-[12px] sm:text-[14px]'>
                                        20xxxxxxx 20xxxxxxx
                                    </p>
                                </div>
                            </div>
                            <div className='flex flex-row-reverse mt-5 gap-x-14 items-center'>
                                <button
                                    onClick={handleDownload}
                                    className='flex items-center gap-x-2 px-2 py-2 text-[#13BBB6] font-medium rounded-md border-2 border-[#13BBB6]'

                                >
                                    <FiDownload />
                                    ດາວໂຫຼດຟອມ
                                </button>
                                <a href='https://wa.me/message/VKTNJ4453J46P1'
                                    className='flex flex-col items-center'>
                                    <IoLogoWhatsapp className='text-[#0FC146] text-[28px]' />
                                    <span className='text-[#13BBB6] text-[14px] font-semibold'>
                                        ສົນໃຈ
                                    </span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <PostDetailBigSize postData={postData} />
            )}
        </PostNavbar>
    );
};
