import { Link } from "react-router-dom"



export default function Cart(){

    return(
        <>
        <h2>Your Cart</h2>
        <div className="cartItem">
           




        <button>Remove From Cart</button>
        <h4>Order Sumarry</h4>
        <Link to='/' >Keep Shopping</Link>
        </div>


        <div className="checkout">
        <h4> Ready to Checkout?</h4>
        <Link to="/">Checkout as Guest  </Link> <p>or</p>
        <Link to="/auth">Sign in/Create an account </Link> 
   
        </div>


        </>
    )
}