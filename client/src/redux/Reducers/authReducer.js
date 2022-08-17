import { createReducer } from '@reduxjs/toolkit'
const initialState = {}

export const userReducer = createReducer(initialState, {
  // login user
  LoginRequest: (state) => {
    state.loading = true
  },
  LoginSuccess: (state, action) => {
    state.loading = false
    state.userDetails = action.payload
    state.message = action.payload.message
    state.isAuthenticated = true
  },
  LoginFailure: (state, action) => {
    state.loading = false
    state.error = action.payload
    state.isAuthenticated = false
  },

  //   register user
  RegisterRequest: (state) => {
    state.loading = true
  },
  RegisterSuccess: (state, action) => {
    state.loading = false
    state.userDetails = action.payload
    state.message = action.payload.message
    state.isAuthenticated = false
  },
  RegisterFailure: (state, action) => {
    state.loading = false
    state.error = action.payload
    state.isAuthenticated = false
  },

  //   load user
  LoadUserRequest: (state) => {
    state.loading = true
  },
  LoadUserSuccess: (state, action) => {
    state.loading = false
    state.userDetails = action.payload
    state.isAuthenticated = true
  },
  LoadUserFailure: (state, action) => {
    state.loading = false
    state.error = action.payload
    state.isAuthenticated = false
  },

  //   logout user
  LogoutUserRequest: (state) => {
    state.loading = true
  },
  LogoutUserSuccess: (state, action) => {
    state.loading = false
    state.userDetails = null
    state.message = action.payload.message
    state.isAuthenticated = false
  },
  LogoutUserFailure: (state, action) => {
    state.loading = false
    state.error = action.payload
    state.isAuthenticated = true
  },

  clearErrors: (state) => {
    state.error = null
  },
  clearMessage: (state) => {
    state.message = null
  },
})

export const userProfileReducer = createReducer(initialState, {
  userProfileRequest: (state) => {
    state.loading = true
  },
  userProfileSuccess: (state, action) => {
    state.loading = false
    state.userDetails = action.payload
  },
  userProfileFailure: (state, action) => {
    state.loading = false
    state.error = action.payload
  },
  clearErrors: (state) => {
    state.error = null
  },
})
