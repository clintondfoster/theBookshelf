import { useState, useEffect } from "react";
import TextInput from "./inputs/TextInput";
import { useEditUserMutation } from "../reducers/api";
import { useMeQuery } from "../reducers/authSlice";
import { useParams } from "react-router-dom";



function UserProfile() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [streetAddress, setStreetAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [phone, setPhone] = useState("");

    const { id } = useParams();
    const {data: userData, isLoading, isError } = useMeQuery();
    const [editUser, { isLoading: isSaving }] = useEditUserMutation();

    useEffect(() => {
        if (userData) {
            setFirstName(userData.firstName || "");
            setLastName(userData.lastName || "");
            setEmail(userData.email || "");
            setStreetAddress(userData.streetAddress || "");
            setCity(userData.city || "");
            setState(userData.state || "");
            setZipCode(userData.zipCode || "");
            setPhone(userData.phone || "");

        }
    }, [userData]);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedData = {
                id: userData.id,
                firstName,
                lastName,
                email,
                streetAddress,
                city,
                state,
                zipCode,
                phone
            };

            await editUser(updatedData).unwrap();
            alert("Profile updated successfully");
        } catch (error) {
            alert(`Error updating profile: ${error.message}`);
        }
    };

    if (isLoading) {
        return <div>Loading your profile...</div>;
    }

    if (isError) {
        return <div>Error loading your profile: {isError.message}. Please try again later.</div>
    }

    const displayName = userData.firstName || userData.username;

    return (
        <div>
            
            <h2>Update your profile</h2>
            <h3>Welcome {displayName},</h3>
                <form onSubmit={handleSubmit}>
                    <label>
                        First Name
                        <TextInput vl={firstName} chg={setFirstName} />
                    </label>
                    <label>
                        Last Name
                        <TextInput vl={lastName} chg={setLastName} />
                    </label>
                    <label>
                        Email
                        <TextInput vl={email} chg={setEmail} />
                    </label>
                    <label>
                        Street Address
                        <TextInput vl={streetAddress} chg={setStreetAddress} />
                    </label>
                    <label>
                        City
                        <TextInput vl={city} chg={setCity} />
                    </label>
                    <label>
                        State
                        <TextInput vl={state} chg={setState} />
                    </label>
                    <label>
                        Zip Code
                        <TextInput vl={zipCode} chg={setZipCode} />
                    </label>
                    <label>
                        Phone
                        <TextInput vl={phone} chg={setPhone} />
                    </label>
                        <button type="submit" disabled={isSaving}>
                        Save Changes
                        </button>
                </form>
        </div>
    )
}

export default UserProfile;
