const express = require('express');
const router = express.Router();
const { getMachines } = require('../Database/machineDb'); // Import the database

// Get all machines (GET REQUEST)
router.get('/', async (req, res) => {
    try {
        const machines = await getMachines(); // Call db function
        res.json(machines);
    } catch (err) {
        res.status(500), json({ error: err.message });
    }
});

// Add more routes as needed for creating/updating/deleting

module.exports = router;