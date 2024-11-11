const express = require('express');
const router = express.Router();
const { getUsers, getUserById, createUser, deleteUser, emailExists } = require('../Database/usersDb'); // Import the database

// GET Users
router.get('/', async (req, res) => {
    try {
        const users = await getUsers(); // Fetch all users
        res.json(users); // Send the users as a response

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const user = await getUserById(id); // Fetch user by ID
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create a new user (POST)
router.post('/', async (req, res) => {
    const {name, email } = req.body;
    try {
        const newUser = await createUser(name, email); // Create new user
        res.status(201).json(newUser); // Return the created user
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete a user by ID (DELETE request)
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await deleteUser(id);  // Delete user by ID
        res.json(result);  // Return a success message
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/emailExists', async (req, res) => {
    try {
        const emailResult = await emailExists(); // Call db function
        res.json(emailResult);
    } catch (err) {
        res.status(500), json({ error: err.message });
    }
});
// Add more routes as needed for creating/updating/deleting

module.exports = router;