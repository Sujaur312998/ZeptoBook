import { createSlice } from '@reduxjs/toolkit';

// Get favorites from localStorage

export const booksSlice = createSlice({
    name: 'books',
    initialState: {
        books: [],
        previousPage: null,
        nextPage: null,
        loading: true
    },
    reducers: {
        getBooks: (state, action) => {
            state.books = action.payload
        },
        getPreviousPage: (state, action) => {
            state.previousPage = action.payload
        },
        getNextPage: (state, action) => {
            state.nextPage = action.payload
        },
        getLoading: (state, action) => {
            state.loading = action.payload
        }
    },
});

// Export actions
export const { getBooks, getPreviousPage, getNextPage, getLoading } = booksSlice.actions;
export default booksSlice.reducer;
