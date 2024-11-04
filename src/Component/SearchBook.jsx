import React, { useEffect } from 'react';
import Loader from '../Template/Loader';
import { useSelector, useDispatch } from 'react-redux';
import Bookitems from '../Template/Bookitems'
import NavigationBtn from '../Template/NavigationBtn'
import { useParams } from 'react-router-dom';
import { host } from '../host'
import { callAPI } from '../action/callAPI'

const SearchBook = () => {
    let { name } = useParams();
    const dispatch = useDispatch();
    const { books, loading } = useSelector((state) => state.books); // Get books from Redux state
    const { favorites } = useSelector((state) => state.favorites);
    
    useEffect(() => {
        const encodedSearch = encodeURIComponent(name)
        const url = `${host}/books?search=${encodedSearch}`
        callAPI(url, favorites, dispatch)
    }, []);

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
