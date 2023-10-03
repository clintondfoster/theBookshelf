import Search from "./components/Search";
import Home from "./pages/Home";
import SingleBook from "./pages/SingleBook";
import AuthForm from "./components/AuthForm"
import {Route, Routes} from "react-router-dom";
import Cart from "./pages/Cart";
import UserProfile from "./components/UserProfile";
import { useSelector } from "react-redux";
import { useGetBooksQuery } from "./reducers/api";
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";


function App() {
 
  // const data = useSelector(state => state.data);
  const me = useSelector((state) => state.auth.credentials.user);
  const books = useGetBooksQuery();

  const [load, setLoad] = useState(true);

  useEffect(()=>{
    setLoad(books.isLoading)
  }, [books])
 

  const loggedIn = me.userId;
  
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/search-results" element={<Search />} />
      <Route path={"/book/:id"} element={<SingleBook />} />
      <Route path={"/cart"} element={<Cart />} />
      <Route path={"/login"} element={<AuthForm />} />
      <Route path="/checkout" element={loggedIn ? <Checkout /> : <Navigate to="/login" />} />
      <Route path="/admin/*" element={isAdmin ? <AdminDashboard /> : <Navigate to="/login" />} />
      <Route path={"/me"} element={loggedIn ? <UserProfile /> : <Navigate to="/login" />} />
      <Route path={"/profile/:id"} element={<UserProfile/>}/>
    </Routes>
  )
}

export default App;



// import Search from "./components/Search";
// import Home from "./pages/Home";
// import SingleBook from "./pages/SingleBook";
// import AuthForm from "./components/AuthForm"
// import {Route, Routes} from "react-router-dom";
// import UserProfile from "./components/UserProfile";
// import ViewCart from "./pages/ViewCart";



// function App() {
//   return (
//     <div className="App">
//     <Routes>
//       <Route path="/home" element={<Home/>}/>
//       <Route path="/search-results" element={<Search />} />
//       <Route path={"/book/:id"} element={<SingleBook/>}/>   
//       <Route path={"/auth"} element={<AuthForm/>}/>
//       <Route path={"/login"} element={<AuthForm/>}/>
//       {/* <Route path={"/register"} element={<AuthForm/>}/> */}
//       <Route path={"/profile/:id"} element={<UserProfile/>}/>
//       <Route path={"/me"} element={<UserProfile/>}/>
//       <Route path={"/cart"} element={<ViewCart/>}/>
//     </Routes>
//     </div>
//   );
// }

// export default App;