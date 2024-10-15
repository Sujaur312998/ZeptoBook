import { createSlice } from '@reduxjs/toolkit';

// Get favorites from localStorage
const initialFavorites = JSON.parse(localStorage.getItem('favorites')) || [];

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    favorites: initialFavorites,
    favBookCount: initialFavorites.length,
    favID: initialFavorites.map(item => item.favBook).join(','),
  },
  reducers: {
    addFavorite: (state, action) => {
      state.favorites.push(action.payload);
      state.favID = state.favID ? `${state.favID},${action.payload.favBook}` : `${action.payload.favBook}`;
      state.favBookCount = state.favorites.length;
      localStorage.setItem('favorites', JSON.stringify(state.favorites));
    },
    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter(fav => fav.favBook !== action.payload);
      state.favID = state.favorites.map(item => item.favBook).join(',');
      state.favBookCount = state.favorites.length;
      localStorage.setItem('favorites', JSON.stringify(state.favorites));
    },
  },
});

// Export actions
export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
