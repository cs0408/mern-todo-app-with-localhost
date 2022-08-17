const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  avatar: {
    public_id: String,
    url: String,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  remainingTodoTasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'TodoTask',
    },
  ],
  completedTodoTasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'TodoTask',
    },
  ],
  deletedTodoTasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'TodoTask',
    },
  ],
  upcomingReminderEvents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ReminderEvent',
    },
  ],
  completedReminderEvents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ReminderEvent',
    },
  ],
  deletedReminderEvents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ReminderEvent',
    },
  ],
  // verified: Boolean,

  //   resetPasswordToken: String,
  //   resetPasswordExpire: Date,
})

// when the schema is saved, then this function will run first - if password field is changed
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10)
  }

  next()
})

// match password function
userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password)
}

// generate token
userSchema.methods.generateToken = async function () {
  const secret_key =
    process.env.NODE_ENV === 'development'
      ? process.env.DEVELOPEMENT_SECRET_KEY
      : process.env.PRODUCTION_SECRET_KEY

  return jwt.sign({ _id: this._id }, secret_key)
}

// // generate token for reset password --- video time: 32:00
// userSchema.methods.generateResetPasswordToken = async function () {
//   const resetToken = crypto.randomBytes(22).toString('hex')

//   this.resetPasswordToken = crypto
//     .createHash('sha256')
//     .update(resetToken)
//     .digest('hex')

//   this.resetPasswordExpire = Date.now() + 10 * 60 * 1000

//   return resetToken
// }

module.exports = mongoose.model('User', userSchema)
