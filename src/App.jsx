import Search from "./components/Search";
import Home from "./pages/Home";
import SingleBook from "./pages/SingleBook";
import AuthForm from "./components/AuthForm"
import {Route, Routes} from "react-router-dom";
import UserProfile from "./components/UserProfile";
import ViewCart from "./pages/ViewCart";
import Checkout from "./pages/Checkout";



function App() {
  return (
    <div className="App">
    <Routes>
      <Route path="/home" element={<Home/>}/>
      <Route path="/search-results" element={<Search />} />
      <Route path={"/book/:id"} element={<SingleBook/>}/>   
      <Route path={"/auth"} element={<AuthForm/>}/>
      <Route path={"/login"} element={<AuthForm/>}/>
      {/* <Route path={"/register"} element={<AuthForm/>}/> */}
      <Route path={"/profile/:id"} element={<UserProfile/>}/>
      <Route path={"/me"} element={<UserProfile/>}/>
      <Route path={"/cart"} element={<ViewCart/>}/>
      <Route path={"/checkout"} element={<Checkout/>}/>
    </Routes>
    </div>
  );
}

export default App;
