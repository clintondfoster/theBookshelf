// import { useGetOpenOrderQuery } from "../reducers/orderproduct";
import { useGetOrderProductQuery } from "../reducers/api";

const ViewCart = () => {

  const {data, isLoading } = useGetOrderProductQuery(); 
  console.log(data)
 
  return (
    <div>
    {isLoading ? (
      <h1>Loading...</h1>
    ) : data.cart.length === 0 ? (
      <h1>No Books Found</h1>
    ) : (
      data.cart.map((i) => (
        <div key={i.id}>
            <h2>Order ID: {i.orderId}</h2>
            <h2>Book ID: {i.booksId}</h2>
            <h2>Quantity: {i.quantity}</h2>
            <h2>Price: {i.price}</h2>
        </div>
      ))
    )}
  </div>
  );
};

export default ViewCart;
