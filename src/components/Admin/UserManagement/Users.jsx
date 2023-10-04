import { useState } from "react";
import UserSearchBar from "/.UserSearchBar";
import UserList from "./UserList";
import AddUser from "./AddUser";
import { useGetUsersQuery, useDeleteUserMutation, useEditUserMutation } from "../../../reducers/api";


function Users () {
    
    const [searchTerm, setSearchTerm] = useState('');
    const { data: users = [], isLoading, isError } = useGetUsersQuery();
    const [deleteUser] = useDeleteUserMutation();
    const [editUser] = useEditUserMutation();


    const handleSearch = (term) => {
        setSearchTerm(term);
    }

    const handlePromoteToAdmin = async (userId) => {
        const user = users.find(i => i.id === userId);
        if(user) {
            const updatedUser = { ...user, admin: !user.admin} //Toggle admin status
            try {
                await editUser(updatedUser).unwrap();
                alert(`${user.username} admin status updated!`);
            } catch (error) {
                alert(`Error updating admin status for ${user.username}: ${error.message}`)
            }
        }
    };

    const handleDelete = async (userId) => {
        try {
            await deleteUser(userId).unwrap();
            alert('User deleted successfully');
        } catch (error) {
            alert(`Error deleted user: ${error.message}`);
        }
    };  
    
 
    if (isLoading) return <p>Loading users...</p>;
    if (isError) return <p>Error fetching users</p>;

    const filteredUser = users.filter(user => 
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) 

    );
 
        return (
            <div>
                <UserSearchBar onSearch={handleSearch}/>
                <UserList
                    users={filteredUser}
                    onPromote={handlePromoteToAdmin}
                    onDelete={handleDelete}
                />
                <AddUser/>
            </div>
        )
        }

export default Users;