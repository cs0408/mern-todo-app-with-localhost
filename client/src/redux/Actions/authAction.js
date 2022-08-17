import axios from 'axios'
import { call_api } from './url'

export const registerUser =
  (fullName, email, password, confirmPassword, termCondition) =>
  async (dispatch) => {
    try {
      dispatch({
        type: 'RegisterRequest',
      })

      const { data } = await axios.post(
        `${call_api}/api/v1/register`,
        { fullName, email, password, confirmPassword, termCondition },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      if (!data.success) {
        dispatch({
          type: 'RegisterFailure',
          payload: data.message,
        })
      }
      if (data.success) {
        dispatch({
          type: 'RegisterSuccess',
          payload: data,
        })
      }
    } catch (error) {
      dispatch({
        type: 'RegisterFailure',
        payload: 'Internal server error or user already exits!',
      })
    }
  }

export const loginUser = (email, password, rememberMe) => async (dispatch) => {
  try {
    dispatch({
      type: 'LoginRequest',
    })

    const { data } = await axios.post(
      `${call_api}/api/v1/login`,
      { email, password, rememberMe },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    if (!data.success) {
      dispatch({
        type: 'LoginFailure',
        payload: data.message,
      })
    }
    if (data.success) {
      dispatch({
        type: 'LoginSuccess',
        payload: data,
      })

      localStorage.setItem('loginToken', data.token)
    }
  } catch (error) {
    dispatch({
      type: 'LoginFailure',
      payload: error,
    })
  }
}

export const logoutUser = () => async (dispatch) => {
  try {
    dispatch({
      type: 'LogoutUserRequest',
    })

    const { data } = await axios.post(`${call_api}/api/v1/logout`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (data.success) {
      dispatch({
        type: 'LogoutUserSuccess',
        payload: data.message,
      })

      localStorage.removeItem('loginToken')

      window.location.href = '/'
    }
  } catch (error) {
    dispatch({
      type: 'LogoutUserFailure',
      payload: error,
    })
  }
}

export const loadedUser = () => async (dispatch) => {
  try {
    dispatch({
      type: 'LoadUserRequest',
    })

    const token = localStorage.getItem('loginToken')
    if (!token)
      dispatch({
        type: 'LoadUserFailure',
      })

    if (token) {
      const { data } = await axios.post(
        `${call_api}/api/v1/loadUser`,
        {
          token,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      dispatch({
        type: 'LoadUserSuccess',
        payload: data,
      })

      localStorage.setItem('loginToken', data.token)
    } else {
      dispatch({
        type: 'LoadUserFailure',
      })
    }
  } catch (error) {
    dispatch({
      type: 'LoadUserFailure',
      payload: error,
    })
  }
}
