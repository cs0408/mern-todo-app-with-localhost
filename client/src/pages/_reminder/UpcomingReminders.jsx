import React, { useEffect } from 'react'
import { List } from '@material-ui/core'
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
  deleteReminder,
  deleteUpComingReminders,
  getUpComingReminders,
} from '../../redux/Actions/reminderAction'

const UpcomingReminders = () => {
  const dispatch = useDispatch()
  const alert = useAlert()

  const { upcomingReminderList } = useSelector((state) => state.getReminders)
  const { error, message } = useSelector(
    (state) => state.addDeleteUpdateReminder
  )

  const deletReminder = async (id) => {
    await dispatch(deleteReminder(id))
  }

  const clearList = async () => {
    await dispatch(deleteUpComingReminders())
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

    dispatch(getUpComingReminders())
  }, [dispatch, error, message, alert])

  return (
    <Container>
      <ListContainer title="Upcoming Event's....">
        {upcomingReminderList && upcomingReminderList.length > 0 ? (
          <>
            <ClearButton title='Clear all' onClick={() => clearList()} />
            <List>
              {upcomingReminderList.map((event, index) => {
                const {
                  completedAt,
                  createdAt,
                  deletedAt,
                  eventDate,
                  owner,
                  showReminder,
                  subTitle,
                  title,
                  _id,
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
                    deletReminder={() => deletReminder(_id)}
                  />
                )
              })}
            </List>
          </>
        ) : (
          <ListEmpty title="No upcoming reminder's" />
        )}
      </ListContainer>
    </Container>
  )
}

export default UpcomingReminders
