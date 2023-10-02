
// import { useGetOpenOrderQuery } from "../reducers/orderproduct";
import { useEffect, useState } from "react";
import { useGetOrderProductQuery, useGetBookByIdQuery } from "../reducers/api";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ViewCart = () => {
  const { data, isLoading } = useGetOrderProductQuery();
  console.log(data);

  useGetOrderProductQuery()
  const cart = useSelector(state => state.cart)
  console.log(cart);


  return (
    <div>
      {" "}
      <h2>Your Cart</h2>
      {cart.map((i) => (
          <div key={i.id}>
            <h2>Book ID: {i.booksId}</h2>
            <h2>Quantity: {i.quantity}</h2>
            <h2>Price: {i.price}</h2>
          </div>
        ))
      }
       <Link to="/home">Keep Shopping</Link>

    </div>
  );
};

export default ViewCart;
