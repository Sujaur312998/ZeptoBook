import React, { useEffect, useState } from 'react';
import { CiSearch } from "react-icons/ci";
import { FaBookOpen } from "react-icons/fa6";
import LovedSvg from '../svg/Love_SVG_after';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { host } from '../host'
import { callAPI } from '../action/callAPI'
import { bookShelvesData } from '../lib/bookShelves'
import { useNavigate } from 'react-router-dom';
import { useDebounce } from '../action/useDebounce';

const NavBar = () => {
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [bookShelves, setBookShelves] = useState('');
    const dispatch = useDispatch();
    const { favBookCount, favorites } = useSelector((state) => state.favorites); // Get favBookCount from Redux state

    const debouncedSearch = useDebounce(search, 500);

    useEffect(() => {
        if (debouncedSearch) {
            setBookShelves('')
            const encodedSearch = encodeURIComponent(search);
            navigate(`/searchbook/${encodedSearch}`);
            const url = `${host}/books?search=${encodedSearch}`
            callAPI(url, favorites, dispatch)
        }
        return
    }, [debouncedSearch]);

    const handleSelect = (e) => {
        e.preventDefault();
        setBookShelves(e.target.value)
        setSearch('')
        const encodedSearch = encodeURIComponent(e.target.value.toLowerCase());        
        navigate(`/searchbook/${encodedSearch}`);
        const url = `${host}/books?topic=${encodedSearch}`
        callAPI(url, favorites, dispatch)
    };

    return (
        <div>
            <nav className="fixed flex items-center justify-center w-full h-20 bg-gradient-to-r from-sky-100 to-gray-100  z-50">
                <div className='container max-w-screen-xl flex items-center justify-between px-4'>
                    {/* 1st section - Brand Logo */}
                    <Link to='/'>
                        <div className='text-2xl md:text-3xl font-bold'>
                            <span className='text-blue-500'>Zepto</span>
                            <span className='text-orange-500'>Book</span>
                        </div>
                    </Link>

                    {/* 2nd Section - Search Input */}
                    <div className='hidden md:flex items-center w-3/5'>
                        <form className="flex  items-center justify-between bg-white rounded-full shadow-md overflow-hidden w-full">
                            <div className='w-full flex'>
                                <input
                                    type="text"
                                    placeholder="Search books or authors"
                                    value={search}
                                    onChange={(e) => {
                                        setSearch(e.target.value)
                                        setBookShelves('')
                                    }}
                                    className="flex-grow px-4 py-2 outline-none text-sm text-gray-700 w-1/2"
                                />
                                <select
                                    className="p-2 mr-4 text-sm bg-white outline-none border-l border-gray-300 w-1/2"
                                    value={bookShelves}
                                    onChange={(e) => handleSelect(e)}
                                    aria-label="Bookshelves or subjects"
                                >
                                    <option hidden>Bookshelves or subjects</option>
                                    {
                                        bookShelvesData.map((item, index) => (
                                            <option key={index} value={item.name}>{item.name}</option>
                                        ))
                                    }
                                </select>

                            </div>

                            {/* <button type="submit" className="w-12  py-2 text-black bg-orange-400 hover:text-white flex items-center justify-center rounded-r-full">
                                <CiSearch className="text-xl" />
                            </button> */}
                        </form>
                    </div>


                    {/* 3rd Section - Icons */}
                    <div className="flex items-center space-x-4">
                        <button className="text-blue-500 relative" title='wish list' disabled={favBookCount === 0}>
                            {favBookCount > 0 ? (
                                <Link to='/wishlist'>
                                    <div className="relative flex items-center">
                                        <span className={`absolute top-0 right-1 flex transform translate-x-1/2 -translate-y-1/2 bg-black text-white text-xs rounded-full mr-1 px-1.5 py-0.5`}>
                                            {favBookCount}  <LovedSvg className="w-4 h-4 ml-1" />
                                        </span>
                                    </div>
                                    <FaBookOpen className="text-3xl" />
                                </Link>
                            ) : (
                                <div className="relative flex items-center">
                                    <span className="absolute top-0 right-1 transform translate-x-1/2 -translate-y-1/2 bg-black text-white text-xs rounded-full mr-1 px-1.5 py-0.5 hidden"></span>
                                    <FaBookOpen className="text-3xl text-gray-400" />
                                </div>
                            )}
                        </button>

                    </div>
                </div>
            </nav>

            {/* Mobile Search Input */}
            <div className='md:hidden flex fixed top-20 items-center justify-center p-4 w-full bg-white z-50'>
                <form className="flex items-center justify-between bg-white rounded-full shadow-md shadow-orange-400 overflow-hidden w-full">
                    <div className='w-full flex'>
                        <input
                            type="text"
                            placeholder="Search books or authors"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="flex-grow px-4 py-2 outline-none text-sm text-gray-700 w-1/2"
                        />
                        <select
                            className="p-2 mr-4 text-sm bg-white outline-none border-l border-gray-300 w-1/2"
                            value={bookShelves}
                            onChange={(e) => handleSelect(e)}
                            aria-label="Bookshelves or subjects"
                        >
                            <option hidden>Bookshelves or subjects</option>
                            {
                                bookShelvesData.map((item, index) => (
                                    <option key={index} value={item.name}>{item.name}</option>
                                ))
                            }
                        </select>
                    </div>

                    {/* <button type="submit" className="w-12 py-2 text-black bg-orange-400 hover:text-white flex items-center justify-center rounded-r-full">
                        <CiSearch className="text-xl" />
                    </button> */}
                </form>
            </div>

        </div>

    )
}

export default NavBar
