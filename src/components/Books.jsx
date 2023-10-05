import {
  useCreateOrderProductMutation,
  useGetOrderProductQuery,
} from "../reducers/api";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { addToGuestCart } from "../reducers/guestSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";

const Books = ({ book, selectedBook }) => {
  const [quantity, setQuantity] = useState(1);
  const [createOrderProduct] = useCreateOrderProductMutation();
  const { refetch } = useGetOrderProductQuery();
  const me = useSelector((state) => state.auth.credentials);
  const loggedIn = !!me;
  // const loggedIn = false;
  const dispatch = useDispatch();

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prevCount) => prevCount - 1);
    }
  };
  const handleIncrement = () => {
    if (quantity < 10) {
      setQuantity((prevCount) => prevCount + 1);
    }
  };

  const guestAddToCart = (book) => {
    dispatch(addToGuestCart(book));
  };

  const addToCart = async () => {
    if (loggedIn) {
      try {
        if (selectedBook) {
          const response = await createOrderProduct({
            booksId: selectedBook.id,
            quantity: quantity,
            price: selectedBook.price,
            title: selectedBook.title,
          });

          if (response.data) {
            console.log("Added to Cart:", response.data.addedToCart);
          }
          refetch();
        }
      } catch (error) {
        console.error("Error adding to cart:", error);
      }
    } else {
      guestAddToCart(book);
      console.log("guest cart", book);
    }
  };

  return (
    <div key={book.id}>
      <Link to={`/book/${book.id}`}>
        <h2>{book.title}</h2>
      </Link>
      <h4>{book.author}</h4>
      <p>{book.description}</p>
      <p>¥{book.price}</p>
      <div className="input">
        <button type="button" onClick={handleDecrement}>
          -
        </button>
        <div>{quantity}</div>
        <button type="button" onClick={handleIncrement}>
          +
        </button>
      </div>
      <button onClick={addToCart}>Add To Cart</button>
    </div>
  );
};
export default Books;
