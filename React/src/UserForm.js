import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

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
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    isInvalid={!!error}
                />
            </Form.Group>

            <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    isInvalid={!!error}
                />
                <Form.Control.Feedback type="invalid">
                    {error}
                    {emailError}
                </Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit">
                Add User
            </Button>
        </Form>

    );
};

export default UserForm;
