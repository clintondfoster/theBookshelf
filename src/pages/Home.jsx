import { useGetBooksQuery } from "../reducers/api";
import { Link } from "react-router-dom";

const Home = () => {
  const { data, isLoading } = useGetBooksQuery();
  console.log(data)
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
            <p>${i.price}</p>
            <button>Add To Cart</button>
            {/* add onClick for add to cart */}
          </div>
        ))
      )}
    </div>
  );
};

export default Home;
