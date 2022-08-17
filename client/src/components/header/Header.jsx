import React, { useEffect, useState } from 'react'
import clsx from 'clsx'
import { useTheme } from '@material-ui/core/styles'
import { useStyles } from '../style'
import {
  CssBaseline,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
} from '@material-ui/core'
import HomeDrawer from '../drawer/HomeDrawer'
import {
  Menu,
  AssignmentTurnedIn,
  Delete,
  LibraryAddCheck,
  PlaylistAdd,
  PostAdd,
  Snooze,
} from '@material-ui/icons'

// drawer menues
const drawerMenues = [
  {
    menues: [
      {
        icon: <PostAdd />,
        path: '/',
        itemTitle: 'Add To-Do Task',
        pageHeaderTitle: 'TO-DO Task',
      },
      {
        icon: <AssignmentTurnedIn />,
        path: '/todo-completed-list',
        itemTitle: 'Completed list',
        pageHeaderTitle: 'Complete Task List',
      },
      {
        icon: <Delete />,
        path: '/todo-deleted-list',
        itemTitle: 'Deleted list',
        pageHeaderTitle: 'Delete Task List',
      },
    ],
  },
  {
    menues: [
      {
        icon: <PlaylistAdd />,
        path: '/reminder',
        itemTitle: 'Add Remainder',
        pageHeaderTitle: 'Add Remainder',
      },
      {
        icon: <Snooze />,
        path: '/reminder-upcoming',
        itemTitle: "Upcoming Remainder's",
        pageHeaderTitle: "Upcoming Remainder's",
      },
      {
        icon: <LibraryAddCheck />,
        path: '/remainder-completed',
        itemTitle: "Completed Remainder's",
        pageHeaderTitle: "Completed Remainder's",
      },
      {
        icon: <Delete />,
        path: '/remainder-deleted',
        itemTitle: "Deleted Remainder's",
        pageHeaderTitle: "Deleted Remainder's",
      },
    ],
  },
]

const Header = () => {
  const classes = useStyles()
  const theme = useTheme()
  const [open, setOpen] = useState(false)
  const [tab, setTab] = useState(window.location.pathname)
  const [headerTitle, setHeaderTitle] = useState()

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  const allMenuItem = []
  drawerMenues.map((menues) => {
    allMenuItem.push(...menues.menues)
  })

  useEffect(() => {
    allMenuItem
      .filter((item) => item.path === tab)
      .map((innerItem) => {
        setHeaderTitle(innerItem.pageHeaderTitle)
      })
  }, [tab])

  return (
    <>
      <CssBaseline />

      {/* header */}

      <AppBar
        position='fixed'
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            edge='start'
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <Menu />
          </IconButton>
          <Typography variant='h6' noWrap>
            {headerTitle}
          </Typography>
        </Toolbar>
      </AppBar>

      {/* drawer */}

      <HomeDrawer
        classes={classes}
        theme={theme}
        open={open}
        handleDrawerClose={handleDrawerClose}
        drawerMenues={drawerMenues}
        tab={tab}
        setTab={setTab}
      />
    </>
  )
}

export default Header
