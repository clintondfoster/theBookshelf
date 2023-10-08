import {
  useGetBooksQuery,
  useCreateOrderProductMutation,
  useGetOrderProductQuery,
} from "../reducers/api";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import { addToGuestCart } from "../reducers/guestSlice";
import { useDispatch } from "react-redux";
import Product from "./Product";


const Home = () => {
  const { data, isLoading } = useGetBooksQuery();


  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      flexDirection: 'row',
      justifyContent: 'left',
      alignItems: 'left',
      padding: '20px',
    }} className="content">
      {isLoading ? (
        <h1>Loading...</h1>
      ) : data.length === 0 ? (
        <h1>No Books Found</h1>
      ) : (
        data.map((i) => <Product key={i.id} book={i} />)
      )}
    </div>
  );
  
};

export default Home;