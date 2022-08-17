import { createReducer } from '@reduxjs/toolkit'

const initialState = {}

export const addDeleteUpdateReminderReducer = createReducer(initialState, {
  // add reminder
  addReminderRequest: (state) => {
    state.loading = true
  },
  addReminderSuccess: (state, action) => {
    state.loading = false
    state.message = action.payload
  },
  addReminderFailure: (state, action) => {
    state.loading = false
    state.error = action.payload
  },

  // delete reminder
  deleteReminderRequest: (state) => {
    state.loading = true
  },
  deleteReminderSuccess: (state, action) => {
    state.loading = false
    state.message = action.payload
  },
  deleteReminderFailure: (state, action) => {
    state.loading = false
    state.error = action.payload
  },

  //   delete all upcoming reminder
  deleteUpcomingReminderRequest: (state) => {
    state.loading = true
  },
  deleteUpcomingReminderSuccess: (state, action) => {
    state.loading = false
    state.message = action.payload
  },
  deleteUpcomingReminderFailure: (state, action) => {
    state.loading = false
    state.error = action.payload
  },

  //   delete all upcoming today reminder
  deleteUpcomingTodayReminderRequest: (state) => {
    state.loading = true
  },
  deleteUpcomingTodayReminderSuccess: (state, action) => {
    state.loading = false
    state.message = action.payload
  },
  deleteUpcomingTodayReminderFailure: (state, action) => {
    state.loading = false
    state.error = action.payload
  },

  //   delete all completed reminder
  deleteCompletedRemindersRequest: (state) => {
    state.loading = true
  },
  deleteCompletedRemindersSuccess: (state, action) => {
    state.loading = false
    state.message = action.payload
  },
  deleteCompletedRemindersFailure: (state, action) => {
    state.loading = false
    state.error = action.payload
  },

  //   delete all deleted task
  deleteDeletedReminderRequest: (state) => {
    state.loading = true
  },
  deleteDeletedReminderSuccess: (state, action) => {
    state.loading = false
    state.message = action.payload
  },
  deleteDeletedReminderFailure: (state, action) => {
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

export const getRemindersReducer = createReducer(initialState, {
  // for upcoming reminder
  upcomingReminderListRequest: (state) => {
    state.loading = true
  },
  upcomingReminderListSuccess: (state, action) => {
    state.loading = false
    state.upcomingReminderList = action.payload
  },
  upcomingReminderListFailure: (state, action) => {
    state.loading = false
    state.error = action.payload
  },

  // for completed reminder
  completedReminderListRequest: (state) => {
    state.loading = true
  },
  completedReminderListSuccess: (state, action) => {
    state.loading = false
    state.completedReminderList = action.payload
  },
  completedReminderListFailure: (state, action) => {
    state.loading = false
    state.error = action.payload
  },

  // for deleted reminder
  deletedReminderListRequest: (state) => {
    state.loading = true
  },
  deletedReminderListSuccess: (state, action) => {
    state.loading = false
    state.deletedReminderList = action.payload
  },
  deletedReminderListFailure: (state, action) => {
    state.loading = false
    state.error = action.payload
  },

  clearErrors: (state) => {
    state.error = null
  },
})

// get alert recent reminder
export const getCurrentRemindersReducers = createReducer(initialState, {
  // for upcoming reminder
  currentReminderRequest: (state) => {
    state.loading = true
  },
  currentReminderSuccess: (state, action) => {
    state.loading = false
    state.currentReminders = action.payload
  },
  currentReminderFailure: (state, action) => {
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
