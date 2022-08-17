import { configureStore } from '@reduxjs/toolkit'
import { userProfileReducer, userReducer } from './Reducers/authReducer'
import {
  addDeleteUpdateReminderReducer,
  getCurrentRemindersReducers,
  getRemindersReducer,
} from './Reducers/reminderReducer'
import {
  addDeleteUpdateTodoTasksReducer,
  getTodoTasksReducer,
} from './Reducers/todoTaskReducer'

const store = configureStore({
  reducer: {
    auth: userReducer,
    userProfile: userProfileReducer,
    addDeleteUpdateTasks: addDeleteUpdateTodoTasksReducer,
    getTodoTasks: getTodoTasksReducer,
    addDeleteUpdateReminder: addDeleteUpdateReminderReducer,
    getReminders: getRemindersReducer,
    getCurrentReminders: getCurrentRemindersReducers,
  },
})

export default store
