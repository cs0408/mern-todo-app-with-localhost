import React, { useEffect } from 'react'
import { Button, List } from '@material-ui/core'
import {
  ClearButton,
  Container,
  ListContainer,
  ListEmpty,
  ListReminderItem,
} from './components'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import {
  deleteCompleteReminders,
  getCompleteReminders,
} from '../../redux/Actions/reminderAction'

const CompletedReminders = () => {
  const dispatch = useDispatch()
  const alert = useAlert()

  const { completedReminderList } = useSelector((state) => state.getReminders)

  const { error, message } = useSelector(
    (state) => state.addDeleteUpdateReminder
  )

  const clearList = async () => {
    await dispatch(deleteCompleteReminders())
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

    dispatch(getCompleteReminders())
  }, [dispatch, error, message, alert])

  return (
    <Container>
      <ListContainer title="Great! You remembered the remainder's..">
        {completedReminderList && completedReminderList.length > 0 ? (
          <>
            <ClearButton title='Clear all' onClick={() => clearList()} />
            <List>
              {completedReminderList.map((event, index) => {
                const {
                  completedAt,
                  createdAt,
                  deletedAt,
                  eventDate,
                  owner,
                  showReminder,
                  subTitle,
                  title,
                } = event

                return (
                  <ListReminderItem
                    key={index}
                    completedAt={completedAt}
                    createdAt={createdAt}
                    deletedAt={deletedAt}
                    eventDate={eventDate}
                    owner={owner}
                    showReminder={showReminder}
                    subTitle={subTitle}
                    title={title}
                  />
                )
              })}
            </List>
          </>
        ) : (
          <ListEmpty title="No Reminder's completed.." />
        )}
      </ListContainer>
    </Container>
  )
}

export default CompletedReminders
