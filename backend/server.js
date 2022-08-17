// Load configuration from .env file
require('dotenv').config({ path: '.env.development' })
require('dotenv').config({ path: '.env.production' })
// run cron job
require('./cron-ping')

// Load Dependencies
const express = require('express')
const app = express()
const cors = require('cors')
const { connectDatabase } = require('./db')
const path = require('path')

// middleware's -- set up and configure the express framework

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// app.use(express.static(path.join(__dirname, '../client/build')))

// routes -- http://localhost:9002

app.use('/api/v1', require('./routes/authRoute'))
app.use('/api/v1', require('./routes/todoTaskRoute'))
app.use('/api/v1', require('./routes/reminderRoute'))

// connect database
connectDatabase()

// listhen server
const port =
  process.env.NODE_ENV === 'development'
    ? process.env.DEVELOPEMENT_SERVER_PORT
    : process.env.PRODUCTION_SERVER_PORT

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`)
})

// bcrypt cookie-parser cors dotenv express express-session jsonwebtoken moment-timezone mongoose node-cron nodemailer request uuid
