import React from "react";
import { useGetOrderQuery, useGetOrderByIdQuery } from "../reducers/api";

const OrderHistory = () => {
  const { data, isLoading } = useGetOrderQuery();
  console.log(data);
  return (
    <div className="content">
      {isLoading ? (
        <h1>loading....</h1>
      ) : (
        data.map((i) =>(
        <div key={i.id}>
          <h3>Order Number: {i.id}</h3>
          <h4>Status: Completed</h4>
        </div>
        ))
      )}
    </div>
  );
};
export default OrderHistory;
