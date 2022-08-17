const router = require('express').Router()
const {
  register,
  login,
  logout,
  loadUser,
  getUserProfile,
} = require('../controllers/authController')
const { isAuthenticated } = require('../middleware/auth')

router.post('/register', register)

router.post('/login', login)

router.post('/logout', logout)

router.post('/loadUser', isAuthenticated, loadUser)

router.post('/userProfile/:id', isAuthenticated, getUserProfile)

module.exports = router
