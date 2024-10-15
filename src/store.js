import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from './Slice/favoritesSlice'; // Import the favorites slice
import booksReducer from './Slice/bookSlice'

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer, // Add the favorites slice to the store
    books: booksReducer, // Add the favorites slice to the store
  },
});