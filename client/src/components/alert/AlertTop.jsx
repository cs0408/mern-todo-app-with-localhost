import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Alert, AlertTitle } from '@material-ui/lab'
import { getCurrentReminder } from '../../redux/Actions/reminderAction'

const AlertTop = () => {
  const dispatch = useDispatch()
  const { currentReminders } = useSelector((state) => state.getCurrentReminders)

  useEffect(() => {
    const interval = setInterval(async () => {
      await dispatch(getCurrentReminder())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <>
      {currentReminders && currentReminders.length > 0 ? (
        <div style={{ position: 'absolute', zIndex: 10, right: ' 50px' }}>
          {currentReminders.map((event, index) => {
            return (
              <Alert
                key={index}
                severity='info'
                style={{
                  margin: '10px 0',
                  borderRadius: '10px',
                  border: '1px solid black',
                }}
              >
                <AlertTitle>{event.subTitle}</AlertTitle>
                {event.title} — <strong>Attend the Reminder!</strong>
              </Alert>
            )
          })}
        </div>
      ) : (
        <></>
      )}
    </>
  )
}

export default AlertTop
