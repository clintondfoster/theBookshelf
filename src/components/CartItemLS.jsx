import React from 'react';
import { removeFromGuestCart } from "../reducers/guestSlice";
import { useDispatch } from "react-redux";
import RandomImage from './inputs/RandomImage';

function CartItemLS({ onClickFunc, book }) {
  console.log(book)

  const dispatch = useDispatch()
  const handleRemoveFromGuestCart = (bookId) => {
    dispatch(removeFromGuestCart(bookId))
  }
  return (
    <div>
      {book ? (
        <>
          <h2>Title: {book.title}</h2>
          <RandomImage/> 
          <h2>Quantity: {book.quantity}</h2>
          <h2>Price: ¥{book.price}</h2>
          {/* <button onClick={() => onClickFunc(book.id)}>Remove Item</button> */}
          <button onClick={handleRemoveFromGuestCart}>Remove Item</button>
        </>
      ) : (
        null
      )}
    </div>
  );
}

export default CartItemLS;
