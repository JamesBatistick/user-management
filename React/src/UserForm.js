import React, { useState } from 'react';

const UserForm = ({ setUsers }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [emailError, setEmailError] = useState('');

    const validateEmailFormat = (email) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    };

    const handleEmailChange = (e) => {
        const inputEmail = e.target.value;
        setEmail(inputEmail);
        setEmailError('') // Clear email error while typing
    };

    const handleEmailBlur = () => {
        if (!validateEmailFormat(email)) {
            setEmailError('Please enter a valid email address');
        } else {
            setEmailError('');
        }
    }

    const validateForm = () => {
        setError('');
        setEmailError('');

        if (!name) {
            setError('Name is required');
            return false;
        } else if (name.length < 3) {
            setError('Name must be at least 3 characters long');
            return false;
        }

        if (!email) {
            setEmailError('Email is required');
            return false;
        } else if (!validateEmailFormat(email)) {
            setEmailError('Please enter a valid email address');
            return false;
        }

        return true;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        const response = await fetch('http://localhost:3000/add-user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email }),
        });

        if (response.ok) {
            const data = await response.json();
            alert(`User added successfully with ID: ${data.id}`);
            setUsers(prevUsers => [...prevUsers, { id: data.id, name, email }]); // Add new user to the list
            setName(''); // Reset form fields
            setEmail('');
        } else {
            const errorMessage = await response.text();
            alert(errorMessage);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </label>
            <br />
            <label>
                Email:
                <input 
                    type="email" 
                    value={email} 
                    onChange={handleEmailChange} 
                    onBlur={handleEmailBlur} // Add the blur event handler
                    required />
                {emailError && <p style={{ color: 'red' }}>{emailError}</p>}
            </label>
            <br />
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button type="submit">Add User</button>
        </form>
    );
};

export default UserForm;
