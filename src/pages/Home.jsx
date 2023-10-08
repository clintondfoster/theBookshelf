import {
  useGetBooksQuery,
  useCreateOrderProductMutation,
  useGetOrderProductQuery,
} from "../reducers/api";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import { addToGuestCart } from "../reducers/guestSlice";
import { useDispatch } from "react-redux";
import Product from "./Product";


const Home = () => {
  const { data, isLoading } = useGetBooksQuery();
  // console.log(data);

  // const [selectedBook, setSelectedBook] = useState(null);
  // const [quantity, setQuantity] = useState(1); //
  // const [createOrderProduct] = useCreateOrderProductMutation(); //
  // const { refetch } = useGetOrderProductQuery(); //
  // const me = useSelector((state) => state.auth.credentials); //
  // console.log(me);

  // const addToCart = async () => {
  //   // console.log("clicked")
  //   try {
  //     if (selectedBook) {
  //       const response = await createOrderProduct({
  //         booksId: selectedBook.id,
  //         quantity: quantity,
  //         price: selectedBook.price,
  //         title: selectedBook.title
  //       });
  //     }

  // const addToCart = async () => {
  //   console.log("clicked");
  //   try {
  //     if (selectedBook) {
  //       const response = await createOrderProduct({
  //         booksId: selectedBook.id,
  //         quantity: quantity,
  //         price: selectedBook.price,
  //         title: selectedBook.title,
  //       });

  //       if (response.data) {
  //         console.log("Added to Cart:", response.data.addedToCart);
  //       }
  //       refetch();
  //     }
  //   } catch (error) {
  //     console.error("Error adding to cart:", error);
  //   }
  // };

  // const dispatch = useDispatch();
  // const guestAddToCart = (book) => {
  //   dispatch(addToGuestCart(book));
  // };

  // // const loggedIn = false;
  // const loggedIn = !!me; //
  // console.log(loggedIn);

  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      flexDirection: 'row',
      justifyContent: 'left',
      alignItems: 'left',
      padding: '20px',
    }} className="content">
      {isLoading ? (
        <h1>Loading...</h1>
      ) : data.length === 0 ? (
        <h1>No Books Found</h1>
      ) : (
        data.map((i) => <Product key={i.id} book={i} />)
      )}
    </div>
  );
  
};

export default Home;