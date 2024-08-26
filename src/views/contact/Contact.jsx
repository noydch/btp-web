import React, { useEffect, useState } from 'react'
import { ContactNavbar } from './components/ContactNavbar'

// images
import logo from '../../assets/images/logo.webp'
import { ContactBigSize } from './components/ContactBigSize'

export const Contact = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth)
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])
    return (
        <ContactNavbar>
            {
                windowWidth < 640 ? (
                    <div className='  w-full h-full'>
                        <div className=' pt-[70px]'>
                            <div className='relative bg-[#AFE7FF] h-[100px]'>
                                <img src={logo} alt=""
                                    className=' w-[120px] absolute left-[50%] -translate-x-1/2 -bottom-[60px]'
                                />
                            </div>
                        </div>
                        <div className='w-full container max-w-[350px] mx-auto sm:max-w-[600px] md:max-w-[720px] lg:max-w-[900px] mt-7 pb-20'>
                            <div className=' flex flex-col items-center mt-24'>
                                <h4 className=' text-[16px] sm:text-[18px] font-medium'>ເບີໂທຕິດຕໍ່ 020 9211 1722 </h4>
                                <h6 className=' font-medium sm:text-[16px]'>ບີທີພີ ທຶນຮຽນຕໍ່ຕ່າງປະເທດ</h6>
                            </div>
                            <div className=' mt-10'>
                                <h2 className=' text-[18px] font-semibold'>
                                    Contact us
                                </h2>
                                <div className=' mt-3'>
                                    <div className=' flex flex-col gap-y-7'>
                                        <input type="text"
                                            placeholder='Name'
                                            className=' border-b-2 border-[#D8D8D8] w-full py-2 outline-none'
                                        />
                                        <input type="text"
                                            placeholder='Phone'
                                            className=' border-b-2 border-[#D8D8D8] w-full py-2 outline-none'
                                        />
                                        <input type="email"
                                            placeholder='Email'
                                            className=' border-b-2 border-[#D8D8D8] w-full py-2 outline-none'
                                        />
                                        <textarea rows="7"
                                            placeholder='Comment'
                                            className=' resize-none border-b-2 border-[#D8D8D8] w-full py-2 outline-none'
                                        ></textarea>
                                    </div>
                                    <button
                                        className='mt-12 bg-[#01A7B1] w-full py-3 rounded-lg text-[18px] text-white font-medium'
                                    >
                                        ສົ່ງ
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <ContactBigSize />
                )
            }
        </ContactNavbar>
    )
}
