import React, { useEffect, useState } from 'react'
import { PostNavbar } from '../post/components/PostNavbar.jsx'

// images
import adsImg from '../../assets/images/ads.jpg'
import bgPostOverlay from '../../assets/images/webp/postOverlay.webp'
import { FaFacebook, FaFacebookF } from 'react-icons/fa';
import { FiChevronDown, FiChevronsDown, FiDownload, FiDownloadCloud } from 'react-icons/fi'
import { IoLogoWhatsapp, IoMdCheckmark, IoMdPin } from 'react-icons/io'
import { GoDotFill } from 'react-icons/go'
import { NewsNavbar } from '../news/components/NewsNavbar.jsx'
import { BiSolidPhoneCall } from 'react-icons/bi';
import { useParams } from 'react-router-dom';
import { getBannerApi } from '../../api/banner.js';
import { Navbar } from '../../components/Navbar.jsx';
import { addDownloadTotalApi } from '../../api/download.js';
import { message } from 'antd';

export const AdsDetail = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const [loading, setLoading] = useState(false)
    const [banners, setBanners] = useState([]);
    const adsID = useParams()
    const id = adsID.id

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

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth)
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    // filter data in banners by id
    const filteredBanners = banners?.filter((banner) => banner?.id === id)
    // console.log("ss", filteredBanners);

    const thisUrl = window.location.href
    console.log(thisUrl);
    const whatsappMessage = `ສົນໃຈທຶນນີ້: ${thisUrl}`;
    const whatsappUrl = `https://api.whatsapp.com/send?phone=8562092111722&text=${encodeURIComponent(whatsappMessage)}`;


    const handleDownload = async () => {
        // แสดงข้อความเตือนเมื่อเริ่มดาวน์โหลด
        message.warning("ກຳລັງດາວໂຫຼດ!");

        // หน่วงเวลา 1 วินาที (1000 มิลลิวินาที) ก่อนที่จะแสดงข้อความสำเร็จ
        setTimeout(async () => {
            // ข้อมูลที่ใช้ในการบันทึกดาวน์โหลด
            const data = { type: "banner" };

            // ส่งข้อมูลไปยัง API เพื่อบันทึกจำนวนดาวน์โหลด
            const response = await addDownloadTotalApi(data);

            // แสดงข้อความสำเร็จหลังจากดาวน์โหลดเสร็จ
            message.success("ດາວໂຫຼດສຳເລັດ!");

            return response;
        }, 700);
    };

    const viewPdf = banners
        .filter((item) => item?.id === id)
        .map((item) => item?.url_path);
    const imagePoster = banners
        .filter((item) => item?.id === id)
        .map((item) => item?.image);
    // viewPdf.map((item, index) => console.log(`banners[${index}] =========>>>>>>`, index));
    console.log("views", viewPdf[0]);
    return (
        <div>
            {
                windowWidth < 480 ? (
                    filteredBanners?.map((item, index) => (
                        <PostNavbar>
                            <div key={index}
                                className=' pt-[70px] pb-5'>
                                <div className=' w-full '>
                                    <img src={`https://saiyfonbroker.s3.ap-southeast-1.amazonaws.com/images/${imagePoster[0]}`} alt="" />
                                </div>
                                <div className='w-full container max-w-[350px] mx-auto sm:max-w-[600px] md:max-w-[720px] lg:max-w-[900px] xl:max-w-[1200px]'>
                                    <div className='mt-3 flex items-center text-[#DEAD00]'>
                                        <GoDotFill className=' text-[12px]' />
                                        <h1 className=' text-[20px] font-medium pl-2 py-2.5 border-b border-[#DEAD00]'>
                                            ປະກາດເປີດຮັບສະໝັກທຶນ <span className=' font-bold text-[20px]'>
                                                {item?.title}
                                            </span>
                                        </h1>
                                    </div>
                                    <ul className='mt-3 flex items-center gap-x-5'>
                                        <li className=' font-medium text-[16px]'>
                                            - ທຶນການສຶກສາ
                                        </li>
                                        <li className=' font-medium text-[16px]'>
                                            # ເງື່ອນໄຂທີ່ຄຸ້ມຄ່າທີ່ສຸດ
                                        </li>
                                    </ul>
                                    {
                                        filteredBanners?.map((item, index) => (
                                            item?.id == id && (
                                                <div key={index} className=' grid grid-cols-12 gap-x-5 mt-2 list-inside list-disc px-2'>
                                                    <div className='flex flex-col col-span-5 gap-y-3 font-medium'>
                                                        {
                                                            item?.typescholarship?.map((item) => (
                                                                <div className='flex items-center gap-x-2'>
                                                                    <GoDotFill className='text-[7px]' />
                                                                    <p className='sm:text-[16px]'>
                                                                        {item}
                                                                    </p>
                                                                </div>
                                                            ))
                                                        }
                                                    </div>
                                                    <div className='flex flex-col col-span-7 gap-y-3 font-medium'>
                                                        {
                                                            item?.document?.map((item) => (
                                                                <div className='flex items-center gap-x-2'>
                                                                    <GoDotFill className='text-[7px]' />
                                                                    <p className='sm:text-[16px]'>
                                                                        {item}
                                                                    </p>
                                                                </div>
                                                            ))
                                                        }
                                                    </div>
                                                </div>
                                            )
                                        ))
                                    }
                                    <div className=' mt-5'>
                                        <div className=' flex gap-x-1'>
                                            <IoMdPin className='text-[18px] text-[#F7C208]' />
                                            <div>
                                                <p className=' text-[12px]'>
                                                    ສຳນັກງານຫ້ອງການຕັ້ງຢູ່: ບ້ານໂນນວາຍ ເມືອງໄຊເສດຖາ ນະຄວນຫຼວງວຽງຈັນ
                                                </p>
                                                <p className=' text-[12px]'>
                                                    20xxxxxxx 20xxxxxxxx
                                                </p>
                                            </div>
                                        </div>
                                        <div className='flex flex-row-reverse mt-5 gap-x-14 items-center'>
                                            <div className="relative inline-block text-left">
                                                <div>
                                                    <button
                                                        type="button"
                                                        className="inline-flex justify-center w-full rounded-md border-2 border-[#13BBB6] px-4 py-2 bg-white text-sm font-medium text-[#13BBB6] hover:bg-gray-50 focus:outline-none "
                                                        id="options-menu"
                                                        aria-haspopup="true"
                                                        aria-expanded="true"
                                                        onClick={() => setIsOpen(!isOpen)}
                                                    >
                                                        ດາວໂຫຼດຟອມ
                                                        <FiChevronsDown className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
                                                    </button>
                                                </div>

                                                {isOpen && (
                                                    <div className="origin-top-right z-[9999999] absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                                        <div className=" p-2" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                                            {viewPdf[0].slice(0, 8).map((item, index) => (
                                                                <a
                                                                    key={index}
                                                                    onClick={handleDownload}
                                                                    href={`https://saiyfonbroker.s3.ap-southeast-1.amazonaws.com/pdfs/${encodeURIComponent(item)}`}
                                                                    download={`${item}`} // ชื่อไฟล์ที่จะแสดงเมื่อดาวน์โหลด
                                                                    className="block px-4 py-2.5 rounded-md duration-200 text-sm text-gray-700 hover:bg-[#13BBB6] hover:text-white"
                                                                    role="menuitem"
                                                                >
                                                                    <FiDownloadCloud className="inline-block mr-2" />
                                                                    ດາວໂຫຼດຟອມ {index + 1}
                                                                </a>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                            <a href={whatsappUrl}
                                                target='_blank'
                                                rel='noopener noreferrer'
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
                        </PostNavbar>
                    ))
                ) :
                    (
                        filteredBanners?.map((item, index) => (
                            <Navbar>
                                <div key={index}
                                    className='pt-[80px] container max-w-[350px] mx-auto sm:max-w-[600px] md:max-w-[720px] lg:max-w-[900px] xl:max-w-[1200px] pb-10'>
                                    <div className=' w-full '>
                                        <img src={`https://saiyfonbroker.s3.ap-southeast-1.amazonaws.com/images/${item?.image}`} alt=""
                                            className=' w-full h-[550px] object-cover'
                                        />
                                    </div>
                                    <div className=' grid grid-cols-12 gap-x-10 mt-20 sm:gap-x-3 xl:gap-x-4'>
                                        {
                                            filteredBanners?.map((item, index) => (
                                                item?.id == id && (
                                                    <div key={index} className=' lg:col-span-9 col-span-8 '>
                                                        <div className=' flex flex-col gap-y-3'>
                                                            <h1 className=' sm:text-[18px] md:text-[22px] font-medium'>
                                                                ລາຍລະອຽດກ່ຽວກັບທຶນ
                                                            </h1>
                                                            <p className=' sm:text-[12px] text-[14px]  lg:text-[16px]'>
                                                                {item?.detail}
                                                            </p>
                                                        </div>
                                                        <div className=' mt-10'>
                                                            <h1 className='sm:text-[18px] md:text-[22px] font-medium mb-2'>
                                                                ຂໍ້ມູນຂອງທຶນ
                                                            </h1>
                                                            <div className=' grid grid-cols-12 gap-x-10 gap-y-5'>
                                                                {
                                                                    item?.typescholarship?.map((item) => (
                                                                        <div className=' col-span-6 flex items-center gap-x-4'>
                                                                            <div className=' w-[20px] h-[20px] flex items-center justify-center rounded-full bg-[#01a7b1]'>
                                                                                <IoMdCheckmark className=' text-[16px] text-white' />
                                                                            </div>
                                                                            <p className=' sm:text-[12px] md:text-[14px] lg:text-[16px]'>
                                                                                {item}
                                                                            </p>
                                                                        </div>
                                                                    ))
                                                                }
                                                            </div>
                                                        </div>

                                                        <div className=' mt-10'>
                                                            <h1 className='sm:text-[18px] md:text-[22px] font-medium mb-2'>
                                                                ເອກະສານທີ່ຕ້ອງກຽມ
                                                            </h1>
                                                            <div className=' grid grid-cols-12 gap-x-10 gap-y-5'>
                                                                {
                                                                    item?.document?.map((item) => (
                                                                        <div className=' col-span-6 flex items-center gap-x-4'>
                                                                            <div className=' w-[20px] h-[20px] flex items-center justify-center rounded-full bg-[#01a7b1]'>
                                                                                <IoMdCheckmark className=' text-[16px] text-white' />
                                                                            </div>
                                                                            <p className=' sm:text-[12px] md:text-[14px] '>
                                                                                {item}
                                                                            </p>
                                                                        </div>
                                                                    ))
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            ))
                                        }

                                        <div className='lg:col-span-3 col-span-4'>
                                            <div className='relative z-10 sm:h-[200px] md:h-[250px] sm:mt-5 w-full bg-[#01A7B1] rounded-lg'>
                                                <img
                                                    src={bgPostOverlay}
                                                    alt="Background Overlay"
                                                    className='absolute z-0 w-full h-full object-cover opacity-30'
                                                />
                                                <div className='relative z-20 h-full flex flex-col sm:gap-y-3 md:gap-y-5 justify-center text-white px-5'>
                                                    <h2 className=' sm:text-[16px] md:text-[18px] lg:text-[20px]'>
                                                        ຖ້າທ່ານມີຄຳຖາມກະລຸນາຕິດຕໍ່
                                                    </h2>
                                                    <p className=' sm:text-[12px] md:text-[14px] lg:text-[16px]'>
                                                        Lorem ipsum dolor sit amet, <br /> consectetur adipiscing
                                                    </p>
                                                    <div className=' flex flex-col gap-y-3'>
                                                        <div className=' flex items-center gap-x-3 md:text-[16px]'>
                                                            <BiSolidPhoneCall className=' text-[16px] md:text-[20px]' />
                                                            <p className=' sm:text-[13px] md:text-[14px]'>20 xxxx xx00</p>
                                                        </div>
                                                        <div className=' flex items-center gap-x-3 md:text-[16px]'>
                                                            <FaFacebookF className=' text-[16px] md:text-[20px]' />
                                                            <p className=' sm:text-[13px] md:text-[14px]'>ບີທີພີ ທຶນຮຽນຕໍ່ຕ່າງປະເທດ</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <div className=' flex flex-row-reverse  mt-5 gap-x-14 items-center'>
                                        <div className="relative inline-block text-left">
                                            <div>
                                                <button
                                                    type="button"
                                                    className="inline-flex justify-center w-full rounded-md border-2 border-[#13BBB6] px-4 py-2 bg-white text-sm font-medium text-[#13BBB6] hover:bg-gray-50 focus:outline-none "
                                                    id="options-menu"
                                                    aria-haspopup="true"
                                                    aria-expanded="true"
                                                    onClick={() => setIsOpen(!isOpen)}
                                                >
                                                    ດາວໂຫຼດຟອມ
                                                    <FiChevronsDown className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
                                                </button>
                                            </div>

                                            {isOpen && (
                                                <div className="origin-top-right z-[9999999] absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                                    <div className=" p-2" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                                        {viewPdf[0].slice(0, 8).map((item, index) => (
                                                            <a
                                                                key={index}
                                                                onClick={handleDownload}
                                                                href={`https://saiyfonbroker.s3.ap-southeast-1.amazonaws.com/pdfs/${encodeURIComponent(item)}`}
                                                                download={`${item}`} // ชื่อไฟล์ที่จะแสดงเมื่อดาวน์โหลด
                                                                className="block px-4 py-2.5 rounded-md duration-200 text-sm text-gray-700 hover:bg-[#13BBB6] hover:text-white"
                                                                role="menuitem"
                                                            >
                                                                <FiDownloadCloud className="inline-block mr-2" />
                                                                ດາວໂຫຼດຟອມ {index + 1}
                                                            </a>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        <a href={whatsappUrl}
                                            target='_blank'
                                            rel='noopener noreferrer'
                                            className='flex flex-col items-center'>
                                            <IoLogoWhatsapp className='text-[#0FC146] text-[28px]' />
                                            <span className='text-[#13BBB6] text-[14px] font-semibold'>
                                                ສົນໃຈ
                                            </span>
                                        </a>
                                    </div>
                                </div>
                            </Navbar>
                        ))
                    )
            }
        </div>
    )
}
