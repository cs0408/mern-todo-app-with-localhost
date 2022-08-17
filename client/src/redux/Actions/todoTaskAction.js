import axios from 'axios'
import { call_api } from './url'

// ADD Task
export const addTask =
  ({ taskTitle, taskDate }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: 'addTaskRequest',
      })

      // validation inputs empty
      if (!taskTitle || !taskDate) {
        return dispatch({
          type: 'addTaskFailure',
          payload: "Fields can't be empty.",
        })
      }

      // validation input, less than 5 characters
      if (taskTitle.trim().length < 5) {
        return dispatch({
          type: 'addTaskFailure',
          payload: 'Task should not be less than 5 characters.',
        })
      }

      // validation input, greater than 50 characters
      if (taskTitle.trim().length > 50) {
        return dispatch({
          type: 'addTaskFailure',
          payload: 'Task should not be greater than 50 characters.',
        })
      }

      // get token from local storage
      const token = localStorage.getItem('loginToken')
      if (!token) {
        return dispatch({
          type: 'addTaskFailure',
          payload: 'Login Now or Refresh page.',
        })
      }

      const { data } = await axios.post(`${call_api}/api/v1/todo/task/add`, {
        taskTitle,
        taskDate,
        token,
      })

      dispatch({
        type: 'addTaskSuccess',
        payload: data.message,
      })
    } catch (error) {
      dispatch({
        type: 'addTaskFailure',
        payload: error,
      })
    }
  }

// mark completed
export const checkTask = (taskId) => async (dispatch) => {
  try {
    dispatch({
      type: 'checkTaskRequest',
    })

    const token = localStorage.getItem('loginToken')
    if (!token) {
      return dispatch({
        type: 'checkTaskFailure',
        payload: 'Login Now or Refresh page.',
      })
    }

    const { data } = await axios.post(
      `${call_api}/api/v1/todo/task/complete/${taskId}`,
      {
        token,
      }
    )

    dispatch({
      type: 'checkTaskSuccess',
      payload: data.message,
    })
  } catch (error) {
    dispatch({
      type: 'checkTaskFailure',
      payload: error,
    })
  }
}

// mark deleted
export const deleteTask = (taskId) => async (dispatch) => {
  try {
    dispatch({
      type: 'deleteTaskRequest',
    })

    const token = localStorage.getItem('loginToken')
    if (!token) {
      return dispatch({
        type: 'deleteTaskFailure',
        payload: 'Login Now or Refresh page.',
      })
    }

    const { data } = await axios.post(
      `${call_api}/api/v1/todo/task/delete/${taskId}`,
      {
        token,
      }
    )

    dispatch({
      type: 'deleteTaskSuccess',
      payload: data.message,
    })
  } catch (error) {
    dispatch({
      type: 'deleteTaskFailure',
      payload: error,
    })
  }
}

// delete all remaining task
export const deleteRemainingTasks = () => async (dispatch) => {
  try {
    dispatch({
      type: 'deleteRemainingTasksRequest',
    })

    const token = localStorage.getItem('loginToken')
    if (!token) {
      return dispatch({
        type: 'deleteRemainingTasksFailure',
        payload: 'Login Now or Refresh page.',
      })
    }

    const { data } = await axios.post(
      `${call_api}/api/v1/todo/delete/remaining/tasks`,
      {
        token,
      }
    )

    dispatch({
      type: 'deleteRemainingTasksSuccess',
      payload: data.message,
    })
  } catch (error) {
    dispatch({
      type: 'deleteRemainingTasksFailure',
      payload: error,
    })
  }
}

// delete all completed task
export const deleteCompletedTasks = () => async (dispatch) => {
  try {
    dispatch({
      type: 'deleteCompletedTasksRequest',
    })

    const token = localStorage.getItem('loginToken')
    if (!token) {
      return dispatch({
        type: 'deleteCompletedTasksFailure',
        payload: 'Login Now or Refresh page.',
      })
    }

    const { data } = await axios.post(
      `${call_api}/api/v1/todo/delete/complete/tasks`,
      {
        token,
      }
    )

    if (data.success) {
      dispatch({
        type: 'deleteCompletedTasksSuccess',
        payload: data.message,
      })
    }
  } catch (error) {
    dispatch({
      type: 'deleteCompletedTasksFailure',
      payload: error,
    })
  }
}

// delete all deleted task
export const deleteDeletedTasks = () => async (dispatch) => {
  try {
    dispatch({
      type: 'deleteDeletedTasksRequest',
    })

    const token = localStorage.getItem('loginToken')
    if (!token) {
      return dispatch({
        type: 'deleteDeletedTasksFailure',
        payload: 'Login Now or Refresh page.',
      })
    }

    const { data } = await axios.post(
      `${call_api}/api/v1/todo/delete/delete/tasks`,
      {
        token,
      }
    )

    dispatch({
      type: 'deleteDeletedTasksSuccess',
      payload: data.message,
    })
  } catch (error) {
    dispatch({
      type: 'deleteDeletedTasksFailure',
      payload: error,
    })
  }
}

// get all Remaining task
export const getRemainingTasks = () => async (dispatch) => {
  try {
    dispatch({
      type: 'remainingTaskListRequest',
    })

    const token = localStorage.getItem('loginToken')
    if (!token) {
      return dispatch({
        type: 'remainingTaskListFailure',
        payload: 'Login Now or Refresh page.',
      })
    }

    const { data } = await axios.post(
      `${call_api}/api/v1/todo/remaining/tasks`,
      {
        token,
      }
    )

    if (data.success) {
      dispatch({
        type: 'remainingTaskListSuccess',
        payload: data.todoTaskList,
      })
    }
  } catch (error) {
    dispatch({
      type: 'remainingTaskListFailure',
      payload: error,
    })
  }
}

// Get all completed task
export const getCompletedTasks = () => async (dispatch) => {
  try {
    dispatch({
      type: 'completedTaskListRequest',
    })

    const token = localStorage.getItem('loginToken')
    if (!token) {
      return dispatch({
        type: 'completedTaskListFailure',
        payload: 'Login Now or Refresh page.',
      })
    }

    const { data } = await axios.post(
      `${call_api}/api/v1/todo/complete/tasks`,
      {
        token,
      }
    )

    dispatch({
      type: 'completedTaskListSuccess',
      payload: data.todoCompleteTaskList,
    })
  } catch (error) {
    dispatch({
      type: 'completedTaskListFailure',
      payload: error,
    })
  }
}

// Get all Deleted Task
export const getDeletedTasks = () => async (dispatch) => {
  try {
    dispatch({
      type: 'deletedTaskListRequest',
    })

    const token = localStorage.getItem('loginToken')
    if (!token) {
      return dispatch({
        type: 'deletedTaskListFailure',
        payload: 'Login Now or Refresh page.',
      })
    }

    const { data } = await axios.post(`${call_api}/api/v1/todo/delete/tasks`, {
      token,
    })

    if (data.success) {
      dispatch({
        type: 'deletedTaskListSuccess',
        payload: data.todoDeleteTaskList,
      })
    }
  } catch (error) {
    dispatch({
      type: 'deletedTaskListFailure',
      payload: error,
    })
  }
}
