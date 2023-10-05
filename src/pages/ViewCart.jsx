// import { useGetOpenOrderQuery } from "../reducers/orderproduct";
import { useEffect, useState } from "react";
import { useGetOrderProductQuery, useGetBookByIdQuery } from "../reducers/api";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDeleteOrderProductMutation } from "../reducers/api";

const ViewCart = () => {

  const { data, isLoading } = useGetOrderProductQuery();
  console.log(data);
  
  const {refetch} =   useGetOrderProductQuery();

  
  useGetOrderProductQuery();
  const cart = useSelector((state) => state.cart);
  console.log(cart);

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

  return (
    <div>
      {" "}
      <h2>Your Cart</h2>
      {cart.map((i) => (
        <div key={i.id}>
          <h2>Title:{i.title}</h2>
          <h2>Quantity: {i.quantity}</h2>
          <h2>Price: ¥{i.price}</h2>
          <button>+</button>
          <button onClick={() => onDelete(i.id)}>Remove Item</button>
        </div>
      ))}
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
