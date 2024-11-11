import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';

const UserList = ({ users, setUsers }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Handle delete user
    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/api/users/${id}`, {
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
        // Fetch users from the server
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/users'); // Ensure this endpoint is correct
                if (!response.ok) {
                    throw new Error('Failed to fetch users');
                }
                const data = await response.json();
                setUsers(data); // Set users from the server response
            } catch (err) {
                console.error(err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers(); // Fetch users when the component mounts
    }, [setUsers]);

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <h2>User List</h2>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length === 0 ? (
                        <tr>
                            <td colspan="4" classname="text-center">
                                No users found
                            </td>
                        </tr>
                    ) : (
                        users.map((user, index) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    <Button
                                        variant="danger"
                                        onClick={() => handleDelete(user.id)}
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </Table>
        </div>
    );
};

export default UserList;
