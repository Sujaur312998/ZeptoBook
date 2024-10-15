import React, { useEffect, useState } from 'react';
import Loader from '../Template/Loader';
import axios from 'axios';
import { host } from '../host';
import LoveSvg from '../svg/Love_SVG_before';
import LovedSvg from '../svg/Love_SVG_after';
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../favoritesSlice';

const Home = () => {
  const [next, setNext] = useState(null);
  const [previous, setPrevious] = useState(null);
  const [books, setBooks] = useState(null);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch(); // Use useDispatch to dispatch actions
  const favorites = useSelector((state) => state.favorites.favorites); // Get favorites from Redux state

  const callAPI = (url) => {
    setLoading(true);
    axios.get(url)
      .then(res => {
        setLoading(false);
        const updatedBooks = res.data.results.map(book => ({
          ...book,
          favorit: favorites.find(fav => fav.favBook === book.id) ? true : false,
        }));

        setBooks(updatedBooks);
        setNext(res.data.next);
        setPrevious(res.data.previous);
      })
      .catch(err => {
        setLoading(false);
        console.error(err);
      });
  };

  useEffect(() => {
    callAPI(`${host}/books/`);
  },[]);

  const handleFavorit = (index, bookId) => {
    const updatedBooks = [...books];
    updatedBooks[index].favorit = !updatedBooks[index].favorit;
    setBooks(updatedBooks);

    if (updatedBooks[index].favorit) {
      dispatch(addFavorite({ favBook: bookId })); // Add to favorites
    } else {
      dispatch(removeFavorite(bookId)); // Remove from favorites
    }
  };

  const handlePreviousPage = () => {
    callAPI(previous);
  }
  const handleNextPage = () => {
    callAPI(next);
  }

  if (loading) return <Loader />;

  return (
    <div className='w-full flex flex-col items-center justify-center absolute top-40 md:top-24'>
      {/* 1st section Books mapping */}
      <div className='container max-w-screen-xl grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 px-4'>
        {books.map((item, index) => {
          return (
            <div key={index} className='relative bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300'>
              {/* Love SVG Button in Top Right Corner */}
              <button
                className='absolute right-2 top-2  rounded-full  z-10 focus:outline-none'
                aria-label="Favorite"
                onClick={() => handleFavorit(index, item.id)}
              >
                {item?.favorit ? <LovedSvg className="w-6 h-6" /> : <LoveSvg className="w-6 h-6" />}
              </button>

              {/* Book Cover Image */}
              <div className="w-full h-64">
                <img
                  src={item.formats["image/jpeg"]}
                  alt={`${item.title} cover`}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Book Details */}
              <div className='p-4'>
                {/* Book Title */}
                <h3 className='text-lg font-bold text-gray-900 truncate'>{item.title}</h3>

                {/* Author Name */}
                <p className='text-sm text-gray-600'>
                  By {item.authors?.map((author, index) => (
                    <span key={index}>{author.name}{index < item.authors.length - 1 ? ', ' : ''}</span>
                  ))}
                </p>

                {/* Book ID */}
                <p className='text-xs text-gray-500 mt-2'>
                  ID: {item.id}
                </p>

                {/* Book Genre */}
                <p className='text-sm text-gray-500 mt-2'>
                  Genre: {item.subjects?.map((subject, index) => (
                    <span key={index}>
                      {subject}
                      {index < item.subjects.length - 1 ? ', ' : ''}
                    </span>
                  ))}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* 2nd Section: Previous and Next buttons */}
      <div className='mt-8 flex items-center justify-between container max-w-screen-xl'>
        <button
          className={`px-4 py-2 flex items-center font-semibold  ${!previous ? 'text-gray-300' : 'text-black hover:text-blue-600'}`}
          onClick={handlePreviousPage}
          disabled={!previous}
        >
          <FaArrowLeft /> &nbsp; Previous
        </button>
        <button
          className={`px-4 py-2 flex items-center font-semibold  ${!next ? 'text-gray-300' : 'text-black hover:text-blue-600'}`}
          onClick={handleNextPage}
          disabled={!next}
        >
          Next &nbsp;<FaArrowRight />
        </button>
      </div>
    </div>

  );
};

export default Home;
