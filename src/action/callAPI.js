import axios from 'axios';
import { getBooks, getPreviousPage, getNextPage, getLoading } from '../Slice/bookSlice'

export const callAPI = async (
  url, favorites, dispatch
) => {
  dispatch(getLoading(true))
  try {
    const res = await axios.get(url);
    console.log(res)
    const { results, previous, next } = res.data

    const updatedBooks = results.map(book => ({
      ...book,
      favorite: favorites.find(fav => fav.favBook === book.id) ? true : false,
    }));

    dispatch(getBooks(updatedBooks));
    dispatch(getLoading(false))
    dispatch(getPreviousPage(previous));
    dispatch(getNextPage(next));
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(getLoading(false))
  }
};
