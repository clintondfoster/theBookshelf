import { useState } from "react";
import TextInput from "./inputs/TextInput";
import { useEditUserMutation } from "../reducers/api";
import { useMeQuery } from "../reducers/authSlice";
import { useParams } from "react-router-dom";

function UserProfile() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
    phone: "",
  });
  const [isUpdated, setIsUpdated] = useState(false);

  const { id } = useParams();
  const { data: userData, isLoading, isError, refetch } = useMeQuery();
  const [editUser, { isLoading: isSaving }] = useEditUserMutation();

  const resetFields = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      streetAddress: "",
      city: "",
      state: "",
      zipCode: "",
      phone: "",
    });
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {
      id: userData.id,
      ...formData,
      isAdmin: userData.isAdmin,
    };

    Object.keys(updatedData).forEach(
      (key) => !updatedData[key] && delete updatedData[key]
    );

    try {
      await editUser(updatedData).unwrap();
      refetch();
      setIsUpdated(true);
      resetFields();
      setTimeout(() => {
        setIsUpdated(false);
      }, 3000);
    } catch (error) {
      alert(`Error updating profile: ${error.message}`);
    }
  };

  if (isLoading) return <div>Loading your profile...</div>;
  if (isError)
    return <div>Error loading your profile. Please try again later.</div>;

  const displayName = userData.firstName || userData.username;

  return (
    <div className="content" style={{
      margin: '5px'
    }}>
      <h1> My Account</h1>
      <h3 style={{color:'SeaGreen'}}>Welcome back {displayName}!</h3>
      {userData && (
        <div  className="user-info">
          <h5  style={{color:'RoyalBlue'}}>
            {formData.firstName || userData.firstName
              ? "Your Profile Information"
              : "Update Your Profile Below"}
          </h5>
          {isUpdated && <p>Your profile updated successfully!</p>}
          <p>
            <strong>First Name:</strong> {userData.firstName}
          </p>
          <p>
            <strong>Last Name:</strong> {userData.lastName}
          </p>
          <p>
            <strong>Email:</strong> {userData.email}
          </p>
          <p>
            <strong>Street Address:</strong> {userData.streetAddress}
          </p>
          <p>
            <strong>City:</strong> {userData.city}
          </p>
          <p>
            <strong>State:</strong> {userData.state}
          </p>
          <p>
            <strong>Zip Code:</strong> {userData.zipCode}
          </p>
          <p>
            <strong>Phone:</strong> {userData.phone}
          </p>
          {userData.isAdmin && (
            <p>
              <strong>Status:</strong> Admin
            </p>
          )}
          {!userData.isAdmin && (
            <p>
              <strong>Status:</strong> User
            </p>
          )}
        </div>
      )}

      <form onSubmit={handleSubmit}> 
      <h4 style={{color:'RoyalBlue'}}> Update Your Information</h4>
        <label>
          First Name
          <TextInput
            vl={formData.firstName}
            chg={(val) => handleInputChange("firstName", val)}
          />
        </label>
        <label>
          Last Name
          <TextInput
            vl={formData.lastName}
            chg={(val) => handleInputChange("lastName", val)}
          />
        </label>
        <label>
          Email
          <TextInput
            vl={formData.email}
            chg={(val) => handleInputChange("email", val)}
          />
        </label>
        <label>
          Street Address
          <TextInput
            vl={formData.streetAddress}
            chg={(val) => handleInputChange("streetAddress", val)}
          />
        </label>
        <label>
          City
          <TextInput
            vl={formData.city}
            chg={(val) => handleInputChange("city", val)}
          />
        </label>
        <label>
          State
          <TextInput
            vl={formData.state}
            chg={(val) => handleInputChange("state", val)}
          />
        </label>
        <label>
          Zip Code
          <TextInput
            vl={formData.zipCode}
            chg={(val) => handleInputChange("zipCode", val)}
          />
        </label>
        <label>
          Phone
          <TextInput
            vl={formData.phone}
            chg={(val) => handleInputChange("phone", val)}
          />
        </label>
        <button type="submit" disabled={isSaving}>
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default UserProfile;
