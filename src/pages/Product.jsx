import React, { useState } from "react";
import {
  useCreateOrderProductMutation,
  useGetOrderProductQuery,
} from "../reducers/api";
import { addToGuestCart } from "../reducers/guestSlice";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import RandomImage from "../components/inputs/RandomImage";


function Product({book}) {
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(1);
    const [createOrderProduct] = useCreateOrderProductMutation();
    const { refetch } = useGetOrderProductQuery();

    const me = useSelector((state) => state.auth.credentials.token)
    const loggedIn = !!me;
    // const loggedIn = false;
    // console.log(me)


  const guestAddToCart = (book) => {
    dispatch(addToGuestCart(book));
  };

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
  return (
    <div>
      <Link to={`/book/${book.id}`}>
        <h2>{book.title}</h2>
      </Link>
      <RandomImage/> 
      <h4>{book.author}</h4>
      <p>{book.description}</p>
      <p>¥{book.price}</p>

    
    <div className="input">
      <button type="button" onClick={handleDecrement}>-</button>
      <div>{quantity}</div>
      <button type='button' onClick={handleIncrement}>+</button>
    </div>
    <button
      onClick={async () => {
        if (loggedIn) {
            console.log("hit")
          await createOrderProduct({
            booksId: book.id,
            quantity: quantity,
            price: book.price,
            title: book.title
          })
          refetch()
        } else {
            dispatch(addToGuestCart({...book, quantity: quantity}));
        }
      }}
    >
      Add To Cart
    </button>
  </div>
  )

}

export default Product;
