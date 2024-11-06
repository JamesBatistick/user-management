const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./users.db', (err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

// Create a users table if it doesn't exist
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            email TEXT
        )
    `);
});

// Function to add a user
const addUser = (name, email, callback) => {
    emailExists(email, (err, existingUser) => {
      if (err) {
        return callback(err);
      }  
      if (existingUser) {
        return callback(new Error('Email already exists')); // Return error if email exists
      }
        db.run(`INSERT INTO users (name, email) VALUES (?, ?)`, [name, email], function (err) {
            callback(err, this.lastID); // Return the last inserted ID
        });
    });
};

// Function to check if email exists
const emailExists = (email, callback) => {
    db.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
        if (err) {
            return callback(err);
        }
        callback(null, row); // Return the row if found
    });
};

module.exports = { db, addUser }; // Ensure this line is present
