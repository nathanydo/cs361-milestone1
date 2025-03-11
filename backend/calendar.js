const express = require('express');
const config = require("./config.json");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const Task = require('./models/task.model');

const app = express();
const port = 8040;

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Enable CORS

// Database connection
mongoose.connect(config.connectionString);


app.get("/", (req, res) => {
    res.json({data: " Calendar services working"});
});
// Routes
app.get('/get-all-tasks', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json({ tasks });
    } catch (error) {
        res.status(500).json({ message: 'An unexpected error occurred. Please try again' });
    }
});

app.listen(port, () => {
    console.log(`Calendar microservice is running on port: ${port}`);
});