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
  const [isAdmin, setIsAdmin] = useState(false);

  const { id } = useParams();
  const { data: userData, isLoading, isError } = useMeQuery();
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
      setIsAdmin(userData.admin || false);
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
        phone,
        admin: isAdmin,
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
    return (
      <div>
        Error loading your profile: {isError.message}. Please try again later.
      </div>
    );
  }

  const displayName = userData.firstName || userData.username;

  const isUserDataIncomplete = (data) => {
    const checkProps = [
      "email",
      "phone",
      "city",
      "firstName",
      "lastName",
      "state",
      "streetAddress",
      "zipCode",
    ];

    return checkProps.some((prop) => !data[prop]);
  };

  return (
    <div>
      <h2>Update your profile</h2>
      <h3>Welcome {displayName},</h3>

      <div className="user-info">
        <h2>
          {isUserDataIncomplete(userData)
            ? "Update Your Profile Below"
            : "Your Profile"}
        </h2>
        {userData.firstName && (
          <p>
            <strong>First Name:</strong> {userData.firstName}
          </p>
        )}
        {userData.lastName && (
          <p>
            <strong>Last Name:</strong> {userData.lastName}
          </p>
        )}
        {userData.email && (
          <p>
            <strong>Email:</strong> {userData.email}
          </p>
        )}
        {userData.streetAddress && (
          <p>
            <strong>Street Address:</strong> {userData.streetAddress}
          </p>
        )}
        {userData.city && (
          <p>
            <strong>City:</strong> {userData.city}
          </p>
        )}
        {userData.state && (
          <p>
            <strong>State:</strong> {userData.state}
          </p>
        )}
        {userData.zipCode && (
          <p>
            <strong>Zip Code:</strong> {userData.zipCode}
          </p>
        )}
        {userData.phone && (
          <p>
            <strong>Phone:</strong> {userData.phone}
          </p>
        )}
        {userData.admin && (
          <p>
            <strong>Admin:</strong> Yes
          </p>
        )}
      </div>

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
        {userData.admin && (
          <label>
            Admin:
            <input
              type="checkbox"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
            />
          </label>
        )}
        <button type="submit" disabled={isSaving}>
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default UserProfile;
