import React from 'react'
import { useStyles } from './style'
import {
  Avatar,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
} from '@material-ui/core'
import AlarmIcon from '@mui/icons-material/Alarm'
import SnoozeIcon from '@mui/icons-material/Snooze'
import TextField from '@mui/material/TextField'
import ClockIcon from '@mui/icons-material/AccessTime'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { Add, AlarmAdd, Delete } from '@material-ui/icons'

// container
export const Container = ({ children }) => {
  const classes = useStyles()

  return (
    <Grid container className={classes.container}>
      {children}
    </Grid>
  )
}

// form container
export const FormContainer = ({ children }) => {
  const classes = useStyles()

  return (
    <Grid item xs={12} md={6}>
      <Grid container justifyContent='center'>
        <Grid item xs={8}>
          <Card className={classes.formContainer}>
            <CardContent
              style={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {children}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  )
}

// list container
export const ListContainer = ({ children, title }) => {
  const classes = useStyles()

  return (
    <Grid item xs={12}>
      <Grid container justifyContent='center'>
        <Grid item xs={10} md={6} lg={4}>
          <Paper elevation={6} style={{ padding: '20px' }}>
            <Typography variant='h5' className={classes.listContainerTitle}>
              {title}
            </Typography>
            {children}
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  )
}

// input date time picker
export const InputDateTimePicker = ({
  value,
  onChange,
  minDate,
  helperText,
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
        minDate={minDate}
        components={{
          LeftArrowIcon: AlarmIcon,
          RightArrowIcon: SnoozeIcon,
          OpenPickerIcon: ClockIcon,
        }}
        leftArrowButtonText='Open previous month'
        rightArrowButtonText='Open next month'
        // minTime={new Date()}
        // maxTime={new Date(0, 0, 0, 20)}
        renderInput={(params) => (
          <TextField {...params} helperText={helperText} />
        )}
      />
    </LocalizationProvider>
  )
}

// form input
export const FormInput = ({
  name,
  label,
  value,
  onChange,
  error,
  helperText,
}) => {
  return (
    <TextField
      name={name}
      style={{ marginBottom: '30px' }}
      label={label}
      size='small'
      value={value}
      onChange={onChange}
      error={error ? true : false}
      helperText={helperText}
    />
  )
}

// form submit button
export const FormButton = ({ onClick }) => {
  const classes = useStyles()
  return (
    <Button size='small'>
      <Avatar className={classes.formButton} onClick={onClick}>
        <Add />
      </Avatar>
    </Button>
  )
}

// list item
export const ListReminderItem = ({
  deletReminder,
  completedAt,
  createdAt,
  deletedAt,
  eventDate,
  owner,
  showReminder,
  subTitle,
  title,
}) => {
  const classes = useStyles()

  let showDateTime = null
  if (completedAt) {
    showDateTime = new Date(completedAt).toDateString()
  }
  if (deletedAt) {
    showDateTime = new Date(deletedAt).toDateString()
  }
  if (
    completedAt === null &&
    deletedAt === null &&
    new Date(eventDate).toDateString() > new Date().toDateString()
  ) {
    showDateTime = new Date(eventDate).toDateString()
  }
  if (
    completedAt === null &&
    deletedAt === null &&
    new Date(eventDate).toDateString() === new Date().toDateString()
  ) {
    showDateTime =
      (new Date(eventDate).getHours() < 10 ? '0' : '') +
      new Date(eventDate).getHours() +
      ':' +
      (new Date(eventDate).getMinutes() < 10 ? '0' : '') +
      new Date(eventDate).getMinutes()
  }

  return (
    <ListItem style={{ padding: 0, margin: '20px 0' }}>
      <Grid container alignItems='center'>
        <Grid item xs={12} sm={8}>
          <Grid container alignItems='center'>
            <Grid item xs={4}>
              <ListItemAvatar>
                <Avatar className={classes.listItemAvatar}>
                  {subTitle[0].toUpperCase()}
                </Avatar>
              </ListItemAvatar>
            </Grid>
            <Grid item xs={8}>
              <ListItemText primary={subTitle} />
              <ListItemText
                primary={title}
                style={{ opacity: 0.5 }}
                secondary={showDateTime}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Grid container>
            {/* completed */}
            {completedAt && (
              <IconButton disabled>
                <AlarmAdd />
              </IconButton>
            )}

            {/* not completed or not deleted*/}
            {completedAt === null && deletedAt === null && (
              <>
                <IconButton className={classes.listItemAlaramIcon}>
                  <AlarmAdd />
                </IconButton>
                <IconButton
                  className={classes.listItemDeleteIcon}
                  onClick={deletReminder}
                >
                  <Delete />
                </IconButton>
              </>
            )}

            {/* deleted */}
            {deletedAt && (
              <IconButton disabled>
                <Delete />
              </IconButton>
            )}
          </Grid>
        </Grid>
      </Grid>
    </ListItem>
  )
}

// list empty
export const ListEmpty = ({ title }) => {
  return (
    <Typography
      style={{
        margin: '50px 0',
        textAlign: 'center',
      }}
    >
      {title}
    </Typography>
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
