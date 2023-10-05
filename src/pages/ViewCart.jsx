// import { useGetOpenOrderQuery } from "../reducers/orderproduct";
import { useEffect, useState } from "react";
import { useGetOrderProductQuery, useGetBookByIdQuery } from "../reducers/api";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDeleteOrderProductMutation } from "../reducers/api";
import { removeFromGuestCart } from "../reducers/guestSlice";
import { useDispatch } from "react-redux";

const ViewCart = () => {

  const { data, isLoading } = useGetOrderProductQuery();
  console.log("cart data", data);

  useGetOrderProductQuery();
  const cart = useSelector((state) => state.cart);
  const guestCart = useSelector((state) => state.guestCart)
  const me = useSelector((state) => state.auth.credentials)


  const [removeItem] = useDeleteOrderProductMutation();
  const onDelete = async (id) => {
    await removeItem(id)
      .then(() => {
        console.log("delete");
      })
      .catch(() => {
        console.log("error");
      });
  };

  // const loggedIn = false 
  const loggedIn = !!me;
  const dispatch = useDispatch()
  const handleRemoveFromGuestCart = () => {
    dispatch(removeFromGuestCart())
  }

  return (
    <div>
      {loggedIn ? (
        <>
          <h2>Your Cart</h2>
          {cart.map((i) => (
            <div key={i.id}>
              <h2>Title:{i.title}</h2>
              <h2>Quantity: {i.quantity}</h2>
              <h2>Price: ¥{i.price}</h2>
              <button onClick={() => onDelete(i.id)}>Remove Item</button>
            </div>
          ))}
        </>
      ) : (
        <>
          <h2>Your Cart</h2>
          {guestCart.map((i) => (
            <div key={i.id}>
              <h2>Title:{i.title}</h2>
              <h2>Quantity: {i.quantity}</h2>
              <h2>Price: ¥{i.price}</h2>
              <button onClick={handleRemoveFromGuestCart}>Remove Item</button> 
            </div>
          ))}
        </>
      )}
  
      <section>
        <Link to="/home">Keep Shopping</Link>
      </section>
      <section>
        <Link to="/checkout">Checkout</Link>
      </section>
    </div>
  );
  
  
  
  
  
  
};

export default ViewCart;
