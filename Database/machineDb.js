const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.join(__dirname, 'structure', 'machine.db');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
    } else {
        console.log('Connected to the MACHINES database.');
    }
});

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS machines (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        type TEXT NOT NULL,
        status TEXT CHECK(status IN ('ACTIVE', 'INACTIVE')) NOT NULL
        )
    `);

    // Check if table is empty for loading
    db.get("SELECT COUNT(*) as count FROM machines", (err, row) => {
        if (err){
            console.error(err);
            return;
        }

        // If count is 0, insert default data
        if (row.count === 0) {
            const stmt = db.prepare("INSERT INTO machines (name, type, status) VALUES (?,?,?)");
            
            stmt.run("Machine A", "Type1", "ACTIVE");
            stmt.run("Maching B", "Type1", "ACTIVE");
            stmt.run("Maching C", "Type2", "ACTIVE");
            stmt.run("Maching D", "Type2", "INACTIVE");
            stmt.run("Maching E", "Type2", "INACTIVE");
            stmt.finalize();
        }
        
    })
});

const getMachines = () => {
    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM machines", [], (err, rows) => {
            if (err) {
                reject(err);
            }
            resolve(rows); // Resolve the promise with the rows from the query
        });
    });
};

// Other database functions (insert, update, delete)

module.export = {
    getMachines,
};
