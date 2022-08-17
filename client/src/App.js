import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Header from './components/header/Header'
import ForgotPassword from './pages/_auth/ForgotPassword'
import Login from './pages/_auth/Login'
import Register from './pages/_auth/Register'
import AddTask from './pages/_todo/AddTask'
import CheckTaskList from './pages/_todo/CheckTaskList'
import DeleteTaskList from './pages/_todo/DeleteTaskList'

import { useDispatch, useSelector } from 'react-redux'
import { loadedUser } from './redux/Actions/authAction'
import UpcomingReminders from './pages/_reminder/UpcomingReminders'
import DeletedReminders from './pages/_reminder/DeletedReminders'
import CompletedReminders from './pages/_reminder/CompletedReminders'
import NotFound from './components/notFound/NotFound'
import AddReminder from './pages/_reminder/AddReminder'
import AlertTop from './components/alert/AlertTop'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadedUser())
  }, [dispatch])

  const { isAuthenticated } = useSelector((state) => state.auth)

  return (
    // <BrowserRouter>
    <div style={{ displaye: 'flex' }}>
      {isAuthenticated && <Header />}

      {isAuthenticated && <AlertTop />}

      <Routes>
        <Route path='/' element={isAuthenticated ? <AddTask /> : <Login />} />
        <Route
          path='/register'
          element={isAuthenticated ? <NotFound /> : <Register />}
        />
        <Route
          path='/forgot/password'
          element={isAuthenticated ? <NotFound /> : <ForgotPassword />}
        />
        <Route
          path='/todo-completed-list'
          element={isAuthenticated ? <CheckTaskList /> : <NotFound />}
        />
        <Route
          path='/todo-deleted-list'
          element={isAuthenticated ? <DeleteTaskList /> : <NotFound />}
        />
        <Route
          path='/reminder'
          element={isAuthenticated ? <AddReminder /> : <NotFound />}
        />
        <Route
          path='/reminder-upcoming'
          element={isAuthenticated ? <UpcomingReminders /> : <NotFound />}
        />
        <Route
          path='/remainder-completed'
          element={isAuthenticated ? <CompletedReminders /> : <NotFound />}
        />
        <Route
          path='/remainder-deleted'
          element={isAuthenticated ? <DeletedReminders /> : <NotFound />}
        />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
    // </BrowserRouter>
  )
}

export default App
