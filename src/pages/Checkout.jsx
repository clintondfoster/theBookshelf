import { Link } from "react-router-dom";
import {
  useCreateOrderMutation,
  useGetOrderProductQuery,
} from "../reducers/api";
import { useSelector } from "react-redux";

const Checkout = () => {
  const { data, isLoading } = useCreateOrderMutation();
  const { refetch } = useGetOrderProductQuery();
  const [createOrder] = useCreateOrderMutation();
  const onCreate = async () => {
    await createOrder()
      .then(() => {
        console.log("order has been created");
      })
      .then(() => refetch())
      .catch(() => {
        console.log("error");
      });
  };

  function CheckOutMsg() {
    alert("You have sucessfully placed your order");
  }

  return (
    <div
      style={{
        marginTop: "90px",
        transform: "translateX(40%)",
        height: "100px",
      }}
    >
      <button
        className="checkoutBtn"
        onClick={(event) => {
          onCreate();
          CheckOutMsg();
        }}
      >
        Pay & Complete Order
      </button>
    </div>
  );
};
export default Checkout;
