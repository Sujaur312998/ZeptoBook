import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from './favoritesSlice'; // Import the favorites slice

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer, // Add the favorites slice to the store
  },
});