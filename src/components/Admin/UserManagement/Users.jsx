import { useState } from "react";
import UserSearchBar from "./UserSearchBar";
import UserList from "./UserList";
import AddUser from "./AddUser";
import {
  useGetUsersQuery,
  useDeleteUserMutation,
  useEditUserMutation,
} from "../../../reducers/api";
import { useMeQuery } from "../../../reducers/authSlice";

function Users() {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: users = [], isLoading, isError } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [editUser] = useEditUserMutation();

  console.log("In users - users", users);
  //meQuery for current user data
  const {
    data: currentUser,
    isError: isUserError,
    isLoading: isUserLoading,
  } = useMeQuery();

  console.log("currentuser in users", currentUser);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handlePromoteToAdmin = async (userId) => {
    const user = users.find((i) => i.id === userId);
    if (user) {
      const updatedUser = { ...user, isAdmin: !user.isAdmin }; //Toggle admin status
      try {
        await editUser(updatedUser).unwrap();
        alert(`${user.username} admin status updated!`);
      } catch (error) {
        alert(
          `Error updating admin status for ${user.username}: ${error.message}`
        );
      }
    }
  };

  const handleDelete = async (userId) => {
    try {
      await deleteUser(userId).unwrap();
      alert("User deleted successfully");
    } catch (error) {
      alert(`Error deleted user: ${error.message}`);
    }
  };

  if (isLoading) return <p>Loading users...</p>;
  if (isError) return <p>Error fetching users</p>;

  const filteredUser = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>User Dashboard</h2>
      <h3>Welcome {currentUser.firstName}</h3>
      {isUserLoading && <p>Loading current user's data...</p>}
      {isUserError && <p>Error fetching current user data.</p>}
      {currentUser && (
        <div>
          <p>First Name: {currentUser.firstName}</p>
          <p>Last Name: {currentUser.lastName}</p>
          <p>Email: {currentUser.email}</p>
          <p>Admin Status: {currentUser.isAdmin}</p>
        </div>
      )}
      ;
      <UserSearchBar onSearch={handleSearch} />
      <UserList
        users={filteredUser}
        onPromote={handlePromoteToAdmin}
        onDelete={handleDelete}
      />
      <AddUser />
    </div>
  );
}

export default Users;
