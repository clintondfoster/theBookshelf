import {
  useGetBookByIdQuery,
  useCreateOrderProductMutation,
  useGetOrderProductQuery,
} from "../reducers/api";
import { useParams, Link } from "react-router-dom";
import { useState } from "react";

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

  return (
    <div className="content">
      {isLoading ? (
        <h1>loading....</h1>
      ) : (
        <div key={data.id}>
          <h2>{data.title}</h2>
          <h4>{data.author}</h4>
          <p>{data.description}</p>
          <p>{data.genre}</p>
          <p>${data.price}</p>
          <p>Published on : {data.publish_date}</p>
          <p> By: {data.publisher}</p>

          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
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

      <Link to="/home">Go Back</Link>
    </div>
  );
};

export default SingleBook;
