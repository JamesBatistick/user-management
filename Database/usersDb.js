const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.join(__dirname, 'structure', 'users.db');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            email TEXT
        )
    `);
});

// Function to get all users
const getUsers = () => {
    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM users", [], (err, rows) => {
            if (err) {
                reject(err);
            }
            resolve(rows); // Resolve with the rows (users)
        });
    });
};

// Function to get a single user by ID
const getUserById = (id) => {
    return new Promise((resolve, reject) => {
        db.get("SELECT * FROM users WHERE id = ?", [id], (err, row) => {
            if (err) {
                reject(err);
            }
            resolve(row); // Resolve with the single user
        });
    });
};

// Function to create a new user
const createUser = (name, email) => {
    return new Promise((resolve, reject) => {
        const stmt = db.prepare("INSERT INTO users (name, email) VALUES (?, ?)");
        stmt.run(name, email, function (err) {
            if (err) {
                reject(err);
            }
            resolve({ id: this.lastID, name, email }); // Return the inserted user data
        });
        stmt.finalize();
    });
};

// Function to delete a user by ID
const deleteUser = (id) => {
    return new Promise((resolve, reject) => {
        db.run("DELETE FROM users WHERE id = ?", [id], function (err) {
            if (err) {
                reject(err);
            }
            resolve({ message: 'User deleted', id });
        });
    });
};

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

module.exports = {
    getUsers,
    getUserById,
    createUser,
    addUser,
    deleteUser,
    emailExists,
};