import React, { useEffect } from 'react'
import {
  ClearButton,
  Container,
  ListContainer,
  ListEmpty,
  ListTaskItem,
} from './components'
import { List } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/loader/Loader'
import { useAlert } from 'react-alert'
import {
  deleteDeletedTasks,
  getDeletedTasks,
} from '../../redux/Actions/todoTaskAction'

const DeleteTaskList = () => {
  const alert = useAlert()
  const dispatch = useDispatch()

  const { loading, deletedTaskList } = useSelector(
    (state) => state.getTodoTasks
  )

  const { error, message } = useSelector((state) => state.addDeleteUpdateTasks)

  const clearAll = async () => {
    await dispatch(deleteDeletedTasks())
  }

  useEffect(() => {
    if (error) {
      alert.error(error)
      dispatch({ type: 'clearErrors' })
    }

    if (message) {
      alert.success(message)
      dispatch({ type: 'clearMessage' })
    }
    dispatch(getDeletedTasks())
  }, [dispatch, error, message, alert])

  return loading ? (
    <Loader />
  ) : (
    <Container>
      <ListContainer listTitle='You did not complete these task..'>
        {deletedTaskList && deletedTaskList.length > 0 ? (
          <>
            <ClearButton title='Clear All' onClick={() => clearAll()} />

            <List>
              {deletedTaskList.map((taskItem, index) => {
                const {
                  taskTitle,
                  taskDate,
                  createdAt,
                  deletedAt,
                  completedAt,
                } = taskItem

                return (
                  <ListTaskItem
                    key={index}
                    taskTitle={taskTitle}
                    taskDate={taskDate}
                    createdAt={createdAt}
                    deletedAt={deletedAt}
                    completedAt={completedAt}
                  />
                )
              })}
            </List>
          </>
        ) : (
          <ListEmpty title='Very Good!! Till now you have not deleted any task..!!' />
        )}
      </ListContainer>
    </Container>
  )
}

export default DeleteTaskList
