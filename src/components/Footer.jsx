import React from 'react'
import { FaTwitter, FaFacebook, FaLinkedin, FaInstagram } from "react-icons/fa";
import { Link } from 'react-router-dom';

export const Footer = () => {
    return (
        <footer className=' relative z-[10] sm:w-full py-5 sm:py-10 px-5 sm:px-10 xl:px-0 xl:h-[300px] gap-y-7 w-full bg-[#01A7B1] flex flex-col items-center justify-center'>
            <div className='container  mx-auto max-w-[350px] sm:max-w-[620px] md:max-w-[720px] lg:max-w-[900px] xl:max-w-[1200px]'>
                <div className=' sm:flex sm:gap-x-16 xl:justify-between'>
                    <div className='text-white sm:flex-[2] flex flex-col gap-y-3'>
                        <h2 className='font-semibold text-[16px] sm:text-[18px] py-3'>
                            ບີທີພີ ທຶນຮຽນຕໍ່ຕ່າງປະເທດ
                        </h2>
                        <p className=' text-[12px] md:text-[14px]'>
                            ບໍລິການແລ່ນເອກະສານ, ໃຫ້ຄຳປຶກສາ, ແລ່ນທຶນຮຽນຕໍ່ຕ່າງປະເທດ ແລະ ບໍລິການຮັບແປເອກະສານທົ່ວໄປຖືກຕ້ອງຕາມກົດໝາຍ
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
                    <div className='text-white sm:flex-[2] flex flex-col gap-y-3 mt-5 md:mt-0'>
                        <h2 className='font-semibold sm:text-[16px] border-b pr-10 py-3 sm:w-[100px]'>ທີ່ຢູ່</h2>
                        <p className=' text-[12px] sm:text-[14px] font-light'>
                            <span className=' font-semibold mr-1.5'>
                                ສະຖານທີ່ຕັ້ງ:
                            </span>
                            ຖະໜົນທ່າເດື່ອຕິດກັບບຶງທາດຫຼວງ ບ້ານໂນນຫວາຍ ເມືອງໄຊເສດຖາ ນະຄອນຫຼວງວຽງຈັນ
                        </p>
                        <p className=' text-[12px] sm:text-[14px] font-light'>
                            <span className=' font-semibold mr-1.5'>
                                Email:
                            </span>
                            btntawa@gmail.com
                        </p>
                        <p className=' text-[12px] sm:text-[14px] font-light'>
                            <span className=' font-semibold mr-1.5'>
                                Phone:
                            </span>
                            +856 20 9211 1722
                        </p>
                    </div>
                </div>
            </div>
        </footer>

    )
}