import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { IBook } from "../model/Book";
import {  Alert, Box, Modal, Rating } from "@mui/material";
import CommonTextfield from "../common/Textfield";
import { updateABook } from "../actions/Book";
import { BookContext } from "../context/BookContext";

export default function BookDetail({book}:{book:IBook}) {
 
  const [open,setOpen]=React.useState(false);

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
    display:"flex",
    justifyContent:"space-between",
    flexDirection:"column",
    gap:3
  };

  const [formData, setFormData] = React.useState({
    title: book.title,
    author: book.author,
    rating: book.rating,
    price: book.price,
  });
  const [error,setError]=React.useState("");

  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const {dispatch}=React.useContext(BookContext);
  
  const updateBookDetails=async()=>{
    setError("");
      const {author,price,rating,title}=formData;
      if(!author) {
        setError("please fill author name")
        return ;
      }
      if(!price) {
        setError("please fill price details");
        return ;
      }
      if(!rating || Number.isNaN(parseInt(rating)) || parseInt(rating)>5) {
        setError("please fill appropriate rating and it should be less than 6");
        return ;
      }
      if(!title) {
        setError("please fill title details");
        return ;
      }
      await updateABook({...formData,id:book.id})(dispatch);
  }
  
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
            {book?.title}
          </Typography>
          <Rating name="simple-controlled" value={parseInt(book?.rating) ?? "1"} />
          <Typography variant="body2" color="text.secondary">
            {book?.author}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            $ {book?.price}
          </Typography>            
        </CardContent>

        <CardActions>
        <Button size="small" color="primary"  onClick={()=>{setOpen(true)}}>
            Update Book
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
          <Typography textAlign={"center"}>UPDATE BOOK</Typography>
            <CommonTextfield label="book title" value={formData.title} callBack={handleInputChange} name={"title"}/>
            <CommonTextfield label="book author" value={formData.author}  callBack={handleInputChange} name={"author"}/>
            <CommonTextfield label="rating" value={formData.rating}  callBack={handleInputChange} name={"rating"}/>
            <CommonTextfield label="price" value={formData.price}  callBack={handleInputChange} name={"price"} />
             {
              error && 
              <Alert  severity="error">
   {error}
            </Alert>
             }
            <Button size="small" color="primary" onClick={()=>{
               updateBookDetails();
            }}>
            update
          </Button>
        </Box>
      </Modal>
    </>
  );
}
