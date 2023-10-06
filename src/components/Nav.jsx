import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { showResult } from "../reducers/searchSlice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLogoutMutation } from "../reducers/authSlice";
import { useMeQuery } from "../reducers/authSlice";

function NavBar() {
  const [searchInput, setSearchInput] = useState("");
  console.log(searchInput);

  // const user = useSelector((state) => state.auth.credentials.user || "");
  // const { data: currentUser, isLoading } = useMeQuery();



  const user = useSelector((state)=> state.auth.credentials || "")


  const [logout] = useLogoutMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const input = (e) => {
    setSearchInput(e.target.value);
  };

  const searchButton = (e) => {
    e.preventDefault();
    dispatch(showResult(searchInput));
    navigate(`/search-results?q=${searchInput}`);
  };

  const homeClick = () => {
    navigate("/home");
  };

  const cartClick = () => {
    navigate("/cart");
  };

  const accountClick = () => {
    navigate("/me");
  };

  const adminNavClick = () => {
    navigate("/admin");
  };
  const loginClick = () => {
    navigate("/login");
  };
  const orderClick = () => {
    navigate("/orderhistory");
  };

  return (
    <Navbar expand="lg" bg="dark" variant="dark">
      <Container fluid>
        <Navbar.Brand onClick={homeClick}>
          <div className="logo">The Bookshelf</div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                onChange={(e) => input(e)}
              />
              <Button variant="outline-success" onClick={searchButton}>
                Search
              </Button>
            </Form>
            <Nav.Link onClick={cartClick}>My Cart</Nav.Link>
            <Nav.Link onClick={accountClick}>My Account</Nav.Link>
            <Nav.Link onClick={loginClick}>Login</Nav.Link>
            {currentUser.isAdmin && (
              <Nav.Link onClick={adminNavClick}>Admin Dashboard</Nav.Link>
            )}
            ;<Nav.Link onClick={orderClick}>My Order</Nav.Link>
            <div>
              {user.token && <h1>Welcome {user.userId}</h1>}
              {user.token && <button onClick={logout}>Logout</button>}
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
