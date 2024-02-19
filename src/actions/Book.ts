import axios from "axios";
import { IBook } from "../model/Book";

export const START_LOADING = "FETCH_BOOK_REQUEST";

export const DELETE_BOOK_SUCCESS = "DELETE_BOOK_SUCCESS";
export const DELETE_BOOK_ERROR = "DELETE_BOOK_ERROR";

export const ADD_BOOK_SUCCESS = "ADD_BOOK_SUCCESS";
export const ADD_BOOK_ERROR = "ADD_BOOK_ERROR";

export const UPDATE_BOOK_SUCCESS = "UPDATE_BOOK_SUCCESS";
export const UPDATE_BOOK_ERROR = "UPDATE_BOOK_ERROR";

export const FETCH_BOOKS_SUCCESS = "FETCH_BOOKS_SUCCESS";
export const FETCH_BOOK_SUCCESS = "FETCH_BOOK_SUCCESS";

export const FETCH_BOOKS_ERROR = "FETCH_BOOKS_ERROR";
export const FETCH_BOOK_ERROR = "FETCH_BOOK_ERROR";

const server = process.env.REACT_APP_SERVER_URL;

export type BookActions =
  | {
      type: typeof FETCH_BOOKS_SUCCESS;
      payload: any;
    }
  | {
      type: typeof FETCH_BOOKS_ERROR;
      payload: string;
    }
  | {
      type: typeof FETCH_BOOK_SUCCESS;
      payload: any;
    }
  | {
      type: typeof FETCH_BOOK_ERROR;
      payload: string;
    }
  | {
      type: typeof START_LOADING;
    }
  | {
      type: typeof DELETE_BOOK_SUCCESS;
      payload: string;
    }
  | {
      type: typeof DELETE_BOOK_ERROR;
      payload: string;
    }
  | {
      type: typeof UPDATE_BOOK_SUCCESS;
      payload: string;
    }
  | {
      type: typeof UPDATE_BOOK_ERROR;
      payload: string;
    }
  | {
      type: typeof ADD_BOOK_SUCCESS;
    }
  | {
      type: typeof ADD_BOOK_ERROR;
      payload: string;
    };

export const fetchBooks =
  () => async (dispatch: React.Dispatch<BookActions>) => {
    try {
      dispatch({ type: START_LOADING });
      const result = await axios.get(`${server}/books`);
      dispatch({ type: FETCH_BOOKS_SUCCESS, payload: result.data });
    } catch (error) {
      dispatch({ type: FETCH_BOOKS_ERROR, payload: "unable to fetch books" });
    }
  };

export const deleteBook =
  (id: number) => async (dispatch: React.Dispatch<BookActions>) => {
    try {
      dispatch({ type: START_LOADING });
       await axios.delete(`${server}/books/${id}`);
      dispatch({
        type: DELETE_BOOK_SUCCESS,
        payload: "book deleted successfully",
      });
      fetchBooks()(dispatch);
    } catch (error) {
      dispatch({ type: DELETE_BOOK_ERROR, payload: "unable to delete books" });
    }
  };

export const fetchABook =
  (id: number) => async (dispatch: React.Dispatch<BookActions>) => {
    try {
      dispatch({ type: START_LOADING });
      const result = await axios.get(`${server}/books/${id}`);
      dispatch({ type: FETCH_BOOK_SUCCESS, payload: result.data });
      fetchBooks()(dispatch);
    } catch (error) {
      dispatch({ type: FETCH_BOOK_ERROR, payload: "unable to fetch books" });
    }
  };

export const updateABook =
  (bookData: IBook) => async (dispatch: React.Dispatch<BookActions>) => {
    try {
      dispatch({ type: START_LOADING });
      const result = await axios.put(`${server}/books/${bookData.id}`, {
        Title: bookData.title,
        Author: bookData.author,
        Rating: parseInt(bookData.rating),
        Price: parseInt(bookData.price),
        Id: bookData.id,
      });
      dispatch({ type: UPDATE_BOOK_SUCCESS, payload: result.data });
      fetchABook(bookData.id)(dispatch);
      fetchBooks()(dispatch);
    } catch (error) {
      dispatch({ type: UPDATE_BOOK_ERROR, payload: "unable to update books" });
    }
  };
  export const addABook =
  (bookData:  Omit<IBook, 'id'>) => async (dispatch: React.Dispatch<BookActions>) => {
    try {
      dispatch({ type: START_LOADING });
       await axios.post(`${server}/books`, {
        Title: bookData.title,
        Author: bookData.author,
        Rating: parseInt(bookData.rating),
        Price: parseInt(bookData.price),
      });
      dispatch({ type: ADD_BOOK_SUCCESS });
      fetchBooks()(dispatch);
    } catch (error) {
      dispatch({ type: ADD_BOOK_ERROR, payload: "unable to add books" });
    }
  };

