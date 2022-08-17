import React, { useEffect } from 'react'
import { Link as NavLink, useNavigate } from 'react-router-dom'
import {
  Drawer,
  List,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Button,
  CardHeader,
} from '@material-ui/core'
import { ChevronLeft, ChevronRight, MoreVert } from '@material-ui/icons'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../../redux/Actions/authAction'

export default function HomeDrawer({
  classes,
  theme,
  open,
  handleDrawerClose,
  drawerMenues,
  tab,
  setTab,
}) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // const { userDetails } = useSelector((state) => state.auth)
  const { error, message, userDetails } = useSelector((state) => state.auth)

  const handleMenuItem = (menusItem) => {
    setTab(menusItem.path)
    handleDrawerClose()
  }

  const logout = () => {
    dispatch(logoutUser())
  }

  useEffect(() => {
    if (error) {
      // alert.error(error)
    }
    if (message) {
      navigate('/')
    }
  }, [dispatch, error, message])

  return (
    <>
      {/* menues */}
      <Drawer
        className={classes.drawer}
        variant='persistent'
        anchor='left'
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeft /> : <ChevronRight />}
          </IconButton>
        </div>
        <Divider />
        {/* profile */}
        <CardHeader
          avatar={
            <Avatar aria-label='recipe' className={classes.avatar}>
              {userDetails.user.name[0].toUpperCase()}
            </Avatar>
          }
          // action={
          //   <IconButton aria-label='settings'>
          //     <MoreVert />
          //   </IconButton>
          // }
          title={userDetails.user.name}
          subheader={userDetails.user.email}
        />
        <Button
          fullWidth={false}
          variant='contained'
          color='primary'
          onClick={logout}
          style={{ margin: '16px' }}
        >
          LogOut
        </Button>
        <Divider />
        {/* menues */}
        <List>
          {drawerMenues.map((menueList, index) => {
            return (
              <div key={index}>
                {menueList.menues.map((menusItem, index) => {
                  return (
                    <NavLink
                      to={menusItem.path}
                      className={`${classes.drawerMenuItem} ${
                        tab === menusItem.path
                          ? classes.drawerMenuActiveItem
                          : classes.drawerMenuInActiveItem
                      }`}
                      onClick={() => handleMenuItem(menusItem)}
                      key={index}
                    >
                      <ListItem button>
                        <ListItemIcon>{menusItem.icon}</ListItemIcon>
                        <ListItemText primary={menusItem.itemTitle} />
                      </ListItem>
                    </NavLink>
                  )
                })}

                <Divider />
              </div>
            )
          })}
        </List>
      </Drawer>
    </>
  )
}
