import { createReducer } from '@reduxjs/toolkit'

const initialState = {}

export const addDeleteUpdateTodoTasksReducer = createReducer(initialState, {
  // add task
  addTaskRequest: (state) => {
    state.loading = true
  },
  addTaskSuccess: (state, action) => {
    state.loading = false
    state.message = action.payload
  },
  addTaskFailure: (state, action) => {
    state.loading = false
    state.error = action.payload
  },

  // check task
  checkTaskRequest: (state) => {
    state.loading = true
  },
  checkTaskSuccess: (state, action) => {
    state.loading = false
    state.message = action.payload
  },
  checkTaskFailure: (state, action) => {
    state.loading = false
    state.error = action.payload
  },

  // delete task
  deleteTaskRequest: (state) => {
    state.loading = true
  },
  deleteTaskSuccess: (state, action) => {
    state.loading = false
    state.message = action.payload
  },
  deleteTaskFailure: (state, action) => {
    state.loading = false
    state.error = action.payload
  },

  //   delete all remainig task
  deleteRemainingTasksRequest: (state) => {
    state.loading = true
  },
  deleteRemainingTasksSuccess: (state, action) => {
    state.loading = false
    state.message = action.payload
  },
  deleteRemainingTasksFailure: (state, action) => {
    state.loading = false
    state.error = action.payload
  },

  //   delete all completed task
  deleteCompletedTasksRequest: (state) => {
    state.loading = true
  },
  deleteCompletedTasksSuccess: (state, action) => {
    state.loading = false
    state.message = action.payload
  },
  deleteCompletedTasksFailure: (state, action) => {
    state.loading = false
    state.error = action.payload
  },

  //   delete all deleted task
  deleteDeletedTasksRequest: (state) => {
    state.loading = true
  },
  deleteDeletedTasksSuccess: (state, action) => {
    state.loading = false
    state.message = action.payload
  },
  deleteDeletedTasksFailure: (state, action) => {
    state.loading = false
    state.error = action.payload
  },

  clearErrors: (state) => {
    state.error = null
  },
  clearMessage: (state) => {
    state.message = null
  },
})

export const getTodoTasksReducer = createReducer(initialState, {
  // for remaining task
  remainingTaskListRequest: (state) => {
    state.loading = true
  },
  remainingTaskListSuccess: (state, action) => {
    state.loading = false
    state.remainingTaskList = action.payload
  },
  remainingTaskListFailure: (state, action) => {
    state.loading = false
    state.error = action.payload
  },

  // for completed task
  completedTaskListRequest: (state) => {
    state.loading = true
  },
  completedTaskListSuccess: (state, action) => {
    state.loading = false
    state.completedTaskList = action.payload
  },
  completedTaskListFailure: (state, action) => {
    state.loading = false
    state.error = action.payload
  },

  // for deleted task
  deletedTaskListRequest: (state) => {
    state.loading = true
  },
  deletedTaskListSuccess: (state, action) => {
    state.loading = false
    state.deletedTaskList = action.payload
  },
  deletedTaskListFailure: (state, action) => {
    state.loading = false
    state.error = action.payload
  },

  clearErrors: (state) => {
    state.error = null
  },
})
