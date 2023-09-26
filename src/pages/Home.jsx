import { useGetBooksQuery } from "../reducers/api"
import {Link} from "react-router-dom";
import SingleBook from "./SingleBook";

const Home = () => {
  const {data, isLoading}= useGetBooksQuery();
  return (
    <div>
      {isLoading? <h1>Loading...</h1>: data.length===0? <h1>No Books Found</h1>:data.map((i)=>
    <div key={i.id}>
      <Link to ={`/book/${i.id}`}><h2>{i.title}</h2></Link>
      <h4>{i.author}</h4>
      <p>{i.description}</p>
      <p>${i.price}</p>
      <button>Add To Cart</button>
    </div>
)}
      


  
    </div>
  )}

export default Home;