/* eslint-disable react/jsx-pascal-case */
import React, { useEffect, useState } from 'react';
import Loader from '../Template/Loader';
import axios from 'axios';
import { host } from '../host';
import Love_SVG_before from '../svg/Love_SVG_before';
import Love_SVG_after from '../svg/Love_SVG_after';

const Home = () => {

  const [count, setCount] = useState(null);
  const [next, setNext] = useState(null);
  const [previous, setPrevious] = useState(null);
  const [books, setBooks] = useState(null);

  useEffect(() => {
    axios.get(`${host}/books/`)
      .then(res => {
        console.log(res.data);
        setBooks(res.data.results);
        setPrevious(res.data.previous);
        setNext(res.data.next);
        setCount(res.data.count);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  if (!books) return <Loader />;

  return (
    <div className='w-full flex items-center justify-center absolute top-40 md:top-24'>
      <div className='container max-w-screen-xl grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 px-4'>
        {
          books.map((item) => {
            return (
              <div key={item.id} className='relative bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300'>

                {/* Love SVG Button in Top Right Corner */}
                <button
                  className='absolute right-2 top-2  rounded-full  z-10 focus:outline-none'
                  aria-label="Favorite"
                >
                  {
                    item?.favorit ? <Love_SVG_after className="w-6 h-6 " /> : <Love_SVG_before className="w-6 h-6 " />
                  }
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
                    Genre: {item.bookshelves.join(', ')}
                  </p>
                </div>
              </div>
            );
          })
        }
      </div>
    </div>
  );
};

export default Home;
