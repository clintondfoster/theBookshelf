import { Link } from "react-router-dom";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
  useEditUserMutation,
} from "../../../reducers/api";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

const UserList = ({ users, onPromote, onDelete }) => {
  const { refetch } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      refetch(); // Refresh the list after deletion
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div>
      {users.length === 0 ? (
        <h1>No Users Found</h1>
      ) : (
        users.map((user) => (
          <Card key={user.id} className="mb-3">
            <Card.Header className="font-weight-bold">
              {user.firstName} {user.lastName}
            </Card.Header>
            <Card.Body>
              <Card.Text>Username: {user.username}</Card.Text>
              <Card.Text>Email: {user.email}</Card.Text>
              <Card.Text>
                Address: {user.streetAddress}, {user.city}, {user.state}{" "}
                {user.zipCode}
              </Card.Text>
              <Card.Text>Status: {user.isAdmin ? "Admin" : "User"}</Card.Text>
              <ButtonGroup>
                {/* <Button variant="warning" onClick={() => onPromote(user.id)}>
                  Toggle Admin
                </Button> */}
                <Button variant="danger" onClick={() => handleDelete(user.id)}>
                  Delete User
                </Button>
              </ButtonGroup>
            </Card.Body>
          </Card>
        ))
      )}
    </div>
  );
};

export default UserList;
