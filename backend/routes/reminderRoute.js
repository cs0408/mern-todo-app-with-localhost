const router = require('express').Router()
const {
  addReminderEvent,
  deleteReminderEvent,
  getUpcomingReminders,
  getCompletedReminders,
  getDeletedReminders,
  deleteUpcomingReminders,
  deleteCompletedReminders,
  deleteDeletedReminders,
  changeUpComingReminderflag,
  getCurrentReminders,
} = require('../controllers/reminderController')
const { isAuthenticated } = require('../middleware/auth')

// Add, Check Delete Task ==============================================================>
router.post('/reminder/add', isAuthenticated, addReminderEvent)

router.post('/reminder/delete/:id', isAuthenticated, deleteReminderEvent)

// Get Remaining, Completed, Deleted Task ===============================================>
router.post('/reminders/upcoming', isAuthenticated, getUpcomingReminders)

router.get('/reminders/upcoming/changeFlag', changeUpComingReminderflag)

router.post('/reminders/current', isAuthenticated, getCurrentReminders)

router.post('/reminders/complete', isAuthenticated, getCompletedReminders)

router.post('/reminders/delete', isAuthenticated, getDeletedReminders)

// delete all upcoming, Completed, Deleted reminders ============================================>
router.post(
  '/reminders/delete/upcoming',
  isAuthenticated,
  deleteUpcomingReminders
)

router.post(
  '/reminders/delete/completed',
  isAuthenticated,
  deleteCompletedReminders
)

router.post(
  '/reminders/delete/deleted',
  isAuthenticated,
  deleteDeletedReminders
)

module.exports = router
