import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";

function AdminNavBar() {
    return (
        <Navbar expand="lg" bg="primary" variant="dark">
            <Container fluid>
                <Navbar.Brand><div className="logo">Admin Dashboard</div></Navbar.Brand>
                <Navbar.Toggle aria-controls="adminNavbar" />
                <Navbar.Collapse id="adminNavbar">
                    <Nav className="me-auto">
                        <Nav.Link>
                            <Link to="/admin/usermanagement">Manage Users</Link>
                        </Nav.Link>
                        <Nav.Link>
                            <Link to="/admin/bookmanagement">Manage Books</Link>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default AdminNavBar;