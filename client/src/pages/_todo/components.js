import React from 'react'
import { useStyles } from './style'
import {
  Avatar,
  Button,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  TextField as Field,
  Typography,
} from '@material-ui/core'
import AlarmIcon from '@mui/icons-material/Alarm'
import SnoozeIcon from '@mui/icons-material/Snooze'
import TextField from '@mui/material/TextField'
import ClockIcon from '@mui/icons-material/AccessTime'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { CheckCircleOutline, Delete } from '@material-ui/icons'

// main container
export const Container = ({ children }) => {
  const classes = useStyles()
  return (
    <Grid container justifyContent='center' className={classes.container}>
      <Grid item xs={10} sm={6} lg={4}>
        {children}
      </Grid>
    </Grid>
  )
}

// form container
export const FormContainer = ({ formTitle, submitForm, children }) => {
  const classes = useStyles()
  return (
    <Paper elevation={3} className={classes.formContainer}>
      <Typography variant='h5' className={classes.formHeading}>
        {formTitle}
      </Typography>
      <form onSubmit={submitForm} className={classes.formSubContainer}>
        {children}
      </form>
    </Paper>
  )
}

// list container
export const ListContainer = ({ listTitle, children }) => {
  const classes = useStyles()
  return (
    <List className={classes.listContainer}>
      <Typography variant='h5' className={classes.listHeading}>
        {listTitle}
      </Typography>
      {children}
    </List>
  )
}

// input field
export const InputField = ({ label, taskTitle, handleInput, inputError }) => {
  return (
    <Field
      label={label}
      variant='outlined'
      fullWidth
      size='small'
      value={taskTitle}
      onChange={handleInput}
      error={inputError ? true : false}
      helperText={inputError}
    />
  )
}

// date time picker
export const DateTimeInputPicker = ({
  value,
  onChange,
  helperText,
  minTime,
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateTimePicker
        // disableFuture
        hideTabs
        showTodayButton
        todayText='now'
        openTo='hours'
        value={value}
        onChange={onChange}
        minDate={new Date()}
        components={{
          LeftArrowIcon: AlarmIcon,
          RightArrowIcon: SnoozeIcon,
          OpenPickerIcon: ClockIcon,
        }}
        leftArrowButtonText='Open previous month'
        rightArrowButtonText='Open next month'
        minTime={minTime}
        renderInput={(params) => (
          <TextField
            style={{ margin: '20px 0' }}
            {...params}
            helperText={helperText}
          />
        )}
      />
    </LocalizationProvider>
  )
}

// button
export const SubmitButton = ({ title, type, variant, color }) => {
  return (
    <Button type={type} variant={variant} color={color}>
      {title}
    </Button>
  )
}

// list item
export const ListTaskItem = ({
  checkTodoTask,
  deletTodoTask,
  completedAt,
  deletedAt,
  taskDate,
  taskTitle,
}) => {
  const classes = useStyles()

  let showDate = null
  if (completedAt) {
    showDate = new Date(completedAt).toDateString()
  }
  if (deletedAt) {
    showDate = new Date(deletedAt).toDateString()
  }
  if (!completedAt && !deletedAt) {
    showDate = new Date(taskDate).toDateString()
  }

  const showCheckButton =
    completedAt === null &&
    deletedAt === null &&
    new Date(taskDate).toDateString() === new Date().toDateString()

  const showDeleteButton =
    completedAt === null &&
    deletedAt === null &&
    new Date(taskDate).toDateString() >= new Date().toDateString()

  return (
    <ListItem>
      <Grid container justifyContent='center'>
        <Grid item xs={2}>
          <ListItemAvatar>
            <Avatar className={classes.listItemAvatar}>
              {taskTitle[0].toUpperCase()}
            </Avatar>
          </ListItemAvatar>
        </Grid>

        <Grid
          item
          xs={7}
          style={{
            overflowWrap: 'break-word',
          }}
        >
          <ListItemText primary={taskTitle} secondary={showDate} />
        </Grid>

        <Grid item xs={3}>
          <ListItemSecondaryAction>
            {showCheckButton && (
              <IconButton
                className={classes.listItemIconCheck}
                onClick={checkTodoTask}
              >
                <CheckCircleOutline />
              </IconButton>
            )}

            {completedAt && (
              <IconButton className={classes.listItemIconCheck} disabled>
                <CheckCircleOutline />
              </IconButton>
            )}

            {showDeleteButton && (
              <IconButton
                className={classes.listItemIconDelete}
                onClick={deletTodoTask}
              >
                <Delete />
              </IconButton>
            )}

            {deletedAt && (
              <IconButton className={classes.listItemIconDelete} disabled>
                <Delete />
              </IconButton>
            )}
          </ListItemSecondaryAction>
        </Grid>
      </Grid>
    </ListItem>
  )
}

// clear list button
export const ClearButton = ({ onClick, title }) => {
  return (
    <Button
      variant='contained'
      style={{ opacity: 0.9, margin: '20px 0' }}
      onClick={onClick}
    >
      {title}
    </Button>
  )
}

// empty list item
export const ListEmpty = ({ title }) => {
  const classes = useStyles()
  return <Typography className={classes.listEmpty}>{title}</Typography>
}
