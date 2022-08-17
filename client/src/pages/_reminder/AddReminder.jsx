import React, { useEffect, useState } from 'react'
import {
  Container,
  FormButton,
  FormContainer,
  FormInput,
  InputDateTimePicker,
  ListContainer,
  ListEmpty,
  ListReminderItem,
} from './components'
import { Grid, List, Paper, Typography } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import {
  addReminder,
  getUpComingReminders,
} from '../../redux/Actions/reminderAction'
import { useAlert } from 'react-alert'

const AddReminder = () => {
  const dispatch = useDispatch()
  const alert = useAlert()

  const [subTitle, setSubTitle] = useState('')
  const [title, setTitle] = useState('')

  const [clearedDate, setClearedDate] = useState(null)
  const [value, setValue] = useState(new Date())

  const [inputNameError, setInputNameError] = useState('')
  const [inputForError, setInputForError] = useState('')

  const { upcomingReminderList } = useSelector((state) => state.getReminders)
  const { error, message } = useSelector(
    (state) => state.addDeleteUpdateReminder
  )

  const handleNameInput = (e) => {
    e.target.value.length < 6
      ? setInputNameError("Reminder Title atleast have 6 character's.")
      : e.target.value.length > 15
      ? setInputNameError(
          'Reminder Title should not be more than 15 characters..'
        )
      : setInputNameError('')

    setSubTitle(e.target.value)
  }

  const handleForInput = (e) => {
    e.target.value.length < 6
      ? setInputForError("Title atleast have 6 character's.")
      : e.target.value.length > 25
      ? setInputForError('Title should not be more than 25 characters..')
      : setInputForError('')

    setTitle(e.target.value)
  }

  const addReminderButton = async () => {
    await dispatch(
      addReminder({
        subTitle,
        title,
        eventDate: value,
      })
    )
  }

  // sort only today's reminders
  const newUpcomingList =
    upcomingReminderList && upcomingReminderList.length > 0
      ? upcomingReminderList.filter((reminder, index) => {
          return (
            new Date(reminder.eventDate).toDateString() ===
            new Date().toDateString()
          )
        })
      : []

  useEffect(() => {
    if (error) {
      alert.error(error)
      dispatch({ type: 'clearErrors' })
    }

    if (message) {
      alert.success(message)
      dispatch({ type: 'clearMessage' })
      setSubTitle('')
      setTitle('')
      setValue(new Date())
    }

    dispatch(getUpComingReminders())
  }, [dispatch, error, message, alert])

  return (
    <Container>
      <FormContainer>
        <FormInput
          label='Reminder Title'
          value={subTitle}
          onChange={handleNameInput}
          error={inputNameError}
          helperText={inputNameError}
        />
        <FormInput
          label='Title'
          value={title}
          onChange={handleForInput}
          error={inputForError}
          helperText={inputForError}
        />
        <InputDateTimePicker
          value={value}
          onChange={(newValue) => {
            setValue(newValue)
          }}
          minDate={new Date()}
          helperText='Check am or pm'
        />
        <FormButton onClick={() => addReminderButton()} />
      </FormContainer>

      <Grid item xs={12} md={6}>
        <Grid container justifyContent='center'>
          <Grid item xs={8} md={10} lg={8} xl={6}>
            <Paper elevation={6} style={{ padding: '20px' }}>
              <Typography variant='h5'>Today's Reminders..</Typography>

              {newUpcomingList && newUpcomingList.length > 0 ? (
                <List>
                  {newUpcomingList.map((event, index) => {
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
              ) : (
                <ListEmpty title="No upcoming reminder's" />
              )}
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}

export default AddReminder
