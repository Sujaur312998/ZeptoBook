import React from 'react'
import LoveSvg from '../svg/Love_SVG_before';
import LovedSvg from '../svg/Love_SVG_after';
import { useDispatch } from 'react-redux';
import { addFavorite, removeFavorite } from '../Slice/favoritesSlice';
import { getBooks } from '../Slice/bookSlice'
import { Link } from 'react-router-dom';

const Bookitems = ({ books }) => {
    const dispatch = useDispatch(); // Use useDispatch to dispatch actions
    const handleFavorite = (index, bookId) => {
        const updatedBooks = books.map((book, idx) => {
            // When the index matches, create a new object with updated 'favorit'
            if (idx === index) {
                return { ...book, favorite: !book.favorite };  // Spread the book properties and toggle 'favorit'
            }
            // Return the book unchanged if it's not the one we want to modify
            return book;
        });

        dispatch(getBooks(updatedBooks));

        if (updatedBooks[index].favorite) {
            dispatch(addFavorite({ favBook: bookId }));  // Add to favorites
        } else {
            dispatch(removeFavorite(bookId));  // Remove from favorites
        }
    };

    return (
        <div className='container max-w-screen-xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 px-4'>
            {
                books.length > 0 ? (
                    books.map((item, index) => {
                        return (
                            <div
                                key={index}
                                className={`relative bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col animate-slideInRight  hover:ring-1 hover:ring-orange-400`}
                                style={{ animationDelay: `${index * 0.05}s` }}
                            >
                                {/* Love SVG Button in Top Right Corner */}
                                <button
                                    className='absolute right-2 top-2 rounded-full z-10 focus:outline-none'
                                    aria-label="Favorite"
                                    onClick={() => handleFavorite(index, item.id)}
                                >
                                    {item?.favorite ? <LovedSvg className="w-6 h-6" /> : <LoveSvg className="w-6 h-6" />}
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
                                <div className='p-4 flex-grow'>
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

                                {/* Read This Book Button */}
                                <div className="p-4">
                                    <Link to={`/book-details/${item.id}`}>
                                        <button
                                            className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors duration-200"
                                        >
                                            Details
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <p>No books available</p> // Show a fallback message if no books are available
                )
            }
        </div>

    )
}

export default Bookitems
