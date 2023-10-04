import { useState } from 'react';
import { useAddUserMutation } from '../../../reducers/api';
import TextInput from '../../inputs/TextInput';

function AddUser( { onAdd }) {
    
    const initialFormData = {
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
    }
    
    const [userData, setUserData] = useState(initialFormData)

    const[addUser, { isLoading, isError, isSuccess, error }] = useAddUserMutation();


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addUser(userData).unwrap();
            setUserData(initialFormData);
        } catch {}
    };

    return (
        <div>
            <h2>Add User</h2>
            {isSuccess && <div>User added successfully!</div>}
            {isError && <div>Error adding user: {error.message}</div>}
            <form onSubmit={handleSubmit}>
                <TextInput type="text" vl={userData.firstName} chg={value => setUserData(prevState => ({...prevState, firstName: value}))} 
                    placeholder="First Name"
                />
                <TextInput type="text" vl={userData.lastName} chg={value => setUserData(prevState => ({...prevState, lastName: value}))} 
                    placeholder="Last Name"
                />
                <TextInput type="text" vl={userData.username} chg={value => setUserData(prevState => ({...prevState, username: value}))} 
                    placeholder="Username"
                />
                <TextInput type="text" vl={userData.email} chg={value => setUserData(prevState => ({...prevState, email: value}))} 
                    placeholder="Email"
                />
                <TextInput type="text" vl={userData.password} chg={value => setUserData(prevState => ({...prevState, password: value}))} 
                    placeholder="Default Password"
                />
                <button type="submit" disabled={isLoading}>Add User</button>
            </form>
        </div>
    )
}

export default AddUser;