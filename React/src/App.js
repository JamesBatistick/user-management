import React, { useState } from 'react';
import UserForm from './UserForm';
import UserList from './UserList';

function App() {
    const [users, setUsers] = useState([]); // State to hold users

    return (
        <div>
            <h1>User Registration</h1>
            <UserForm setUsers={setUsers} /> {/* Pass setUsers to UserForm */}
            <UserList users={users} setUsers={setUsers} /> {/* Pass users and setUsers to UserList */}
        </div>
    );
}

export default App;
