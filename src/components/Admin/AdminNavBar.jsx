import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";

function AdminNavBar() {
  return (
    <Navbar expand="lg" bg="dark" variant="dark">
      <Container fluid>
        <Navbar.Brand as={Link} to="/admin">
          Admin Dashboard
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="adminNavbar" />
        <Navbar.Collapse id="adminNavbar">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/admin/usermanagement/users">
              Manage Users
            </Nav.Link>
            <Nav.Link as={Link} to="/admin/bookmanagement/books">
              Manage Books
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AdminNavBar;
