import {
  BookActions,
  DELETE_BOOK_ERROR,
  DELETE_BOOK_SUCCESS,
  FETCH_BOOKS_ERROR,
  FETCH_BOOKS_SUCCESS,
  FETCH_BOOK_ERROR,
  FETCH_BOOK_SUCCESS,
  START_LOADING,
  UPDATE_BOOK_ERROR,
  UPDATE_BOOK_SUCCESS,
} from "../actions/Book";
import { IBook } from "../model/Book";

export interface IBookState {
  loading: boolean;
  book?: IBook;
  books: IBook[];
  error:string
}

export const initialState: IBookState = {
  books: [],
  loading: false,
  error:""
};

export const BookReducer = (
  state: IBookState = initialState,
  action: BookActions
): IBookState => {
  switch (action.type) {
    case START_LOADING :{
        return {...state,loading:true}
    }
    case FETCH_BOOKS_SUCCESS: {
      return { ...state, books: action.payload,loading:false };
    }
    case FETCH_BOOKS_ERROR: {
      return {
        ...state,
        loading: false,
      };
    }
    case FETCH_BOOK_SUCCESS:{
      return {
        ...state,loading:false,book:action.payload
      }
    }
    case FETCH_BOOK_ERROR:{
      return {
        ...state,loading:false,error:action.payload
      }
    }
    case DELETE_BOOK_SUCCESS : {
        return {
            ...state,loading:false,
        }
    }

    case UPDATE_BOOK_SUCCESS :{
       return {
        ...state,loading:false
       }
    }
    case UPDATE_BOOK_ERROR:{
      return {
         ...state,error:action.payload
      }
    }
    case DELETE_BOOK_ERROR:{
        return {
            ...state,loading:false,
            error:action.payload
        }
    }
    default:
      return state;
  }
};
