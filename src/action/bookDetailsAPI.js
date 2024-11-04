import axios from "axios";
import { host } from "../host";
import { getLoading } from '../Slice/bookSlice';

export const bookDetailsAPI = (id, dispatch, setBookDetails) => {
    const url = `${host}/books/${id}`
    axios.get(url)
        .then(res => {
            setBookDetails(res.data);
            dispatch(getLoading(false))
        })
        .catch(err => {
            dispatch(getLoading(false))
            console.error(err);
        })
}