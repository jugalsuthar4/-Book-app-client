import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { IBook } from "../model/Book";
import { Box, Modal, Rating } from "@mui/material";
import { BookContext } from "../context/BookContext";
import { deleteBook } from "../actions/Book";
import { useNavigate } from "react-router-dom";

export default function BookCard({ book }: { book: IBook }) {
  const [open, setOpen] = React.useState(false);
  const { dispatch } = React.useContext(BookContext);
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
  };
  const deleteThisBook = () => {
    deleteBook(book.id)(dispatch);
  };
  const navigate = useNavigate();
  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          sx={{ height: 140 }}
          image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtCyGq73Yl8yr0YzSuxuS8-fJUQVGXDgPJRw&usqp=CAU"
          title="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {book.title}
          </Typography>
          <Rating name="simple-controlled" value={parseInt(book.rating)} />
          <Typography variant="body2" color="text.secondary">
            {book.author}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={()=>{
             navigate(`/book/${book.id}`);
          }}>Learn More</Button>
          <Button size="small" color="warning" onClick={() => setOpen(true)}>
            Delete
          </Button>
        </CardActions>
      </Card>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Delete Book {book.title}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Are you sure do you want to delete book ?
          </Typography>
          <br />
          <Button size="small" onClick={() => setOpen(false)}>
            No
          </Button>
          <Button size="small" color="warning" onClick={deleteThisBook}>
            Yes
          </Button>
        </Box>
      </Modal>
    </>
  );
}
