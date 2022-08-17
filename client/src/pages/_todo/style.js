import { green, indigo, red } from '@material-ui/core/colors'
import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(3, 0),
    marginTop: theme.spacing(12),
  },
  formContainer: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  formSubContainer: {
    padding: theme.spacing(4),
  },
  listContainer: {
    background: 'white',
    padding: theme.spacing(2),
    border: 'solid 1px rgba(0,0,0,0.1)',
  },
  formHeading: {
    textAlign: 'center',
    color: indigo[900],
    textTransform: 'uppercase',
  },
  listHeading: {
    color: indigo[900],
  },
  listItemAvatar: {
    background: indigo[500],
    color: 'white',
  },
  listItemIconCheck: {
    color: green[200],
    '&:hover': {
      color: green[500],
    },
  },
  listItemIconDelete: {
    color: red[200],
    '&:hover': {
      color: red[500],
    },
  },
  listEmpty: {
    margin: theme.spacing(6, 0),
    textAlign: 'center',
  },
}))
