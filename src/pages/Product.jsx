import React, { useState } from "react";
import {
  useCreateOrderProductMutation,
  useGetOrderProductQuery,
} from "../reducers/api";
import { addToGuestCart } from "../reducers/guestSlice";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import RandomImage from "../components/inputs/RandomImage";

function Product({ book }) {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [createOrderProduct] = useCreateOrderProductMutation();
  const { refetch } = useGetOrderProductQuery();

  const me = useSelector((state) => state.auth.credentials.token);
  const loggedIn = !!me;
  // const loggedIn = false;
  // console.log(me)

  const guestAddToCart = (book) => {
    dispatch(addToGuestCart(book));
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prevCount) => prevCount - 1);
    }
  };
  const handleIncrement = () => {
    if (quantity < 10) {
      setQuantity((prevCount) => prevCount + 1);
    }
  };
  return (
    <div style={{textAlign:'center'} }>
      <div style={{boxSizing:'border-box',width:'330px', height: '450px', marginTop:'20px', marginLeft:'15px',boxShadow: '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)'}}>
      <Link to={`/book/${book.id}`} style={{textDecoration:'none'}}>
        <h2 style={{color:'CornflowerBlue'}}>{book.title}</h2>
      </Link>
      <RandomImage />
      <h4 style={{color:'DarkCyan'}}>{book.author}</h4>
      <p style={{color:'DarkCyan'}}>{book.description}</p>
      <p style={{color:'DarkGreen'}}>¥{book.price}</p>
      </div>

      <div className="button"style={{display: 'flex', justifyContent:'center'
    }} >
        <button  onClick={handleDecrement}>
          -
        </button>
        <div>{quantity}</div>
        <button onClick={handleIncrement}>
          +
        </button>

      <button
        onClick={async () => {
          if (loggedIn) {
            console.log("hit");
            await createOrderProduct({
              booksId: book.id,
              quantity: quantity,
              price: book.price,
              title: book.title,
            });
            refetch();
          } else {
            dispatch(addToGuestCart({ ...book, quantity: quantity }));
          }
        }}
      >
        Add To Cart
      </button>
      </div>
    </div>
  );
}

export default Product;
