import { createSlice } from '@reduxjs/toolkit';

export const booksSlice = createSlice({
    name: 'books',
    initialState: {
        count: null,
        currentPage:1,
        books: [],
        previousPage: null,
        nextPage: null,
        loading: true
    },
    reducers: {
        getCount: (state, action) => {
            state.count = action.payload
        },
        getCurrentPage: (state, action) => {
            state.currentPage = action.payload
        },
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
export const { getCount, getCurrentPage, getBooks, getPreviousPage, getNextPage, getLoading } = booksSlice.actions;
export default booksSlice.reducer;
