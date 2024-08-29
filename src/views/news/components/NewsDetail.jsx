import React, { useEffect, useState } from 'react'
import { PostNavbar } from '../../post/components/PostNavbar.jsx.jsx'
import { useNavigate, useParams } from 'react-router-dom';

import { LuDot } from "react-icons/lu";
import { GoDotFill } from "react-icons/go";
import { IoMdPin } from 'react-icons/io';
import { IoLogoWhatsapp } from "react-icons/io";
import { FiDownload } from "react-icons/fi";
import { newsData } from '../newsData.jsx';
import { NewsNavbar } from './NewsNavbar.jsx';
import { NewsDetailBigSize } from './NewsDetailBigSize.jsx';
import { getNewsApi } from '../../../api/news.js';

export const NewsDetail = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [newsData, setNewsData] = useState([])
    const id = useParams()
    // console.log(id.pID);
    const postID = id.nID;
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)


    const fetchData = async () => {
        setLoading(true)
        try {
            const response = await getNewsApi()
            setNewsData(response)
            setLoading(false)
        } catch (error) {
            console.error("Error can not response News data from Api", error);
            // setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
        console.log(newsData);
    }, [])

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth)
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const viewPdf = newsData
        .filter((item) => item?.id === postID)
        .map((item) => item?.file_url);
    console.log("view=", viewPdf[0]);
    return (
        <>
            {
                windowWidth <= 480 ? (
                    <NewsNavbar>
                        <div className=' pt-[65px] w-full '>
                            <div className=''>
                                {
                                    newsData.map((item, index) => (
                                        item.id == postID && (
                                            <div key={index}>
                                                <img src={item.image} alt="" />
                                                <div></div>
                                            </div>
                                        )
                                    ))
                                }
                            </div>
                        </div>
                        <div className='container max-w-[350px] mx-auto sm:max-w-[600px] md:max-w-[720px] lg:max-w-[900px] xl:max-w-[1200px] pb-10'>
                            <div className='mt-3 flex items-center text-[#DEAD00]'>
                                <GoDotFill className=' text-[12px]' />
                                <h1 className=' text-[20px] sm:text-[22px] font-medium pl-2 py-2.5 border-b border-[#DEAD00]'>
                                    ປະກາດເປີດຮັບສະໝັກທຶນ <span className=' font-bold text-[20px]'>2024</span>
                                </h1>
                            </div>
                            <ul className='mt-3 flex items-center gap-x-10'>
                                <li className=' font-medium text-[16px] sm:text-[18px]'>
                                    - ທຶນການສຶກສາ
                                </li>
                                <li className=' font-medium text-[16px] sm:text-[18px]'>
                                    # ເງື່ອນໄຂທີ່ຄຸ້ມຄ່າທີ່ສຸດ
                                </li>
                            </ul>
                            <div className='flex gap-x-14 mt-2 list-inside list-disc px-2'>
                                <div className=' flex flex-col gap-y-3 font-medium'>
                                    <div className=' flex items-center gap-x-2'>
                                        <GoDotFill className=' text-[7px]' />
                                        <p className=' text-[16px]'>
                                            ຄ່າຮຽນຟຣີ
                                        </p>
                                    </div>
                                    <div className=' flex items-center gap-x-2'>
                                        <GoDotFill className=' text-[7px]' />
                                        <p className=' text-[16px]'>
                                            ຄ່າຮຽນຟຣີ
                                        </p>
                                    </div>
                                    <div className=' flex items-center gap-x-2'>
                                        <GoDotFill className=' text-[7px]' />
                                        <p className=' text-[16px]'>
                                            ຄ່າຮຽນຟຣີ
                                        </p>
                                    </div>
                                </div>
                                <div className=' flex flex-col gap-y-3 font-medium'>
                                    <div className=' flex items-center gap-x-2'>
                                        <GoDotFill className=' text-[7px]' />
                                        <p className=' text-[16px]'>
                                            ມີອາຈານນຳພາໄປຮອດໂຮງຮຽນ
                                        </p>
                                    </div>
                                    <div className=' flex items-center gap-x-2'>
                                        <GoDotFill className=' text-[7px]' />
                                        <p className=' text-[16px]'>
                                            ຄ່າ Visa
                                        </p>
                                    </div>
                                    <div className=' flex items-center gap-x-2'>
                                        <GoDotFill className=' text-[7px]' />
                                        <p className=' text-[16px]'>
                                            ມີເບ້ຍລ້ຽງ 600-1200 ຢວນ/ເດືອນ
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className=' mt-5'>
                                <div className=' flex gap-x-1'>
                                    <IoMdPin className='text-[18px] text-[#F7C208]' />
                                    <div>
                                        <p className=' text-[12px] sm:text-[14px]'>
                                            ສຳນັກງານຫ້ອງການຕັ້ງຢູ່: ບ້ານໂນນວາຍ ເມືອງໄຊເສດຖາ ນະຄວນຫຼວງວຽງຈັນ
                                        </p>
                                        <p className=' text-[12px] sm:text-[14px]'>
                                            20xxxxxxx 20xxxxxxx
                                        </p>
                                    </div>
                                </div>
                                <div className=' flex flex-row-reverse  mt-5 gap-x-14 items-center'>
                                    <a
                                        target='_blank'
                                        href={`https://docs.google.com/gview?embedded=true&url=${viewPdf}`}
                                        className='flex items-center gap-x-2 px-2 py-2 text-[#13BBB6] font-medium rounded-md border-2 border-[#13BBB6]'

                                    >
                                        <FiDownload />
                                        ດາວໂຫຼດຟອມ
                                    </a>
                                    <div className=' flex flex-col items-center'>
                                        <IoLogoWhatsapp className=' text-[#0FC146] text-[28px]' />
                                        <span className='text-[#13BBB6] text-[14px] font-semibold'>
                                            ສົນໃຈ
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </NewsNavbar>
                ) : (
                    <NewsDetailBigSize newsData={newsData} viewPdf={viewPdf} />
                )
            }
        </>
    )
}
