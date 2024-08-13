import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    taskName: {
        type: String,
        required: [true, "Provide name"],
    },
    taskDescription: {
        type: String,
    },
    creator: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    assignTo: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    priority: {
        type: String,
        default:"normal",
    },
    status: {
        type: String,
        default:"todo"
    },
    dueDate: {
        type: Date,
    },
    visibility:{
        type: String,
        default:"visible"
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

taskSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const Task = mongoose.models.Tasks || mongoose.model("Tasks", taskSchema);

export default Task;
