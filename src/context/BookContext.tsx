import { ReactNode, useReducer ,createContext} from "react";
import { BookReducer, IBookState, initialState } from "../reducers/BookReducer";
import { BookActions } from "../actions/Book";

export const BookContext = createContext<{
    state: IBookState,
    dispatch: React.Dispatch<BookActions>;
  }>({
    state: initialState,
    dispatch: () => null,
  });
  

export const BookContextProvider: React.FC<{ children: ReactNode }> = ({
    children,
  }) => {
    const [state, dispatch] = useReducer(BookReducer, initialState);

    const value = { state, dispatch };

    return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
  };