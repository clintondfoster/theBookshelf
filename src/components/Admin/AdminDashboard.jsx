import React from "react";
import AdminNavBar from "./AdminNavBar";
import { Route, Routes } from "react-router-dom";
import Users from "./UserManagement/Users";
import Books from "./BookManagement/Books";

function AdminDashboard() {
  return (
    <div className="adminDash">
      <AdminNavBar />
      <Routes>
        <Route path="/usermanagement/users" element={<Users />} />
        <Route path="/bookmanagement/books" element={<Books />} />
      </Routes>
    </div>
  );
}

export default AdminDashboard;
