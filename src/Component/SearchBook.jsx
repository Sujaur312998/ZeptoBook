import React from 'react';
import Loader from '../Template/Loader';
import { useSelector } from 'react-redux';
import Bookitems from '../Template/Bookitems'
import NavigationBtn from '../Template/NavigationBtn'

const SearchBook = () => {

    const { books, loading } = useSelector((state) => state.books); // Get books from Redux state

    if (loading) return <Loader />;

    return (
        <div className='w-full flex flex-col items-center justify-center absolute top-40 md:top-24'>
            {/* 1st section Books mapping */}

            <Bookitems
                books={books}
            />

            {/* 2nd Section: Previous and Next buttons */}
            <NavigationBtn />
        </div>
    )
}

export default SearchBook
