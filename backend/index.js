require("dotenv").config();

const config = require("./config.json");
const mongoose = require("mongoose");

mongoose.connect(config.connectionString)



const User = require("./models/user.model");
const Task = require("./models/task.model");

const express = require("express");
const cors = require("cors");
const app = express();

const jwt = require("jsonwebtoken");
const {authenticateToken} = require("./utilities");
const taskModel = require("./models/task.model");


app.use(express.json());

app.use(
    cors({
        origin: "*",
    })
);


app.get("/", (req, res) => {
    res.json({data: "hello"});
});

// Create Account
app.post("/create-account", async (req, res) => {

    const {fullName, email, password} = req.body;

    if(!fullName) {
        return res.status(400).json({ error: true, message: "Full Name is required"});
    }

    if(!email) {
        return res.status(400).json({ error: true, message: "Email is required"});
    }

    if(!password) {
        return res.status(400).json({ error: true, message: "Password is required"});
    }

    const isUser = await User.findOne({email:email});

    if(isUser) {
        return res.json({
            error: true,
            message: "User already exist",
        });
    }

    const user = new User({
        fullName,
        email,
        password,
    });

    await user.save();

    const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "36000m",
    });

    return res.json({
        error: false,
        user,
        accessToken,
        message: "Registration Successful"
    })
});

// Login Account
app.post("/login", async (req, res) =>{
    const {email, password} = req.body;

    if(!email) {
        return res.status(400).json({message: "Email is required"});
    }

    if(!password) {
        return res.status(400).json({message: "Password is required"});
    }

    const userInfo = await User.findOne({ email: email});

    if(!userInfo) {
        return res.status(400).json({message: "User not found"});
    }

    if(userInfo.email == email && userInfo.password == password){
        const user = {user: userInfo};
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "36000m",
        });

        return res.json({
            error:false,
            message: "Login Successful",
            email,
            accessToken,
        });
    } else {
        return res.status(400).json({
            error: true,
            message: "Invalid Credentials",
        })
    }
});

//Get User
app.get("/get-user", authenticateToken, async (req, res) =>{
    const { user } = req.user;

    const isUser = await User.findOne({ _id: user._id});

    if(!isUser){
        return res.sendStatus(401);
    }

    return res.json({
        user: {
            fullName: isUser.fullName, 
            email: isUser.email, 
            "_id": isUser._id, 
            createdOn: isUser.createdOn},
        message: "",
    });
});

//Add Task
app.post("/add-task", authenticateToken, async (req, res) =>{
    const {title, content, tags} = req.body;
    const {user} = req.user;

    if(!title) {
        return res.status(400).json({error:true, message: "Title is required"});
    }

    if(!content) {
        return res.status(400).json({error:true, message: "Content is required"});
    }
   
    try{

        const task = new Task({
            title,
            content,
            tags: tags || [],
            userId: user._id,
        });

        await task.save();

        return res.json({
            error: false,
            task,
            message: "Task added successfully"
        });
    } catch (error){
        return res.status(500).json({
            error: true,
            message: "Internal Server Error",
        });
    }
});

//Edit Task
app.put("/edit-task/:taskId", authenticateToken, async (req, res) => {
    const taskId = req.params.taskId;
    const {title, content, tags, isPinned} = req.body;
    const { user } = req.user;

    if(!title && !content && !tags){
        return res.status(400).json({error: true, message: "No Changes provided"});
    }

    try {
        const task = await Task.findOne({_id: taskId, userId: user._id});
        
        if(!task){
            return res.status(400).json({error: true, message: "Task not found"});
        }
        if(title) task.title = title;
        if(content) task.content = content;
        if(tags) task.tags = tags;
        if(isPinned) task.isPinned = isPinned;

        await task.save();

        return res.json({
            error: false,
            task,
            message: "Task updated successfully",
        });
        } catch (error){
            return res.status(500).json({
            error: true,
            message: "Internal Server Error",
        });
    }
});

//Get all Task
app.get("/get-all-tasks/", authenticateToken, async (req, res) => {
    const { user } = req.user;

    try {
        const tasks = await Task.find({userId: user._id}).sort({ isPinned: -1});

        return res.json({
            error: false,
            tasks,
            message: "All tasks retrieved successfully",
        })
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Internal Server Error;"
        });
    }
});

//Delete Task
app.delete("/delete-task/:taskId", authenticateToken, async (req, res) => {
    const taskId = req.params.taskId;
    const { user } = req.user;

    try {
        const task = await Task.findOne({_id: taskId, userId: user._id});

        if(!task) {
            return res.status(404).json({ error: true, message: "Task not found"});
        }


        await Task.deleteOne({_id: taskId, userId: user._id});

        return res.json({
            error: false,
            message: "Task deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Internal Server Error"
        });
    }
})

//Update isPinned Value
app.put("/update-task-pinned/:taskId", authenticateToken, async (req, res) => {
    const taskId = req.params.taskId;
    const { isPinned } = req.body;
    const { user } = req.user;


    try {
        const task = await Task.findOne({_id: taskId, userId: user._id});
        
        if(!task){
            return res.status(400).json({error: true, message: "Task not found"});
        }

        task.isPinned = isPinned;

        await task.save();

        return res.json({
            error: false,
            task,
            message: "Task updated successfully",
        });
        } catch (error){
            return res.status(500).json({
            error: true,
            message: "Internal Server Error",
        });
    }
});

app.listen(8000);

module.exports = app;