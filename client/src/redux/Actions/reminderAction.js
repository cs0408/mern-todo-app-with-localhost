import axios from 'axios'
import { call_api } from './url'

// ADD reminder
export const addReminder =
  ({ subTitle, title, eventDate }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: 'addReminderRequest',
      })

      // check if fields empty
      if (!subTitle || !title || !eventDate) {
        return dispatch({
          type: 'addReminderFailure',
          payload: "Field's can't be empty.",
        })
      }

      // check subtitle or title length
      if (subTitle.trim().length < 5 || title.trim().length < 5) {
        return dispatch({
          type: 'addReminderFailure',
          payload: 'Title or Sub Title should not be less than 5 characters.',
        })
      }

      if (subTitle.trim().length > 50 || title.trim().length > 50) {
        return dispatch({
          type: 'addReminderFailure',
          payload:
            'Title or Sub Title should not be greater than 50 characters.',
        })
      }

      // // check date should not be less than today
      // // reminder date time
      const reminderDateTime =
        new Date(eventDate).getFullYear() +
        '-' +
        (new Date(eventDate).getMonth() + 1) +
        '-' +
        new Date(eventDate).getDate() +
        ' ' +
        new Date(eventDate).getHours() +
        ':' +
        new Date(eventDate).getMinutes()

      // current date time
      const currentDateTime =
        new Date().getFullYear() +
        '-' +
        (new Date().getMonth() + 1) +
        '-' +
        new Date().getDate() +
        ' ' +
        new Date().getHours() +
        ':' +
        new Date().getMinutes()

      if (reminderDateTime <= currentDateTime) {
        return dispatch({
          type: 'addReminderFailure',
          payload: 'Reminder time should be greater than current time.',
        })
      }

      const token = localStorage.getItem('loginToken')
      if (!token) {
        return dispatch({
          type: 'addReminderFailure',
          payload: 'Login Now or Refresh page',
        })
      }

      const { data } = await axios.post(`${call_api}/api/v1/reminder/add`, {
        subTitle,
        title,
        eventDate,
        token,
      })

      dispatch({
        type: 'addReminderSuccess',
        payload: data.message,
      })
    } catch (error) {
      dispatch({
        type: 'addReminderFailure',
        payload: error,
      })
    }
  }

// delete reminder
export const deleteReminder = (eventId) => async (dispatch) => {
  try {
    dispatch({
      type: 'deleteReminderRequest',
    })

    const token = localStorage.getItem('loginToken')
    if (!token) {
      return dispatch({
        type: 'deleteReminderFailure',
        payload: 'Login Now or Refresh page.',
      })
    }

    const { data } = await axios.post(
      `${call_api}/api/v1/reminder/delete/${eventId}`,
      {
        token,
      }
    )

    dispatch({
      type: 'deleteReminderSuccess',
      payload: data.message,
    })
  } catch (error) {
    dispatch({
      type: 'deleteReminderFailure',
      payload: error,
    })
  }
}

// ================= Get upcoming, checked, deleted reminders =======================
export const getUpComingReminders = () => async (dispatch) => {
  try {
    dispatch({
      type: 'upcomingReminderListRequest',
    })

    const token = localStorage.getItem('loginToken')
    if (!token) {
      return dispatch({
        type: 'upcomingReminderListFailure',
        payload: 'Login Now or Refresh page.',
      })
    }

    const { data } = await axios.post(`${call_api}/api/v1/reminders/upcoming`, {
      token,
    })

    dispatch({
      type: 'upcomingReminderListSuccess',
      payload: data.upcomingReminderList,
    })
  } catch (error) {
    dispatch({
      type: 'upcomingReminderListFailure',
      payload: error,
    })
  }
}

export const getCurrentReminder = () => async (dispatch) => {
  try {
    dispatch({
      type: 'currentReminderRequest',
    })

    const token = localStorage.getItem('loginToken')
    if (!token) {
      return dispatch({
        type: 'currentReminderFailure',
        payload: 'Login Now or Refresh page.',
      })
    }

    const { data } = await axios.post(`${call_api}/api/v1/reminders/current`, {
      token,
    })

    dispatch({
      type: 'currentReminderSuccess',
      payload: data.currentReminders,
    })
  } catch (error) {
    dispatch({
      type: 'currentReminderFailure',
      payload: error.message,
    })
  }
}

