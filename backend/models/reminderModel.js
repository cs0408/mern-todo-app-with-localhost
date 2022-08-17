const mongoose = require('mongoose')

const reminderSchema = new mongoose.Schema({
  subTitle: {
    type: String,
    required: [true, 'Event sub title is required.'],
    maxlength: 50,
  },
  title: {
    type: String,
    required: [true, 'Event title required.'],
    maxlength: 50,
  },
  eventDate: {
    type: Date,
    required: [true, 'Event date is required.'],
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
  showReminder: {
    type: Boolean,
    default: false,
  },
})

module.exports = mongoose.model('ReminderEvent', reminderSchema)
