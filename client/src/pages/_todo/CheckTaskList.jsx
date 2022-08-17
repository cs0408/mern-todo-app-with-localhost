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
  deleteCompletedTasks,
  getCompletedTasks,
} from '../../redux/Actions/todoTaskAction'

const CheckTaskList = () => {
  const dispatch = useDispatch()
  const alert = useAlert()

  const { loading, completedTaskList } = useSelector(
    (state) => state.getTodoTasks
  )

  const { error, message } = useSelector((state) => state.addDeleteUpdateTasks)

  const clearAll = async () => {
    dispatch(deleteCompletedTasks())
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

    dispatch(getCompletedTasks())
  }, [dispatch, error, message, alert])

  return loading ? (
    <Loader />
  ) : (
    <Container>
      <ListContainer listTitle='Great your achievements..'>
        {completedTaskList && completedTaskList.length > 0 ? (
          <>
            <ClearButton title='Clear All' onClick={() => clearAll()} />

            <List>
              {completedTaskList.map((taskItem, index) => {
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
          <ListEmpty title='No Task Remaining, Add Another task!!' />
        )}
      </ListContainer>
    </Container>
  )
}

export default CheckTaskList
