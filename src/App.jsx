import Search from "./components/Search";
import Home from "./pages/Home";
import SingleBook from "./pages/SingleBook";
import AuthForm from "./components/AuthForm";
import { Route, Routes } from "react-router-dom";
import UserProfile from "./components/UserProfile";
import { useSelector } from "react-redux";
import { useGetBooksQuery } from "./reducers/api";
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import AdminDashboard from "./components/Admin/AdminDashboard";
import ViewCart from "./pages/ViewCart";
import Checkout from "./pages/Checkout";
import jwtDecode from "jwt-decode";
import { useMeQuery } from "./reducers/authSlice";
import OrderHistory from "./pages/OrderHistory";

function App() {
  // const data = useSelector(state => state.data);
  const me = useSelector((state) => state.auth.credentials);
  const { data, isLoading, error } = useMeQuery(); //LOOK AT ME!!!!

  // console.log("app data", data);
  const storedToken = window.sessionStorage.getItem("credentials");
  let decodedToken = null;

  if (storedToken) {
    decodedToken = jwtDecode(storedToken);
  }

  console.log("decoded token", decodedToken);
  console.log("me in app", me);

  const books = useGetBooksQuery();
  const [load, setLoad] = useState(true);

  useEffect(() => {
    setLoad(books.isLoading);
  }, [books]);

  const loggedIn = decodedToken?.id;
  const isAdmin = decodedToken?.isAdmin;
  console.log("loggedIn/isadmin", { loggedIn, isAdmin });

  if (loggedIn && isAdmin) {
    console.log("logged in and admin");
    return (
      <>
        <h3>Logged In and Admin</h3>
        <Routes>
          {/* Public Routes */}
          <Route path="/home" element={<Home />} />
          <Route path="/search-results" element={<Search />} />
          <Route path={"/book/:id"} element={<SingleBook />} />
          <Route path={"/login"} element={<AuthForm />} />
          <Route path={"/cart"} element={<ViewCart />} />
          <Route path={"/orderhistory"} element={<OrderHistory />} />
          {/* Authenticated Routes */}
          <Route
            path="/checkout"
            element={loggedIn ? <Checkout /> : <Navigate to="/login" />}
          />
          <Route
            path={"/me"}
            element={loggedIn ? <UserProfile /> : <Navigate to="/login" />}
          />
          {/* <Route path="/submit" element={logginIn ? <Pay /> : <Navigate to="/login />"} /> */}
          <Route path={"/profile/:id"} element={<UserProfile />} />

          {/* Admin routes */}
          <Route
            path="/admin/*"
            element={isAdmin ? <AdminDashboard /> : <Navigate to="/login" />}
          />
          <Route path="/test" element={<AdminDashboard />} />

          {/* Fallback Route */}
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </>
    );
  }

  if (loggedIn) {
    console.log("only logged in");
    return (
      <>
        <h3>Only logged in!</h3>
        <Routes>
          {/* Public Routes */}
          <Route path="/home" element={<Home />} />
          <Route path="/search-results" element={<Search />} />
          <Route path={"/book/:id"} element={<SingleBook />} />
          <Route path={"/login"} element={<AuthForm />} />
          <Route path={"/cart"} element={<ViewCart />} />

          {/* Authenticated Routes */}
          <Route
            path="/checkout"
            element={loggedIn ? <Checkout /> : <Navigate to="/login" />}
          />
          <Route
            path={"/me"}
            element={loggedIn ? <UserProfile /> : <Navigate to="/login" />}
          />
          {/* <Route path="/submit" element={logginIn ? <Pay /> : <Navigate to="/login />"} /> */}
          <Route path={"/profile/:id"} element={<UserProfile />} />

          {/* Fallback Route */}
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </>
    );
  }
  console.log("i have no rights");
  return (
    <>
      <h3>I have no rights!</h3>
      <Routes>
        {/* Public Routes */}
        <Route path="/home" element={<Home />} />
        <Route path="/search-results" element={<Search />} />
        <Route path={"/book/:id"} element={<SingleBook />} />
        <Route path={"/login"} element={<AuthForm />} />
        <Route path={"/cart"} element={<ViewCart />} />
        {/* Fallback Route */}
        <Route path={"/me"} element={<UserProfile />} />
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </>
  );
}

export default App;
