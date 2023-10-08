import {
  useGetBookByIdQuery,
  useCreateOrderProductMutation,
  useGetOrderProductQuery,
} from "../reducers/api";
import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import RandomImage from "../components/inputs/RandomImage";

const SingleBook = () => {
  const params = useParams();
  const { data, isLoading } = useGetBookByIdQuery(params.id);
  const { refetch } = useGetOrderProductQuery();
  const [selectedBook, setSelectedBook] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [createOrderProduct] = useCreateOrderProductMutation();

  const addToCart = async () => {
    try {
      if (selectedBook) {
        const response = await createOrderProduct({
          booksId: selectedBook.id,
          quantity: quantity,
          price: selectedBook.price,
          title: selectedBook.title,
        });
        refetch();

        if (response.data) {
          console.log("Added to Cart:", response.data.addedToCart);
        }
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
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
    <div className="bookContainer">
      {isLoading ? (
        <h1>loading....</h1>
      ) : (
        <div key={data.id} style={{ textAlign: "center" }}>
          <div className="bookCard">
            <h2 style={{ color: "CornflowerBlue" }}>{data.title}</h2>
            <RandomImage />
            <h4 style={{ color: "DarkCyan" }}>{data.author}</h4>
            <p style={{ color: "DarkCyan" }}>{data.description}</p>
            <p style={{ color: "DarkGreen" }}>{data.genre}</p>
            <p style={{ color: "DarkGreen" }}>¥{data.price}</p>
            <p style={{ color: "DarkGreen" }}>
              Published on : {data.publish_date}
            </p>
            <p style={{ color: "DarkGreen" }}> By: {data.publisher}</p>
          </div>
          <div
            className="button"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <button onClick={handleDecrement}>-</button>
            <div>{quantity}</div>
            <button onClick={handleIncrement}>+</button>
          </div>
          <button
            onClick={() => {
              setSelectedBook(data);
              addToCart();
            }}
          >
            Add To Cart
          </button>
        </div>
      )}
      <div
        style={{
          position: "absolute",
          bottom: "0",
        }}
        className="goBack"
      >
        <Link to="/home">Go Back</Link>
      </div>
    </div>
  );
};

export default SingleBook;
