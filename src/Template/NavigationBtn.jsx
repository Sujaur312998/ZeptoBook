import React from 'react'
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { callAPI } from '../action/callAPI';
import { useDispatch, useSelector } from 'react-redux';

const NavigationBtn = () => {
    const dispatch = useDispatch();
    // Data from redux
    const { favorites } = useSelector((state) => state.favorites);
    const { previousPage, nextPage } = useSelector((state) => state.books);

    return (
        <div className='mt-8 flex items-center justify-between container max-w-screen-xl'>
            <button
                className={`px-4 py-2 flex items-center font-semibold  ${!previousPage ? 'text-gray-300' : 'text-black hover:text-blue-600'}`}
                onClick={() => callAPI(previousPage, favorites, dispatch)}
                disabled={!previousPage}
            >
                <FaArrowLeft /> &nbsp; Previous
            </button>
            <button
                className={`px-4 py-2 flex items-center font-semibold  ${!nextPage ? 'text-gray-300' : 'text-black hover:text-blue-600'}`}
                onClick={() => callAPI(nextPage, favorites, dispatch)}
                disabled={!nextPage}
            >
                Next &nbsp;<FaArrowRight />
            </button>
        </div>
    )
}

export default NavigationBtn
