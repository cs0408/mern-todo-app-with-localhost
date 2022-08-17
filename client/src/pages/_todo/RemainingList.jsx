import React from 'react'
import { useDispatch } from 'react-redux'
import { List } from '@material-ui/core'
import Loader from '../../components/loader/Loader'
import { ListContainer, ListEmpty, ListTaskItem } from './components'
import { checkTask, deleteTask } from '../../redux/Actions/todoTaskAction'

const RemainingList = ({ loading, remainingTaskList }) => {
  const dispatch = useDispatch()

  const checkTodoTask = async (id) => {
    await dispatch(checkTask(id))
  }

  const deletTodoTask = async (id) => {
    await dispatch(deleteTask(id))
  }

  return (
    <ListContainer listTitle='Remaining Task!!'>
      {loading ? (
        <Loader />
      ) : remainingTaskList && remainingTaskList.length > 0 ? (
        <List>
          {remainingTaskList.map((item, index) => {
            const { completedAt, createdAt, deletedAt, taskDate, taskTitle } =
              item

            return (
              <ListTaskItem
                key={index}
                taskTitle={taskTitle}
                taskDate={taskDate}
                createdAt={createdAt}
                deletedAt={deletedAt}
                completedAt={completedAt}
                checkTodoTask={() => checkTodoTask(item._id)}
                deletTodoTask={() => deletTodoTask(item._id)}
              />
            )
          })}
        </List>
      ) : (
        <ListEmpty title='No Task Remaining, Add Another task..' />
      )}
    </ListContainer>
  )
}

export default RemainingList
