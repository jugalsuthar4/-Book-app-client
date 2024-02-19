import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import HomeScreen from './screens/home';
import { BookContextProvider } from './context/BookContext';
import Book from './screens/Book';


const router = createBrowserRouter([
  {
    path: "/",
    element:<HomeScreen/>,
  },
  {
    path:"/book/:id",
    element:<Book/>
  }
 
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BookContextProvider>
     <RouterProvider router={router} />
     </BookContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
