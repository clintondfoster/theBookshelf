import React from "react";
import { useGetOrderQuery, useGetOrderByIdQuery } from "../reducers/api";

const OrderHistory = () => {
  const { data, isLoading } = useGetOrderQuery();
  console.log(data);
  return (
    <div className="content" style={{
      display: 'flex',
      flexWrap: 'wrap',
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      
    }}
    >
      {isLoading ? (
        <h1>loading....</h1>
      ) : (
        data.map((i) =>(
        <div key={i.id}>
          <h4 style={{color:'black'}}>Order Number: {i.id}</h4>
          <h6 style={{color:'DarkCyan'}}>Status: Completed</h6>
        </div>
        ))
      )}
    </div>
  );
};
export default OrderHistory;
