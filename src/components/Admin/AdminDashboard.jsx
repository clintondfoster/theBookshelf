import React from 'react';
import AdminNavBar from "./AdminNavBar";

function AdminDashboard() {
    return (
        <div>
            <AdminNavBar />
            <Switch>
                <Route path="/admin/usermanagement/users" component={Users} />
                <Route path="/admin/bookmanagement/books" component={BooksManagement} />
            </Switch>
        </div>
    );
}

export default AdminDashboard;