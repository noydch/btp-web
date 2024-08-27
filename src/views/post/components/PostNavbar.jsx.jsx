import React, { useEffect, useState } from 'react';
import { Footer } from '../../../components/Footer';
import { useSpring, animated } from 'react-spring';

// images
import logo from '../../../assets/logo.png';

// icons
import { AiOutlineHome } from "react-icons/ai";
import { FaRegNewspaper } from "react-icons/fa6";
import { MdLogin, MdPeopleOutline } from "react-icons/md";
import { RiContactsBook3Line } from "react-icons/ri";
import { IoMenu } from "react-icons/io5";
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';

export const PostNavbar = ({ children }) => {
    const [isOpenMenu, setIsOpenMenu] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const navigate = useNavigate();
    const navActive = ' px-3 text-[#01A7B1] sm:text-white p-2 font-semibold sm:font-medium shadow-[0px_2px_2.3px_0px_#00000024] flex items-center gap-x-3 xl:gap-x-5 sm:border-b-[3px] sm:border-white sm:py-[22px] sm:flex sm:item-center sm:justify-center sm:px-0 w-full sm:w-[100px] text-[14px] lg:w-[120px] md:text-[16px] sm:shadow-none';
    const navList = [
        {
            id: 1,
            title: 'ໜ້າຫຼັກ',
            icon: <AiOutlineHome className=' sm:text-[20px] text-[16px]' />,
            path: '/'
        },
        {
            id: 2,
            title: 'ຂ່າວສານ',
            icon: <FaRegNewspaper className=' sm:text-[20px] text-[16px]' />,
            path: '/news'
        },
        {
            id: 3,
            title: 'ກ່ຽວກັບ',
            icon: <MdPeopleOutline className=' sm:text-[20px] text-[16px]' />,
            path: '/about'
        },
        {
            id: 4,
            title: 'ຕິດຕໍ່',
            icon: <RiContactsBook3Line className=' sm:text-[20px] text-[16px]' />,
            path: '/contact'
        }
    ];

    const location = useLocation();
    const pathname = location.pathname;

    const isActivePath = (path) => {
        if (path === '/') {
            return pathname === '/' || pathname.startsWith('/post');
        }
        return pathname.startsWith(path);
    };

    // Animation for the dropdown
    const dropdownAnimation = useSpring({
        opacity: isOpenMenu ? 1 : 0,
        transform: isOpenMenu ? 'translateX(0%)' : 'translateX(20%)',
        config: { tension: 300, friction: 20 },
    });

    return (
        <div>
            <div className='bg-[#01A7B1] fixed z-[50] w-full
                shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]
            '>
                <div className='container h-[70px] mx-auto max-w-[350px] sm:max-w-[620px] md:max-w-[720px] lg:max-w-[900px] xl:max-w-[1200px]'>
                    <nav className='relative z-[1000] flex items-center h-[70px] justify-between'>
                        <div className=' flex items-center gap-x-2 lg:gap-x-4'>
                            <div className=' flex items-center gap-x-2 lg:gap-x-4'>
                                <div onClick={() => navigate(-1)}
                                    className=' text-[20px] text-white flex justify-center items-center'>
                                    <IoIosArrowBack className=' text-[22px]' />
                                </div>
                                <h1 className='hidden sm:inline-block lg:text-[20px] lg:font-normal text-[14px] font-medium text-white'>
                                    ບີທີພີ ທຶນຮຽນຕໍ່ຕ່າງປະເທດ
                                </h1>
                            </div>
                            <div className='w-[44px] h-[44px] hidden rounded-full border-white border-2 sm:flex justify-center items-center'>
                                <img src={logo} alt=""
                                    className='w-[40px] h-[40px] object-cover'
                                />
                            </div>
                            <h1 className='hidden sm:inline-block lg:text-[20px] lg:font-normal text-[14px] font-medium text-white'>
                                ບີທີພີ ທຶນຮຽນຕໍ່ຕ່າງປະເທດ
                            </h1>
                        </div>
                        <h1 className='sm:hidden text-[18px] lg:text-[20px] md:font-normal font-medium text-white'>
                            ລາຍລະອຽດ
                        </h1>
                        {windowWidth < 480 ? (
                            <animated.ul style={dropdownAnimation} className={` 
                                ${isOpenMenu ? 'absolute px-1 py-1 shadow rounded-b-lg items-start flex flex-col bg-white w-[160px] -right-7 gap-x-0 top-[70px] sm:hidden' : 'hidden'}
                            `}>
                                {
                                    navList.map((item, index) => (
                                        <NavLink key={index} to={item.path}
                                            className={
                                                isActivePath(item.path) ?
                                                    navActive :
                                                    `sm:py-2 font-semibold  flex items-center gap-x-3 xl:px-1 text-[14px] sm:text-[12px] lg:text-[16px] px-3 py-3 w-full sm:w-[100px] border-b-[3px] border-transparent text-[#6B7280]
                                                    shadow-[0px_2px_2.3px_0px_#00000024] sm:shadow-none
                                                    `
                                            }
                                        >
                                            <div className=' text-[18px] sm:text-[24px]'>
                                                {item.icon}
                                            </div>
                                            <p className="sm:text-[16px] sm:font-normal">
                                                {item.title}
                                            </p>
                                        </NavLink>
                                    ))
                                }

                            </animated.ul>
                        ) : (
                            <ul className='flex items-center gap-x-0 xl:gap-x-0'>
                                {
                                    navList.map((item, index) => (
                                        <NavLink key={index} to={item.path}
                                            className={
                                                isActivePath(item.path) ?
                                                    navActive :
                                                    `sm:py-[22px] hover:text-[#01A7B1] hover:bg-white duration-300 font-medium flex items-center gap-x-3 xl:gap-x-5 xl:px-0 text-[14px] sm:text-[12px] lg:text-[16px] px-3  
                                                        sm:flex sm:item-center sm:justify-center sm:px-0 py-[22px] w-full sm:w-[100px] lg:w-[120px] border-b-[3px] border-transparent sm:text-white text-[#6B7280]
                                                    `
                                            }
                                        >
                                            <div className='hidden sm:block text-[18px] sm:text-[24px]'>
                                                {item.icon}
                                            </div>
                                            <p className="sm:text-[16px] sm:font-normal">
                                                {item.title}
                                            </p>
                                        </NavLink>
                                    ))
                                }
                                <NavLink to={'/login'}
                                    className={
                                        isActivePath('/login') ?
                                            navActive :
                                            `xl:py-[22px] xl:px-5 font-semibold sm:hidden flex items-center gap-x-3 hover:text-[#00B8D1] text-[14px] xl:text-[16px] px-3 py-[22px] w-full xl:w-[120px] border-b-[3px] border-transparent text-[#6B7280]`
                                    }
                                >
                                    <MdLogin className='text-[14px] sm:text-[16px] lg:text-[18px]' />
                                    <p>
                                        ເຂົ້າສູ່ລະບົບ
                                    </p>
                                </NavLink>
                            </ul>
                        )}
                        <div onClick={() => setIsOpenMenu(!isOpenMenu)}
                            className='sm:hidden'>
                            <IoMenu className='text-[30px] text-white' />
                        </div>
                    </nav>
                </div>
            </div>
            {children}
            <Footer />
        </div>
    );
}
