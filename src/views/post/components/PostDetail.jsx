import React, { useEffect, useState } from 'react'
import { PostNavbar } from '../../post/components/PostNavbar.jsx.jsx'
import { useParams } from 'react-router-dom';

import { LuDot } from "react-icons/lu";
import { GoDotFill } from "react-icons/go";
import { IoMdPin } from 'react-icons/io';
import { IoLogoWhatsapp } from "react-icons/io";
import { FiDownload } from "react-icons/fi";
import { cardPostData } from '../cardPostData.jsx';
import { PostDetailBigSize } from './PostDetailBigSize.jsx';


export const PostDetail = () => {
    const id = useParams()
    // console.log(id.pID);
    const postID = id.pID;

    const [windowWidth, setWindowWidth] = useState(window.innerWidth)

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth)
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return (
        <PostNavbar>
            {
                windowWidth <= 480 ? (
                    <div>
                        <div className=' pt-[65px] w-full '>
                            <div className=''>
                                {
                                    cardPostData.map((item, index) => (
                                        item.id == postID && (
                                            <div key={index}>
                                                <img src={item.picture} alt="" />
                                                <div></div>
                                            </div>
                                        )
                                    ))
                                }
                            </div>
                        </div>
                        <div className='container max-w-[340px] mx-auto sm:max-w-[600px] md:max-w-[720px] pb-10'>
                            <div className='mt-3 flex items-center text-[#DEAD00]'>
                                <GoDotFill className=' text-[12px]' />
                                <h1 className=' text-[20px] font-medium pl-2 py-2.5 border-b border-[#DEAD00]'>
                                    ປະກາດເປີດຮັບສະໝັກທຶນ <span className=' font-bold text-[20px] sm:text-[22px]'>2024</span>
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
                                        <p className=' sm:text-[16px]'>
                                            ຄ່າຮຽນຟຣີ
                                        </p>
                                    </div>
                                    <div className=' flex items-center gap-x-2'>
                                        <GoDotFill className=' text-[7px]' />
                                        <p className=' sm:text-[16px]'>
                                            ຄ່າຮຽນຟຣີ
                                        </p>
                                    </div>
                                    <div className=' flex items-center gap-x-2'>
                                        <GoDotFill className=' text-[7px]' />
                                        <p className=' sm:text-[16px]'>
                                            ຄ່າຮຽນຟຣີ
                                        </p>
                                    </div>
                                </div>
                                <div className=' flex flex-col gap-y-3 font-medium'>
                                    <div className=' flex items-center gap-x-2'>
                                        <GoDotFill className=' text-[7px]' />
                                        <p className=' sm:text-[16px]'>
                                            ມີອາຈານນຳພາໄປຮອດໂຮງຮຽນ
                                        </p>
                                    </div>
                                    <div className=' flex items-center gap-x-2'>
                                        <GoDotFill className=' text-[7px]' />
                                        <p className=' sm:text-[16px]'>
                                            ຄ່າ Visa
                                        </p>
                                    </div>
                                    <div className=' flex items-center gap-x-2'>
                                        <GoDotFill className=' text-[7px]' />
                                        <p className=' sm:text-[16px]'>
                                            ມີເບ້ຍລ້ຽງ 600-1200 ຢວນ/ເດືອນ
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className=' mt-5 sm:mt-10'>
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
                                <div className=' flex flex-row-reverse mt-5 gap-x-14 items-center'>
                                    <button className=' flex items-center gap-x-2 px-2 py-2 text-[#13BBB6] font-medium rounded-md border-2 border-[#13BBB6]'>
                                        <FiDownload />
                                        ດາວໂຫຼດຟອມ
                                    </button>
                                    <div className=' flex flex-col items-center'>
                                        <IoLogoWhatsapp className=' text-[#0FC146] text-[28px]' />
                                        <span className='text-[#13BBB6] text-[14px] font-semibold'>
                                            ສົນໃຈ
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <PostDetailBigSize />
                )
            }
        </PostNavbar>
    )
}