export const getCompleteReminders = () => async (dispatch) => {
  try {
    dispatch({
      type: 'completedReminderListRequest',
    })

    const token = localStorage.getItem('loginToken')
    if (!token) {
      return dispatch({
        type: 'completedReminderListFailure',
        payload: 'Login Now or Refresh page.',
      })
    }

    const { data } = await axios.post(`${call_api}/api/v1/reminders/complete`, {
      token,
    })

    dispatch({
      type: 'completedReminderListSuccess',
      payload: data.completeReminderList,
    })
  } catch (error) {
    dispatch({
      type: 'completedReminderListFailure',
      payload: error,
    })
  }
}

export const getDeleteReminders = () => async (dispatch) => {
  try {
    dispatch({
      type: 'deletedReminderListRequest',
    })

    const token = localStorage.getItem('loginToken')
    if (!token) {
      return dispatch({
        type: 'deletedReminderListFailure',
        payload: 'Login Now or Refresh page.',
      })
    }

    const { data } = await axios.post(`${call_api}/api/v1/reminders/delete`, {
      token,
    })

    dispatch({
      type: 'deletedReminderListSuccess',
      payload: data.deleteReminderList,
    })
  } catch (error) {
    dispatch({
      type: 'deletedReminderListFailure',
      payload: error,
    })
  }
}

// ====================== Delete upcoming, completed, deleted reminders ==================
export const deleteUpComingReminders = () => async (dispatch) => {
  try {
    dispatch({
      type: 'deleteUpcomingReminderRequest',
    })

    const token = localStorage.getItem('loginToken')
    if (!token) {
      return dispatch({
        type: 'deleteUpcomingReminderFailure',
        payload: 'Login Now or Refresh page.',
      })
    }

    const { data } = await axios.post(
      `${call_api}/api/v1/reminders/delete/upcoming`,
      {
        token,
      }
    )

    dispatch({
      type: 'deleteUpcomingReminderSuccess',
      payload: data.message,
    })
  } catch (error) {
    dispatch({
      type: 'deleteUpcomingReminderFailure',
      payload: error,
    })
  }
}

// export const deleteUpComingTodayReminders = () => async (dispatch) => {
//   try {
//     dispatch({
//       type: 'deleteUpcomingTodayReminderRequest',
//     })

//     const token = localStorage.getItem('loginToken')
//     if (!token) {
//       return dispatch({
//         type: 'deletedReminderListFailure',
//         payload: 'Login Now or Refresh page.',
//       })
//     }

//     const { data } = await axios.post(
//       `${call_api}/api/v1/reminders/delete/upcoming/today`,
//       {
//         token,
//       }
//     )

//     dispatch({
//       type: 'deleteUpcomingTodayReminderSuccess',
//       payload: data.message,
//     })
//   } catch (error) {
//     dispatch({
//       type: 'deleteUpcomingTodayReminderFailure',
//       payload: error,
//     })
//   }
// }

export const deleteCompleteReminders = () => async (dispatch) => {
  try {
    dispatch({
      type: 'deleteCompletedRemindersRequest',
    })

    const token = localStorage.getItem('loginToken')
    if (!token) {
      return dispatch({
        type: 'deletedReminderListFailure',
        payload: 'Login Now or Refresh page.',
      })
    }

    const { data } = await axios.post(
      `${call_api}/api/v1/reminders/delete/completed`,
      {
        token,
      }
    )

    if (data.success) {
      dispatch({
        type: 'deleteCompletedRemindersSuccess',
        payload: data.message,
      })
    }
  } catch (error) {
    dispatch({
      type: 'deleteCompletedRemindersFailure',
      payload: error,
    })
  }
}

export const deleteDeleteReminders = () => async (dispatch) => {
  try {
    dispatch({
      type: 'deleteDeletedReminderRequest',
    })

    const token = localStorage.getItem('loginToken')
    if (!token) {
      return dispatch({
        type: 'deletedReminderListFailure',
        payload: 'Login Now or Refresh page.',
      })
    }

    const { data } = await axios.post(
      `${call_api}/api/v1/reminders/delete/deleted`,
      {
        token,
      }
    )

    dispatch({
      type: 'deleteDeletedReminderSuccess',
      payload: data.message,
    })
  } catch (error) {
    dispatch({
      type: 'deleteDeletedReminderFailure',
      payload: error,
    })
  }
}
