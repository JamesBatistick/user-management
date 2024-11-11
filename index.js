const express = require('express');
const cors = require('cors'); //Ensure CORS is imported
const userRouter = require('./Routes/users'); // Import user routes
const machinesRouter = require('./Routes/machines'); // Import the machines routes
const app = express();
const PORT = 3000;

console.log('Starting server...');


app.use(cors()); //Enable CORS
app.use(express.json()); //Middleware to parse JSON bodies

//Home Route
app.get('/', (req, res) => {
    res.send('Hello, World!');
});



//Machines
app.use('/api/machines', machinesRouter);
app.use('/api/users', userRouter);

//Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


