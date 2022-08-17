import {
  Avatar,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core'
import { useStyles as classes } from './style'

// components
export const Container = ({ children }) => {
  return (
    <Grid container style={classes.root}>
      <Grid item xs={12} style={classes.subRoot}>
        {children}
      </Grid>
    </Grid>
  )
}

export const SubContainer = ({ children }) => {
  return (
    <Paper elevation={10} style={classes.container}>
      {children}
    </Paper>
  )
}

export const Header = ({ icon, title, subTitle }) => {
  return (
    <Grid align='center'>
      <Avatar style={classes.avatarStyle}>{icon}</Avatar>
      <h2 style={classes.headerStyle}>{title}</h2>
      <Typography>{subTitle}</Typography>
    </Grid>
  )
}

export const Form = ({ children }) => {
  return <>{children}</>
}

export const FormField = ({
  name,
  label,
  placeholder,
  type,
  onChange,
  value,
}) => {
  return (
    <TextField
      style={classes.inputStyle}
      name={name}
      label={label}
      placeholder={placeholder}
      type={type}
      onChange={onChange}
      value={value}
      fullWidth
      required
    />
  )
}

export const CheckBoxControl = ({ name, onChange, value, label }) => {
  return (
    <FormControlLabel
      control={
        <Checkbox
          name={name}
          color='primary'
          onChange={onChange}
          value={value}
        />
      }
      label={label}
    />
  )
}

export const FormButton = ({ onClick, label }) => {
  return (
    <Button
      type='submit'
      color='primary'
      variant='contained'
      style={classes.btnstyle}
      fullWidth
      onClick={onClick}
    >
      {label}
    </Button>
  )
}

export const Links = ({ children }) => {
  return <Typography>{children}</Typography>
}
