import React, { useEffect, useState } from 'react';
import { Empty, Select, Skeleton } from 'antd';
import { Navbar } from '../../components/Navbar';
import { IoSearch } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import ModalAds from '../../components/ModalAds';
import Swal from 'sweetalert2';
import { getService } from '../../api/serivce';
import starIcon from '../../assets/icons/starPlus.png';
import { getCategoryApi } from '../../api/category';

export const Post = () => {
    const [selectedFilter, setSelectedFilter] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [loading, setLoading] = useState(true); // Set initial loading to true
    const [postData, setPostData] = useState([]);
    const [categoryData, setCategoryData] = useState([]);

    const fetchData = async () => {
        try {
            const response = await getService();
            if (!response) {
                throw new Error('No response from API');
            }
            setPostData(response);
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: "ເກີດຂໍ້ຜິດພາດ",
                text: "ບໍ່ສາມາດດຶງຂໍ້ມູນໄດ້",
            });
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchDataCategory = async () => {
        try {
            const response = await getCategoryApi();
            if (!response) {
                throw new Error('No response from API');
            }
            setCategoryData(response);
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: "ເກີດຂໍ້ຜິດພາດ",
                text: "ບໍ່ສາມາດດຶງຂໍ້ມູນໄດ້",
            });
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
        fetchDataCategory();
    }, []);

    useEffect(() => {
        const hasModalBeenShown = sessionStorage.getItem('modalShown');
        if (!hasModalBeenShown) {
            setShowModal(true);
            sessionStorage.setItem('modalShown', 'true');
        }
    }, []);

    useEffect(() => {
        const filterPosts = () => {
            let updatedPosts = [...postData];

            // Filter by selected category
            if (selectedFilter !== 0) {
                updatedPosts = updatedPosts.filter(post => post.category_id === selectedFilter);
            }

            // Filter by search term
            if (searchTerm) {
                updatedPosts = updatedPosts.filter(post => post.title.toLowerCase().includes(searchTerm.toLowerCase()));
            }

            setFilteredPosts(updatedPosts);
        };

        filterPosts();
    }, [postData, selectedFilter, searchTerm]);

    const handleCategoryChange = (value) => {
        setSelectedFilter(value);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <Navbar>
            <div className=' w-full'>
                <ModalAds show={showModal} onClose={handleCloseModal} />
            </div>
            <div className=' bg-white'>
                <div className='pt-[70px] w-full h-full container max-w-[350px] mx-auto sm:max-w-[620px] md:max-w-[720px] lg:max-w-[900px] xl:max-w-[1200px]'>
                    <div className='pt-5 pb-10'>
                        <div className='md:flex md:flex-row-reverse md:items-center md:gap-x-4 xl:px-20 xl:pb-5 xl:border-b'>
                            <Select
                                labelInValue
                                defaultValue={{ value: 0, label: 'ເລືອກປະເພດທຶນຕ່າງໆທີ່ຕ້ອງການສະໝັກ' }}
                                className='w-full lg:h-[40px] h-[45px] md:h-[35px]'
                                onChange={(value) => handleCategoryChange(value.value)}
                                options={[
                                    { value: 0, label: 'ເລືອກທັງໝົດ' }, // Add this option for "ທັງໝົດ"
                                    ...categoryData?.map((item) => ({
                                        value: item?.id,
                                        label: item?.name,
                                    }))
                                ]}
                            />

                            <div className='flex gap-x-2 my-3 items-center w-full md:w-full'>
                                <div className='flex items-center relative w-full sm:w-full lg:h-[40px] h-[45px] md:h-[35px]'>
                                    <input
                                        type='text'
                                        placeholder='ຄົ້ນຫາ...'
                                        className='border pl-12 md:pl-10 outline-[#01B0B0] rounded-md border-[#BBBBBB] h-full w-full'
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                    <IoSearch className='left-3 absolute text-[22px] md:text-[20px] text-[#01B0B0]' />
                                </div>
                            </div>
                        </div>
                        <div className='grid grid-cols-3 sm:grid-cols-4 xl:grid-cols-12 xl:gap-7 gap-3 sm:gap-5 lg:mt-7'>
                            {loading ? (
                                // Display skeletons when loading
                                Array.from({ length: 9 }).map((_, index) => (
                                    <Skeleton
                                        key={index}
                                        className='h-[165px] sm:h-[210px] md:h-[180px] lg:h-[200px] xl:col-span-3 relative xl:h-screen'
                                        active
                                    />
                                ))
                            ) : (
                                filteredPosts.length > 0 ? (
                                    filteredPosts.map((item, index) => (
                                        <Link
                                            to={`/post/postDetail/${item?.id}`}
                                            key={index}
                                            className='rounded-md h-[165px] sm:h-[210px] md:h-[180px] lg:h-[200px] xl:col-span-3 relative xl:h-[300px] shadow-[0px_2px_3px_0px_#00000024]'
                                        >
                                            <div className='w-full h-[80px] xl:h-[200px]'>
                                                <img
                                                    src={`https://saiyfonbroker.s3.ap-southeast-1.amazonaws.com/images/${item?.image}`}
                                                    alt={item?.title}
                                                    className='w-full h-full object-cover rounded-t-md'
                                                />
                                            </div>
                                            <div className='mt-1 px-1.5 sm:px-3 flex flex-col'>
                                                <h2 className='text-[11px] sm:text-[16px] lg:text-[16px] sm:font-medium font-medium break-words text-ellipsis text-wrap overflow-hidden line-clamp-2'>
                                                    {item?.title}
                                                </h2>
                                                <p className='sm:leading-4 leading-3 text-[10px] sm:text-[12px] text-gray-500 text-ellipsis line-clamp-2 overflow-hidden'>
                                                    {item?.description}
                                                </p>
                                                <div className='absolute bottom-2 sm:bottom-1 xl:bottom-2 md:left-3 flex items-center text-[#13BBB6] gap-x-1'>
                                                    <img src={starIcon} alt='' className='w-[12px] md:w-[15px]' />
                                                    <span className='text-[10px] md:text-[12px] xl:text-[12px] font-medium'>ສົນໃຈ</span>
                                                </div>
                                            </div>
                                        </Link>
                                    ))
                                ) : (
                                    <div className=' h-[400px] col-span-3 sm:col-span-4 xl:col-span-12 w-full flex items-center justify-center'>
                                        <Empty description="ບໍ່ມີຂໍ້ມູນ" />
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Navbar>
    );
};
