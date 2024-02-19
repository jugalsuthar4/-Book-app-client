import { useEffect, useContext, useState } from "react";
import { addABook, fetchBooks } from "../actions/Book";
import { BookContext } from "../context/BookContext";
import BookCard from "../common/BookCard";
import { Alert, Box, Button, Grid, Modal, Typography } from "@mui/material";
import Loader from "../common/Loader";
import CommonTextfield from "../common/Textfield";

const HomeScreen = () => {
  const { state, dispatch } = useContext(BookContext);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    rating: "",
    price: "",
  });

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
    gap: 3,
  };

  useEffect(() => {
    fetchBooks()(dispatch);
  }, []);

  const isLoading = state.loading;

  const addBookDetails = async () => {
    setError("");
    const { author, price, rating, title } = formData;
    if (!author) {
      setError("please fill author name");
      return;
    }
    if (!price) {
      setError("please fill price details");
      return;
    }
    if (!rating || Number.isNaN(parseInt(rating)) || parseInt(rating) > 5) {
      setError("please fill appropriate rating and it should be less than 6");
      return;
    }
    if (!title) {
      setError("please fill title details");
      return;
    }
    await addABook({...formData})(dispatch);
    setFormData({
      title: "",
      author: "",
      rating: "",
      price: "",
    })
    setOpen(false)
  };

  if (isLoading) {
    return <Loader />;
  }

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      <Button style={{ float: "right", margin: "0 1rem" }} onClick={()=>{
        setOpen(true)
      }}>
        create a book
      </Button>
      <h3 style={{ textAlign: "center" }}>Books App</h3>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          width: "100vw",
        }}
      >
        <Grid container spacing={2}>
          {state.books.map((book) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={book.id}>
              <BookCard book={book} />
            </Grid>
          ))}
        </Grid>
      </Box>

      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography textAlign={"center"}>Add a book</Typography>
          <CommonTextfield
            label="book title"
            value={formData.title}
            callBack={handleInputChange}
            name={"title"}
          />
          <CommonTextfield
            label="book author"
            value={formData.author}
            callBack={handleInputChange}
            name={"author"}
          />
          <CommonTextfield
            label="rating"
            value={formData.rating}
            callBack={handleInputChange}
            name={"rating"}
          />
          <CommonTextfield
            label="price"
            value={formData.price}
            callBack={handleInputChange}
            name={"price"}
          />
          {error && <Alert severity="error">{error}</Alert>}
          <Button
            size="small"
            color="primary"
            onClick={() => {
              addBookDetails();
            }}
          >
            add book
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default HomeScreen;
