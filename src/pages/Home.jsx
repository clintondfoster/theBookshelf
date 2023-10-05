import {
  useGetBooksQuery,
  useCreateOrderProductMutation,
  useGetOrderProductQuery
} from "../reducers/api";
import { Link } from "react-router-dom";
import { useState } from "react";

const Home = () => {
  const { data, isLoading } = useGetBooksQuery();
  // console.log(data);

  const [selectedBook, setSelectedBook] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [createOrderProduct] = useCreateOrderProductMutation();
  const {refetch} =   useGetOrderProductQuery();

  const addToCart = async () => {
    console.log("clicked")
    try {
      if (selectedBook) {
        const response = await createOrderProduct({
          booksId: selectedBook.id,
          quantity: quantity,
          price: selectedBook.price,
          title: selectedBook.title
        });

        if (response.data) {
          console.log("Added to Cart:", response.data.addedToCart);
        }
        refetch()
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <div>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : data.length === 0 ? (
        <h1>No Books Found</h1>
      ) : (
        data.map((i) => (
          <div key={i.id}>
            <Link to={`/book/${i.id}`}>
              <h2>{i.title}</h2>
            </Link>
            <h4>{i.author}</h4>
            <p>{i.description}</p>
            <p>¥{i.price}</p>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
            <button
              onClick={() => {
                setSelectedBook(i);
                addToCart();
              }}
            >
              Add To Cart
            </button>
          </div>
        ))
      )}
    
    </div>
  );
};

export default Home;
