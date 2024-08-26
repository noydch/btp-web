import React from 'react'
import { FaTwitter, FaFacebook, FaLinkedin, FaInstagram } from "react-icons/fa";
import { Link } from 'react-router-dom';

export const Footer = () => {
    return (
        <footer className=' relative z-[10] sm:w-full py-10 px-10 xl:px-0 xl:h-[300px] gap-y-7 w-full bg-[#01A7B1] flex flex-col items-center justify-center'>
            <div className='container  mx-auto max-w-[350px] sm:max-w-[620px] md:max-w-[720px] lg:max-w-[900px] xl:max-w-[1200px]'>
                <div className=' sm:flex sm:gap-x-16 xl:justify-between'>
                    <div className='text-white sm:flex-[2] flex flex-col gap-y-3'>
                        <h2 className='font-semibold text-[16px] sm:text-[18px] py-3'>
                            Lessond
                        </h2>
                        <p className=' text-[12px] md:text-[14px]'>
                            Need to help for your dream Career? trust us. With Lesson, study becomes a lot easier with us.
                        </p>
                        <div className='flex items-center gap-x-3 mt-2'>
                            <Link>
                                <FaTwitter className=' sm:text-[16px]' />
                            </Link>
                            <Link>
                                <FaFacebook className=' sm:text-[16px]' />
                            </Link>
                            <Link>
                                <FaLinkedin className=' sm:text-[16px]' />
                            </Link>
                            <Link>
                                <FaInstagram className=' sm:text-[16px]' />
                            </Link>
                        </div>
                    </div>
                    <div className='text-white sm:flex-[2] flex flex-col gap-y-3'>
                        <h2 className='font-semibold sm:text-[16px] border-b pr-10 py-3 sm:w-[100px]'>Address</h2>
                        <p className=' text-[12px] sm:text-[14px] font-light'>
                            <span className=' font-semibold mr-1.5'>
                                location:
                            </span>
                            27 Division St, New York, NY 10002, USA
                        </p>
                        <p className=' text-[12px] sm:text-[14px] font-light'>
                            <span className=' font-semibold mr-1.5'>
                                Email:
                            </span>
                            email@gmail.com
                        </p>
                        <p className=' text-[12px] sm:text-[14px] font-light'>
                            <span className=' font-semibold mr-1.5'>
                                Phone:
                            </span>
                            +856 20 5468 2021
                        </p>
                    </div>
                </div>
            </div>
        </footer>

    )
}