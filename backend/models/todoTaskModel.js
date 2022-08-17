const mongoose = require('mongoose')

const todoTaskSchema = new mongoose.Schema({
  taskTitle: {
    type: String,
    required: [true, 'Task title is required.'],
    trim: true,
    minlength: [5, "Task length should not be less than 5 character's"],
    maxlength: [50, "Task length should not be greater than 50 character's."],
  },
  taskDate: {
    type: Date,
    default: Date.now,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  completedAt: {
    type: Date,
    default: null,
  },
  deletedAt: {
    type: Date,
    default: null,
  },
})

module.exports = mongoose.model('TodoTask', todoTaskSchema)
