import { Link } from "react-router-dom";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
  useEditUserMutation,
} from "../../../reducers/api";

const UserList = ({ users, onPromote }) => {
  const { refetch } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const onDelete = async (id) => {
    await deleteUser(id)
      .then(() => {
        console.log("delete");
      })
      .then(() => refetch())
      .catch(() => {
        console.log("error");
      });
  };

  return (
    <div>
      {users.length === 0 ? (
        <h1>No Users Found</h1>
      ) : (
        users.map((user) => (
          <div key={user.id}>
            <h2 style={{ marginTop: "10px", color:'royalblue' }}>
              {user.firstName} {user.lastName}
            </h2>

            <h5 style={{  color:'LightSeaGreen' }}>Username: {user.username}</h5>
            <p style={{  color:'CadetBlue' }}>Email: {user.email}</p>
            {user.admin && <p>Role: Admin</p>}
            <button onClick={() => onDelete(user.id)}>Delete User</button>
          </div>
        ))
      )}
    </div>
  );
};

export default UserList;
