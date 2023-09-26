import { useGetBooksQuery } from "../reducers/api";
import { useSelector } from "react-redux";

function Search() {
  const searchInput = useSelector((state) => state.search);

  const { data, isLoading } = useGetBooksQuery();
  //   console.log(data)

  const filteredBooks = data
    ? data.filter((book) =>
        book.title.toLowerCase().includes(searchInput.toLowerCase())
      )
    : [];
//   console.log(filteredBooks)
  console.log(searchInput)

  return (
    <div>
      {isLoading ? (
        <h1>loading....</h1>
      ) : (
        filteredBooks.map((book) => (
          <div key={book.id}>
            <h1>{book.title}</h1>
            <h3>{book.description}</h3>
            <p>{`Price: ${book.price}`}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Search;
