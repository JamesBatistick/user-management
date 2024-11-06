import React, { useEffect, useState } from 'react';

const UserList = ({ users, setUsers }) => {
    const [error, setError] = useState('');

    // Fetch users from the server
    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:3000/users'); // Ensure this endpoint is correct
            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }
            const data = await response.json();
            setUsers(data); // Set users from the server response
        } catch (err) {
            setError(err.message);
        }
    };

    // Handle delete user
    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/users/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete user');
            }
            // Update the users list after deletion
            setUsers(prevUsers => prevUsers.filter(user => user.id !== id)); // Update state
        } catch (err) {
            setError(err.message);
        }
    };

    useEffect(() => {
        fetchUsers(); // Fetch users when the component mounts
    }, []);

    return (
        <div>
            <h2>User List</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        {user.name} - {user.email}
                        <button onClick={() => handleDelete(user.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;
