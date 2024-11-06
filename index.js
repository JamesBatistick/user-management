const express = require('express');
const cors = require('cors'); //Ensure CORS is imported
const { db, addUser } = require('./Database/db'); //Import addUser
const app = express();
const PORT = 3000;

console.log('Starting server...');


app.use(cors()); //Enable CORS
app.use(express.json()); //Middleware to parese JSON bodies

//Home Route
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// GET Users
app.get('/users', (req, res) => {
    db.all(`SELECT * FROM users`, [], (err, rows) => {
        if (err) {
            return res.status(500).send('An error occurred while fetching users');
        }
        res.json(rows); // Respond with the array of users
    });
});

// DELETE users
app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    db.run(`DELETE FROM users WHERE id = ?`, [id], function (err) {
        if (err) {
            return res.status(500).send('An error occured while deleting user');
        }
        res.status(204).send(); // Send no content response on success
    });
});


// POST Users
app.post('/add-user', (req, res) => {
    const { name, email } = req.body;
    console.log(`Received user: ${name}, ${email}`); // Log the incoming data
    addUser(name, email, (err, id) => {
        if (err) {
            console.error('Database insert error:', err.message);
            return res.status(400).send('An error occurred: ' + err.message);
        }
        res.json({ id }); // Respond with the ID of the new user
    });
});

//Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


