import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../Template/Loader';
import { getLoading } from '../Slice/bookSlice';
import { bookDetailsAPI } from '../action/bookDetailsAPI'

const BookDetails = () => {
    let { id } = useParams();
    const dispatch = useDispatch()
    const [bookDetails, setBookDetails] = useState(null);
    const { loading } = useSelector(state => state.books)

    useEffect(() => {
        dispatch(getLoading(true))
        bookDetailsAPI(id, dispatch, setBookDetails)
    }, [id]);

    if (loading) return <Loader />

    return (
        <div className='w-full flex flex-col items-center justify-center absolute top-28 md:top-12'>
            <div className="container max-w-4xl p-6 flex items-center justify-center">
                {
                    bookDetails && (
                        <div className="rounded-lg p-6 animate-fadeInUp">
                            <div className="flex flex-col items-center">
                                <img
                                    src={bookDetails.formats["image/jpeg"]}
                                    alt="Book cover"
                                    className="w-48 h-auto rounded-md mb-4"
                                />
                                <h1 className="text-3xl font-bold text-blue-600 mb-2">{bookDetails.title}</h1>
                                <p className="text-gray-700 italic">
                                    by {bookDetails.authors[0]?.name} ({bookDetails.authors[0]?.birth_year} - {bookDetails.authors[0]?.death_year})
                                </p>
                                <p className="text-gray-500 text-sm">Languages: {bookDetails?.languages.join(", ")}, Download: {bookDetails?.download_count}</p>
                                <div className="flex gap-2 p-4">
                                    <Link to={bookDetails?.formats["text/html"]}>
                                        <button
                                            className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium hover:bg-orange-400 transition-colors duration-200"
                                        >
                                            Read Online
                                        </button>
                                    </Link>
                                    <Link to={bookDetails?.formats["application/octet-stream"]}>
                                        <button
                                            className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium hover:bg-orange-400 transition-colors duration-200"
                                        >
                                            Download
                                        </button>
                                    </Link>
                                </div>
                            </div>

                            <div className='grid grid-cols-1  md:grid-cols-2 gap-4 px-4'>
                                <div className="mt-6">
                                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">Subjects</h2>
                                    <ul className="list-disc list-inside text-gray-700">
                                        {bookDetails.subjects.map((subject, index) => (
                                            <li key={index}>{subject}</li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="mt-6">
                                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">Bookshelves</h2>
                                    <ul className="list-disc list-inside text-gray-700">
                                        {bookDetails.bookshelves.map((shelf, index) => (
                                            <li key={index}>{shelf}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>


    );
};

export default BookDetails;

