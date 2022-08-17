import React from 'react'
import { Avatar } from '@material-ui/core'
import { Error } from '@material-ui/icons'

const NotFound = () => {
  return (
    <div
      style={{
        minWidth: '100vw',
        minHeight: '100vh',
        display: 'flex',
        background: '#F8F8F8',
      }}
    >
      <div
        style={{
          margin: 'auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar>
          <Error />
        </Avatar>
        <h2 style={{ opacity: 0.5 }}>404</h2>
        <h1 style={{ opacity: 0.3 }}>Page Not Found</h1>
      </div>
    </div>
  )
}

export default NotFound
