import { indigo, red, yellow } from '@material-ui/core/colors'
import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(3, 0),
    marginTop: theme.spacing(12),
  },
  formContainer: {
    padding: theme.spacing(1),
    marginBottom: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  formButton: {
    background: '#3f51b5',
    opacity: 0.7,
    '&:hover': {
      opacity: 1,
    },
  },
  listContainerTitle: {
    color: indigo[900],
  },
  listItemAvatar: {
    background: indigo[500],
    color: 'white',
  },
  listItemAlaramIcon: {
    color: yellow[700],
    animation: '$fadeAnimation 2s infinite',
    '&:hover': {
      background: 'transparent',
      cursor: 'context-menu',
    },
  },
  '@keyframes fadeAnimation': {
    '0%': {
      transform: 'rotate(-45deg)',
    },
    '25%': {
      transform: 'rotate(45deg)',
    },
    '50%': {
      transform: 'rotate(-45deg)',
    },
    '75%': {
      transform: ' rotate(45deg)',
    },
    '100%': {
      transform: 'rotate(-45deg)',
    },
  },
  listItemDeleteIcon: {
    color: red[200],
    '&:hover': {
      color: red[500],
    },
  },
}))
