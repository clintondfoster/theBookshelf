// import { useGetOpenOrderQuery } from "../reducers/orderproduct";
import { useEffect, useState } from "react";
import { useGetOrderProductQuery, useGetBookByIdQuery } from "../reducers/api";
import { useSelector } from "react-redux";


const ViewCart = () => {

  useGetOrderProductQuery()
  const cart = useSelector(state => state.cart)
  console.log(cart);


  return (
    <div>
      {cart.map((i) => (
          <div key={i.id}>
            <h2>Book ID: {i.booksId}</h2>
            <h2>Quantity: {i.quantity}</h2>
            <h2>Price: {i.price}</h2>
          </div>
        ))
      }
    </div>
  );
};

export default ViewCart;
