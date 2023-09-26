import { useGetBookByIdQuery } from "../reducers/api"
import {useParams,Link} from "react-router-dom";

const SingleBook = () => {

  const params = useParams();
  const {data, isLoading}= useGetBookByIdQuery(params.id);


  return (
    <div>
      
      {isLoading ? <h1>loading....</h1> :
    <div key={data.id}>
     <h2>{data.title}</h2>
      <h4>{data.author}</h4>
      <p>{data.description}</p>
      <p>{data.genre}</p>
      <p>${data.price}</p>
      <p>Published on : {data.publish_date}</p>
      <p> By: {data.publisher}</p>

      <button>Add To Cart</button>
    </div>
}
   

      <Link to='/allbooks'>Go Back</Link>
    </div>

    
  )
}

export default SingleBook;