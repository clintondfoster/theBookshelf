import React from "react";
import { removeFromGuestCart, updateGuestCartItemQuantity } from "../reducers/guestSlice";
import { useDispatch } from "react-redux";
import RandomImage from "./inputs/RandomImage";
import { useState } from "react";

function CartItemLS({ onClickFunc, book }) {
  console.log(book);

  const dispatch = useDispatch();
  const handleRemoveFromGuestCart = (bookId) => {
    dispatch(removeFromGuestCart(bookId));
  };
  const [quantity, setQuantity] = useState(book.quantity);
  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prevCount) => prevCount - 1);
    }
  };
  const handleIncrement = () => {
    if (quantity < 100) {
      setQuantity((prevCount) => prevCount + 1);
    }
  };

  const onUpdate = (bookId, newQuantity) => {
    dispatch(updateGuestCartItemQuantity({ bookId, quantity: newQuantity }));
  };

  return (
    <div>
      {book ? (
        <div className="bookCard">
          <h2 style={{ color: "DarkCyan" }}>{book.title}</h2>
          <RandomImage />
    
          <div className="input">
            <button onClick={handleDecrement}>-</button>
            <div>{quantity}</div>
            <button type="button" onClick={handleIncrement}>
              +
            </button>
            <button onClick={() => onUpdate(book.id, quantity)}>
              Update Item
            </button>
          </div>
          <h2 style={{ color: "DarkCyan" }}>Quantity: {book.quantity}</h2>
          <h2 style={{ color: "DarkCyan" }}>Price: ¥{book.price}</h2>
          {/* <button onClick={() => onClickFunc(book.id)}>Remove Item</button> */}
          <button onClick={handleRemoveFromGuestCart}>Remove Item</button>
        </div>
      ) : null}
    </div>
  );
}

export default CartItemLS;
