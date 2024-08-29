import React, { useEffect, useState } from 'react'
import { NewsNavbar } from './components/NewsNavbar'
import { newsData } from './newsData'
import './style/Style.css'
import { Link } from 'react-router-dom'
import { getNewsApi } from '../../api/news'
import { formatDate } from '../../utils'

export const News = () => {
    const [loading, setLoading] = useState(false)
    const [newsData, setNewsData] = useState([])

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
    return (
        <NewsNavbar>
            <div className=' w-full mx-auto px-4 sm:px-0 pt-[80px] pb-10 sm:max-w-[600px] md:max-w-[720px] lg:max-w-[900px] xl:max-w-[1200px]'>
                <div className=' grid grid-cols-1 sm:grid-cols-2 sm:gap-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-y-3 xl:gap-x-3 xl:gap-y-6 lg:my-10'>
                    {
                        newsData.map((item, index) => (
                            <Link to={`/news/${item.id}`} key={index}
                                className='hoverNews relative border border-[#E1E1E1] bg-white duration-300
                            shadow-[0px_2px_3px_0px_#00000024] md:w-[230px] xl:w-[280px] xl:h-[350px] sm:h-[300px] lg:w-[220px] md:h-[320px]
                            '
                            >
                                <img src={item.image} alt=""
                                    className=' w-full h-[240px] sm:h-[200px] object-cover'
                                />
                                <div className=' p-3 flex flex-col xl:gap-y-1'>
                                    <h2 className=' leading-6 sm:text-[16px] md:text-[16px] font-medium break-words text-ellipsis overflow-hidden line-clamp-2'>
                                        {item.title}
                                    </h2>
                                    <span className=' text-[#8E8C8C] text-[12px]  break-words text-ellipsis overflow-hidden line-clamp-2'>
                                        {item.detail}
                                    </span>
                                </div>
                                <p className=' absolute bottom-1 left-1/2 -translate-x-1/2 font-semibold text-[12px] sm:text-center xl:text-[14px]'>
                                    {formatDate(item.createdAt)}
                                </p>
                            </Link>
                        ))
                    }
                </div>
            </div>
        </NewsNavbar>
    )
}
