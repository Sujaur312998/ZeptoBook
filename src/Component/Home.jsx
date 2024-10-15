import React, { useEffect } from 'react';
import Loader from '../Template/Loader';
import { host } from '../host';
import { useSelector } from 'react-redux';
import Bookitems from '../Template/Bookitems'
import { callAPI } from '../action/callAPI';
import { useDispatch } from 'react-redux';
import NavigationBtn from '../Template/NavigationBtn'

const Home = () => {
  const dispatch = useDispatch(); // Use useDispatch to dispatch actions

  // Data from redux
  const { favorites } = useSelector((state) => state.favorites); // Get favorites from Redux state
  const { books, loading} = useSelector((state) => state.books); // Get books from Redux state

  useEffect(() => {
    const url = `${host}/books/`
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
      <NavigationBtn  />
    </div>
  );
};

export default Home;
