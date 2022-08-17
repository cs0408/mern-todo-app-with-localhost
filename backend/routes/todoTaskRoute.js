const router = require('express').Router()
const {
  addTodoTask,
  checkTodoTask,
  deleteTodoTask,
  getDeletedTodoTasks,
  deleteRemainingTodoTasks,
  deleteDeletedTodoTasks,
  deleteCompletedTodoTasks,
  getRemainingTodoTasks,
  getCompletedTodoTasks,
  deleteRemainingPreviousTodoTasks,
} = require('../controllers/todoTaskController')
const { isAuthenticated } = require('../middleware/auth')

// Add, Check Delete Task ==============================================================>
router.post('/todo/task/add', isAuthenticated, addTodoTask)

router.post('/todo/task/complete/:id', isAuthenticated, checkTodoTask)

router.post('/todo/task/delete/:id', isAuthenticated, deleteTodoTask)

// Get Remaining, Completed, Deleted Task ===============================================>
router.post('/todo/remaining/tasks', isAuthenticated, getRemainingTodoTasks)

router.post('/todo/complete/tasks', isAuthenticated, getCompletedTodoTasks)

router.post('/todo/delete/tasks', isAuthenticated, getDeletedTodoTasks)

// delete all Remaining, Completed, Deleted Task ============================================>
router.post(
  '/todo/delete/remaining/tasks',
  isAuthenticated,
  deleteRemainingTodoTasks
)

router.get(
  '/todo/delete/remaining/previous-dates-tasks',
  deleteRemainingPreviousTodoTasks
)

router.post(
  '/todo/delete/complete/tasks',
  isAuthenticated,
  deleteCompletedTodoTasks
)

router.post(
  '/todo/delete/delete/tasks',
  isAuthenticated,
  deleteDeletedTodoTasks
)

module.exports = router
