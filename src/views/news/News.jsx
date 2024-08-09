import React from 'react'
import { NewsNavbar } from './components/NewsNavbar'
import { newsData } from './newsData'
import './style/Style.css'
import { Link } from 'react-router-dom'

export const News = () => {
    return (
        <NewsNavbar>
            <div className=' w-full mx-auto px-4 sm:px-0 pt-[80px] pb-10 sm:max-w-[600px] md:max-w-[720px] lg:max-w-[900px] xl:max-w-[1200px]'>
                <div className=' grid grid-cols-1 sm:grid-cols-2 sm:gap-5 md:grid-cols-3 xl:grid-cols-4 gap-y-3 xl:gap-x-3 xl:gap-y-6 lg:my-10'>
                    {
                        newsData.map((item, index) => (
                            <Link to={`/news/${item.id}`} key={index}
                                className='hoverNews border border-[#E1E1E1] bg-white duration-300
                            shadow-[0px_2px_3px_0px_#00000024] md:w-[230px] xl:w-[280px] xl:h-[330px]
                            '
                            >
                                <img src={item.picture} alt=""
                                    className=' w-full h-[240px] object-cover'
                                />
                                <div className=' p-3 flex flex-col xl:gap-y-1'>
                                    <h2 className=' font-semibold sm:text-[16px] md:text-[18px] md:font-medium'>
                                        {item.title}
                                    </h2>
                                    <span className=' text-[#8E8C8C] text-[12px] '>
                                        {item.policy}
                                    </span>
                                    <p className=' font-semibold text-[12px] sm:text-center xl:text-[14px]'>
                                        {item.date}
                                    </p>
                                </div>
                            </Link>
                        ))
                    }
                </div>
            </div>
        </NewsNavbar>
    )
}
