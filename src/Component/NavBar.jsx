import React from 'react'
import { LuShoppingCart } from "react-icons/lu";


const NavBar = () => {
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
                        <input
                            type="text"
                            placeholder="Search books or authors"
                            className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-orange-300"
                        />
                    </div>

                    {/* 3rd Section - Icons */}
                    <div className='flex items-center space-x-4'>
                        <button className='text-blue-500 hover:text-orange-400'>
                            <LuShoppingCart className="text-2xl" />
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Search Input */}
            <div className='flex relative top-20 items-center justify-center py-4 md:hidden'>
                <div className='flex items-center w-full container max-w-screen-xl px-4'>
                    <input
                        type="text"
                        placeholder="Search books or authors"
                        className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-orange-300"
                    />
                </div>
            </div>
        </div>

    )
}

export default NavBar
