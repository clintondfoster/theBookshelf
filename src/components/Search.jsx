import { useGetBooksQuery } from "../reducers/api";
import { useSelector } from "react-redux";
import RandomImage from "./inputs/RandomImage";
import { useState } from "react";
import {
  useCreateOrderProductMutation,
  useGetOrderProductQuery,
} from "../reducers/api";
import { useDispatch } from "react-redux";
import { addToGuestCart } from "../reducers/guestSlice";

function Search() {
  const dispatch = useDispatch();
  const searchInput = useSelector((state) => state.search);
  const [quantity, setQuantity] = useState(1);
  const [createOrderProduct] = useCreateOrderProductMutation();
  const { refetch } = useGetOrderProductQuery();
  const me = useSelector((state) => state.auth.credentials.token);
  const loggedIn = !!me;

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

  const guestAddToCart = (book) => {
    dispatch(addToGuestCart(book));
  };

  const { data, isLoading } = useGetBooksQuery();

  const filteredBooks = data
    ? data.filter((book) =>
        book.title.toLowerCase().includes(searchInput.toLowerCase())
      )
    : [];

  return (
    <div className="bookContainer">
      {isLoading ? (
        <h1>loading....</h1>
      ) : (
        <div>
          {filteredBooks.map((book) => (
            <div key={book.id} className="bookCard">
              <h1 style={{ color: "DarkCyan" }}>{book.title}</h1>
              <RandomImage />
              <h3 style={{ color: "DarkCyan" }}>{book.description}</h3>
              <p style={{ color: "DarkCyan" }}>{`Price: ${book.price}`}</p>
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
          ))}
        </div>
      )}
    </div>
  );
}

export default Search;
