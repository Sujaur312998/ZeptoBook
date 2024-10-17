import React, { useEffect } from 'react'
import Bookitems from '../Template/Bookitems'
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Template/Loader';
import { host } from '../host';
import { callAPI } from '../action/callAPI';
import NavigationBtn from '../Template/NavigationBtn'
import { useNavigate } from 'react-router-dom';

const WishList = () => {
  const dispatch = useDispatch();
  // Data from redux
  const { books, loading } = useSelector((state) => state.books); // Get books from Redux state
  const { favID, favorites } = useSelector((state) => state.favorites);

  const navigate = useNavigate();

  useEffect(() => {
    if (!favID) navigate('/');
    const url = `${host}/books/?ids=${favID}`
    callAPI(url, favorites, dispatch)
  }, [favID]);


  if (loading) return <Loader />;

  return (
    <div className='w-full flex flex-col items-center justify-center absolute top-40 md:top-24'>
      {/* 1st section: Books  */}

      <Bookitems
        books={books}
      />

      {/* 2nd Section: Previous and Next buttons */}
      <NavigationBtn />
    </div>
  )
}

export default WishList
