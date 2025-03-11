const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const taskSchema = new Schema({
    title: {type: String, required: true},
    content: {type: String, requied:true},
    tags: {type: [String], default: []},
    isPinned: {type: Boolean, default: false},
    userId: {type:String, required: true},
    createdOn: {type: Date, default: new Date().getTime() },
    dueDate: {type: Date, default: new Date().getTime() }
});

module.exports = mongoose.model("Task", taskSchema);