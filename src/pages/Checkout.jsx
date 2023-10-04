import { Link } from "react-router-dom";
import { useCreateOrderMutation,useGetOrderProductQuery } from "../reducers/api";
import { useSelector } from "react-redux";

const Checkout = () => {
  const { data, isLoading } = useCreateOrderMutation();
  const {refetch} =   useGetOrderProductQuery();
  // useCreateOrderMutation();
  // const order = useSelector((state) => state.order);
  
  const [createOrder] = useCreateOrderMutation();
  const onCreate = async () => {
    await createOrder()
      .then(() => {
        console.log("order has been created");
      }).then(()=> refetch())
      .catch(() => {
        console.log("error");
      });
  };

  return (
    <div>
      <button onClick={onCreate}>Pay & Complete Order</button>
    </div>
  );
};

export default Checkout;
