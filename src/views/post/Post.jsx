import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import { Navbar } from '../../components/Navbar';
import { IoSearch } from 'react-icons/io5';
import { cardPostData } from './cardPostData';
import { Link } from 'react-router-dom';
import ModalAds from '../../components/ModalAds';

export const Post = () => {
    const [selectedFilter, setSelectedFilter] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredCards, setFilteredCards] = useState(cardPostData);

    useEffect(() => {
        const hasModalBeenShown = sessionStorage.getItem('modalShown');
        if (!hasModalBeenShown) {
            setShowModal(true);
            sessionStorage.setItem('modalShown', 'true');
        }
    }, []);

    useEffect(() => {
        const filtered = cardPostData.filter(item => {
            const matchesFilter =
                selectedFilter === 0 ||
                (selectedFilter === 1 && item.typeCapitail === 'ທຶນປະລິນຍາຕີ') ||
                (selectedFilter === 2 && item.typeCapitail === 'ທຶນກຽມພາສາ') ||
                (selectedFilter === 3 && item.typeCapitail === 'ທຶນຊັ້ນສູງ');

            const matchesSearch =
                item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.typeCapitail.toLowerCase().includes(searchTerm.toLowerCase());

            return matchesFilter && matchesSearch;
        });

        setFilteredCards(filtered);
    }, [selectedFilter, searchTerm]);

    const handleSearch = () => {
        // The search is already handled in the useEffect above
        // This function is called when the search button is clicked
        // You can add additional functionality here if needed
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <Navbar>
            <ModalAds show={showModal} onClose={handleCloseModal} />
            <div className='pt-[70px] w-full h-full container max-w-[340px] mx-auto sm:max-w-[620px] md:max-w-[720px] lg:max-w-[900px] xl:max-w-[1200px]'>
                <div className='pt-5 pb-10'>
                    <div className='md:flex md:flex-row-reverse md:items-center md:gap-x-4 xl:px-20 xl:pb-5 xl:border-b'>
                        <Select
                            labelInValue
                            defaultValue={{ value: 0, label: 'ເລືອກທຶນການສຶກສາ' }}
                            className='w-full lg:h-[40px] h-[45px] md:h-[35px]'
                            onChange={(selected) => setSelectedFilter(selected.value)}
                            options={[
                                { value: 0, label: 'ທັງໝົດ' },
                                { value: 1, label: 'ທຶນປະລິນຍາຕີ' },
                                { value: 2, label: 'ທຶນກຽມພາສາ' },
                                { value: 3, label: 'ທຶນຊັ້ນສູງ' },
                            ]}
                        />
                        <div className='flex gap-x-2 my-3 items-center md:w-full'>
                            <div className='flex items-center relative w-[240px] sm:w-full lg:h-[40px] h-[45px] md:h-[35px]'>
                                <input
                                    type='text'
                                    placeholder='ຄົ້ນຫາ...'
                                    className='border pl-12 md:pl-10 outline-[#01B0B0] rounded-md border-[#BBBBBB] h-full w-full'
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <IoSearch className='left-3 absolute text-[22px] md:text-[20px] text-[#01B0B0]' />
                            </div>
                            <button
                                className='w-[100px] lg:h-[40px] h-[45px] md:h-[35px] text-[16px] text-white rounded-md bg-[#01ADB0]'
                                onClick={handleSearch}
                            >
                                ຄົ້ນຫາ
                            </button>
                        </div>
                    </div>
                    <div className='grid grid-cols-3 sm:grid-cols-4 xl:grid-cols-12 xl:gap-7 gap-3 sm:gap-5 lg:mt-7'>
                        {filteredCards.map((item, index) => (
                            <Link
                                to={`/post/postDetail/${item.id}`}
                                key={index}
                                className='rounded-md h-[150px] sm:h-[180px] md:h-[180px] lg:h-[190px] xl:col-span-3 relative xl:h-[300px] shadow-[0px_2px_3px_0px_#00000024]'
                            >
                                <div className='w-full h-[100px] xl:h-[200px]'>
                                    <img
                                        src={item.picture}
                                        alt={item.title}
                                        className='w-full h-full object-cover rounded-t-md'
                                    />
                                </div>
                                <div className='mt-1.5 px-1.5 sm:px-3 flex flex-col '>
                                    <h2 className='text-[11px] sm:text-[16px] lg:text-[18px] sm:font-medium font-semibold'>{item.title}</h2>
                                    <p className='sm:leading-4 text-[12px] text-gray-500 hidden sm:block'>
                                        Lorem ipsum dolor sit amet consectetur
                                    </p>
                                    <div className='sm:absolute sm:bottom-1 xl:bottom-2 md:left-3 flex items-center text-[#13BBB6] gap-x-1'>
                                        <img src={item.icon} alt='' className='w-[12px] ,d:w-[15px]' />
                                        <span className='text-[10px] md:text-[12px] xl:text-[12px] font-medium'>ສົນໃຈ</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </Navbar>
    );
};
