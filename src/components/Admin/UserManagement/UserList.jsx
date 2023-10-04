import { Link } from 'react-router-dom';

const UserList = ({ users, onPromote, onDelete }) => {

    return (
        <div>
            {users.length === 0 ? (
                <h1>No Users Found</h1>
            ) : (
                users.map((user) => (
                    <div key={user.id}>
                        <Link to={`profile/${user.id}`}>
                            <h2>{user.firstName} {user.lastName}</h2>
                        </Link>
                        <h4>Username: {user.username}</h4>
                        <p>Email: {user.email}</p>
                        {user.admin && <p>Role: Admin</p>}
                        <button onClick={() => onPromote(user.id)}>Promote to Admin</button>
                        <button onClick={() => onDelete(user.id)}>Delete</button>
                    </div>
                ))
            )}
        </div>
    )
}

export default UserList;