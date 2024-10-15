import React from 'react';
import { CiSearch } from "react-icons/ci";
import { FaBookOpen } from "react-icons/fa6";
import LovedSvg from '../svg/Love_SVG_after';
import { useSelector } from 'react-redux';

const NavBar = () => {
    const favBookCount = useSelector((state) => state.favorites.favBookCount); // Get favBookCount from Redux state

    return (
        <div>
            <nav className="fixed flex items-center justify-center w-full h-20 bg-gradient-to-r from-sky-100 to-gray-100  z-50">
                <div className='container max-w-screen-xl flex items-center justify-between px-4'>
                    {/* 1st section - Brand Logo */}
                    <div className='text-2xl md:text-3xl font-bold'>
                        <span className='text-blue-500'>Zepto</span>
                        <span className='text-orange-500'>Book</span>
                    </div>

                    {/* 2nd Section - Search Input */}
                    <div className='hidden md:flex items-center w-1/3'>
                        <div className="relative w-full">
                            <input
                                type="text"
                                placeholder="Search books or authors"
                                className="w-full px-4 py-2 pr-10 text-gray-700 bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent transition-shadow duration-200"
                            />
                            <CiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-orange-400 cursor-pointer" />
                        </div>
                    </div>

                    {/* 3rd Section - Icons */}
                    <div className="flex items-center space-x-4">
                        <button className="text-blue-500 relative" title='wish list'>
                            <div className="relative flex items-center">
                                <span className={`absolute top-0 right-1 flex transform translate-x-1/2 -translate-y-1/2 bg-black text-white text-xs rounded-full mr-1 px-1.5 py-0.5 ${favBookCount===0 ? 'hidden':''}`}>
                                    {favBookCount}  <LovedSvg className="w-4 h-4 ml-1" />
                                </span>
                            </div>
                            <FaBookOpen className="text-3xl" />

                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Search Input */}
            <div className='flex relative top-20 items-center justify-center p-4 md:hidden'>
                <div className="relative w-full">
                    <input
                        type="text"
                        placeholder="Search books or authors"
                        className="w-full px-4 py-2 pr-10 text-gray-700 bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent transition-shadow duration-200"
                    />
                    <CiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 " />
                </div>
            </div>
        </div>

    )
}

export default NavBar
