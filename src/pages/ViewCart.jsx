
import { useGetOrderProductQuery } from "../reducers/api";
import { Link } from "react-router-dom";
const ViewCart = () => {

  const {data, isLoading } = useGetOrderProductQuery(); 
  console.log(data)
 
  return (
    <div>         <h2>Your Cart</h2>
    {isLoading ? (
      <h1>Loading...</h1>
    ) : data.cart.length === 0 ? (
      <h1>No Books Found</h1>
    ) : (
      data.cart.map((i) => (
        <div key={i.orderId}>
            <h5>Order ID: {i.orderId}</h5>
            <h6>Book ID: {i.booksId}</h6>
            <h6>Quantity: {i.quantity}</h6>
            <h6>Price: ${i.price}</h6>        
        </div>
      ))
    )}
   <Link to='/home' >Keep Shopping</Link>
   <h4> Ready to Checkout?</h4>
        <Link to="/">Checkout as Guest  </Link> <p>or</p>
        <Link to="/auth">Sign in/Create an account </Link> 
  </div>
  
  );
};

export default ViewCart;
