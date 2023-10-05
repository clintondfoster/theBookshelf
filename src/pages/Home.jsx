import { useGetBooksQuery } from "../reducers/api";
import Books from "../components/Books";

const Home = () => {
  const { data, isLoading } = useGetBooksQuery();

  return (
    <div>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : data.length === 0 ? (
        <h1>No Books Found</h1>
      ) : (
        data.map((book) => (
          <Books key={book.id} book={book} selectedBook={book}/> 
        ))
      )}
    </div>
  );
};

export default Home;
