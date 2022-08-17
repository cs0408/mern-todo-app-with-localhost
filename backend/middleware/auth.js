const Users = require('../models/userModel')
const jwt = require('jsonwebtoken')

exports.isAuthenticated = async (req, res, next) => {
  try {
    const { token } = req.body
    if (!token) {
      return res.status(200).json({
        message: 'Please Login Now',
      })
    }

    const secret_key =
      process.env.NODE_ENV === 'development'
        ? process.env.DEVELOPEMENT_SECRET_KEY
        : process.env.PRODUCTION_SECRET_KEY

    const decoded = await jwt.verify(token, secret_key)

    req.user = await Users.findById(decoded._id)

    next()
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}
