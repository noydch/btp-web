import React, { useEffect, useState } from 'react';
import { NewsNavbar } from './components/NewsNavbar';
import { Link, useParams } from 'react-router-dom';
import { getNewsApi } from '../../api/news';
import { formatDate } from '../../utils';
import { Navbar } from '../../components/Navbar';
import { Skeleton, Empty } from 'antd';  // Import Empty from antd
import './style/Style.css';

export const News = () => {
    const [loading, setLoading] = useState(false);
    const [newsData, setNewsData] = useState([]);
    const { pID } = useParams();
    const postID = pID;

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await getNewsApi();
            setNewsData(response);
        } catch (error) {
            console.error("Error cannot fetch News data from API", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Navbar>
            <div className='bg-white w-full'>
                <div className='w-full mx-auto px-4 sm:px-0 pt-[80px] pb-10 sm:max-w-[600px] md:max-w-[720px] lg:max-w-[900px] xl:max-w-[1200px]'>
                    <div className='grid grid-cols-1 sm:grid-cols-2 sm:gap-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-y-3 xl:gap-x-3 xl:gap-y-6 lg:my-10'>
                        {loading ? (
                            Array.from({ length: 8 }).map((_, index) => (
                                <div key={index} className='shadow-[0px_2px_3px_0px_#00000024] md:w-[230px] xl:w-[280px] xl:h-[350px] h-[360px] sm:h-[300px] lg:w-[220px] md:h-[320px]'>
                                    <Skeleton active title={{ width: '80%' }} paragraph={{ rows: 2 }} />
                                </div>
                            ))
                        ) : (
                            newsData.length > 0 ? (
                                newsData.map((item, index) => (
                                    <Link to={`/news/${item?.id}`} key={index}
                                        className='hoverNews relative border border-[#E1E1E1] bg-white duration-300
                                    shadow-[0px_2px_3px_0px_#00000024] md:w-[230px] xl:w-[280px] xl:h-[350px] h-[360px] sm:h-[300px] lg:w-[220px] md:h-[320px]'
                                    >
                                        <img src={item?.image} alt=""
                                            className='w-full h-[240px] sm:h-[200px] object-cover'
                                        />
                                        <div className='p-3 flex flex-col xl:gap-y-1'>
                                            <h2 className='leading-6 sm:text-[16px] md:text-[16px] font-medium break-words text-ellipsis overflow-hidden line-clamp-2'>
                                                {item?.title}
                                            </h2>
                                            <span className='text-[#8E8C8C] text-[12px] break-words text-ellipsis overflow-hidden line-clamp-2'>
                                                {item?.detail}
                                            </span>
                                        </div>
                                        <p className='absolute bottom-1 left-1/2 -translate-x-1/2 font-semibold text-[12px] sm:text-center xl:text-[14px]'>
                                            {formatDate(item?.createdAt)}
                                        </p>
                                    </Link>
                                ))
                            ) : (
                                <div className='col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4 flex justify-center items-center h-[200px]'>
                                    <Empty description="No news available" />
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>
        </Navbar>
    );
};
