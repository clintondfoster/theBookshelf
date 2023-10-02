import Search from "./components/Search";
import Home from "./pages/Home";
import SingleBook from "./pages/SingleBook";
import AuthForm from "./components/AuthForm"
import {Route, Routes} from "react-router-dom";
import Cart from "./pages/Cart";



function App() {
  return (
    <div className="App">
    <Routes>
      <Route path={"/home"} element={<Home/>}/>
      <Route path="/search-results" element={<Search />} />
      <Route path={"/book/:id"} element={<SingleBook/>}/>
      <Route path={"/auth"} element={<AuthForm/>}/>
      <Route path={"/cart"} element={<Cart/>}/>
    </Routes>
    </div>
  );
}

export default App;
