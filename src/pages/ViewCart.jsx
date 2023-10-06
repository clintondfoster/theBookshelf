// import { useGetOpenOrderQuery } from "../reducers/orderproduct";
import { useEffect, useState } from "react";
import { useGetOrderProductQuery, useGetBookByIdQuery } from "../reducers/api";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDeleteOrderProductMutation } from "../reducers/api";
import { removeFromGuestCart } from "../reducers/guestSlice";
import { useDispatch } from "react-redux";
import CartItemDB from "../components/CartItemDB";
import CartItemLS from "../components/CartItemLS";

const ViewCart = () => {

  const { data, isLoading } = useGetOrderProductQuery();
  console.log(data);
  
  const {refetch} =   useGetOrderProductQuery();

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
      }).then(()=> refetch())
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
            <CartItemDB onClickFunc={onDelete} book={i}/>
          ))}
        </>
      ) : (
        <>
          <h2>Your Cart</h2>
          {guestCart.map((i) => (
            <CartItemLS onClickFunc={handleRemoveFromGuestCart} />
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
