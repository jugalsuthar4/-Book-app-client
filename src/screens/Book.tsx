import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BookContext } from "../context/BookContext";
import { fetchABook } from "../actions/Book";
import Loader from "../common/Loader";
import BookDetail from "./BookDetail";
import { Typography } from "@mui/material";

const Book = () => {
  const { id } = useParams();
  const { dispatch, state } = useContext(BookContext);
  useEffect(() => {
    fetchABook(parseInt(id!))(dispatch);
  }, []);
  const isLoading = state.loading;
  if (isLoading) return <Loader />;
  if(!state.book) return <Typography textAlign={"center"}>book not found</Typography>
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "grid",
        placeItems: "center",
      }}
    >
      <BookDetail book={state.book} />
    </div>
  );
};

export default Book;
