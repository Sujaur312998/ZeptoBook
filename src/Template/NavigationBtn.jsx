import React, { useEffect, useRef, useState } from 'react'
import { FaArrowLeft, FaRegArrowAltCircleLeft, FaArrowRight, FaRegArrowAltCircleRight } from "react-icons/fa";
import { callAPI } from '../action/callAPI';
import { useDispatch, useSelector } from 'react-redux';
import { host } from '../host';
import { getCurrentPage } from '../Slice/bookSlice'

const NavigationBtn = () => {
    // const [currentPage, setCurrentPage] = useState(1); // Track the current page
    const [pageCount, setPageCount] = useState(0); // Total pages count
    const pageNumbersContainerRef = useRef(null); // Ref to page numbers container
    const dispatch = useDispatch();
    // Data from redux
    const { favorites } = useSelector((state) => state.favorites);
    const { previousPage, nextPage, count, currentPage } = useSelector((state) => state.books);


    useEffect(() => {
        setPageCount(Math.ceil(count / 32))
    }, [count]);

    // Scroll page numbers container
    const scrollPageNumbers = (direction) => {
        if (direction === 'left') {
            pageNumbersContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
        } else {
            pageNumbersContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
        }
    };

    const handlePageClick = (pageNumber) => {
        dispatch(getCurrentPage(pageNumber));
        callAPI(`${host}/books/?page=${pageNumber}`, favorites, dispatch); // Call API for specific page
    };


    return (
        <div className='mt-8 flex items-center justify-between container max-w-screen-xl'>
            <div className='mt-8 flex flex-col items-center justify-between container max-w-screen-xl'>
                {/* Next/Previous API Navigation */}
                <div className='my-4 flex items-center justify-between w-full'>
                    {/* Previous Button */}
                    <button
                        className={`px-4 py-2 flex items-center font-semibold  ${!previousPage ? 'text-gray-300' : 'text-black hover:text-blue-600'}`}
                        onClick={() => callAPI(previousPage, favorites, dispatch)}
                        disabled={!previousPage}
                    >
                        <FaArrowLeft /> &nbsp; Previous
                    </button>


                    {/* Pageination */}
                    <div className="flex items-center justify-between ">
                        {/* Scroll Button */}

                        <button
                            className='px-2 py-1 text-black hover:text-blue-600'
                            onClick={() => scrollPageNumbers('left')}
                        >
                            <FaRegArrowAltCircleLeft size={24} />
                        </button>

                        {/* Page Numbers with Scroll */}
                        <div
                            ref={pageNumbersContainerRef}
                            className='flex overflow-x-auto space-x-2 scrollbar-custom px-4 py-2 items-center'
                            style={{ maxWidth: '300px' }}
                        >
                            {Array.from({ length: pageCount }, (_, index) => (
                                <button
                                    key={index}
                                    className={`px-4 py-2 border ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-white text-black hover:bg-gray-100'} rounded-md`}
                                    onClick={() => handlePageClick(index + 1)}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </div>

                        {/* Next Scroll Button */}
                        <button
                            className='px-2 py-1 text-black hover:text-blue-600'
                            onClick={() => scrollPageNumbers('right')}
                        >
                            <FaRegArrowAltCircleRight size={24} />
                        </button>
                    </div>

                    {/* Next Button */}
                    <button
                        className={`px-4 py-2 flex items-center font-semibold  ${!nextPage ? 'text-gray-300' : 'text-black hover:text-blue-600'}`}
                        onClick={() => {
                            callAPI(nextPage, favorites, dispatch)
                        }}
                        disabled={!nextPage}
                    >
                        Next &nbsp;<FaArrowRight />
                    </button>
                </div>
            </div>

        </div>
    )
}

export default NavigationBtn
